import { useState, useEffect, useCallback } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, doc, updateDoc, increment, getDoc, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const XP_PER_CORRECT = 50;
const STREAK_BONUS = 10;

export const useQuiz = (settings) => {
  const { currentUser } = useAuth();
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    score: 0,
    xp: 0,
    streak: 0,
    isFinished: false,
    results: [],
    timeLeft: settings.timerMode ? 30 : null,
    isActive: false,
  });

  const [currentQuestions, setCurrentQuestions] = useState([]);

  // Initialize Quiz from Firestore
  const startQuiz = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "questions"));
      let fetchedQuestions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (settings.difficulty !== 'all') {
        fetchedQuestions = fetchedQuestions.filter(q => q.difficulty === settings.difficulty);
      }

      if (settings.category && settings.category !== 'all') {
        fetchedQuestions = fetchedQuestions.filter(q => q.category === settings.category);
      }
      
      // Shuffle
      const shuffled = [...fetchedQuestions].sort(() => Math.random() - 0.5);
      
      // Limit for Marathon vs Daily
      const finalQuestions = settings.mode === 'marathon' ? shuffled : shuffled.slice(0, 5);

      setCurrentQuestions(finalQuestions);
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: 0,
        score: 0,
        xp: 0,
        isFinished: false,
        results: [],
        timeLeft: settings.timerMode ? 30 : null,
        isActive: true,
      }));
    } catch (error) {
      console.error("Failed to fetch quiz questions:", error);
    }
  }, [settings]);

  // Finish Quiz
  const finishQuiz = useCallback(async (lastCorrect, lastXP, finalStreak, finalResults) => {
    const finalScore = lastCorrect ? quizState.score + 1 : quizState.score;
    const totalGainedXP = quizState.xp + lastXP;

    setQuizState(prev => ({
      ...prev,
      score: finalScore,
      xp: totalGainedXP,
      streak: finalStreak,
      isFinished: true,
      isActive: false,
      results: finalResults
    }));

    // Persist to Firestore
    if (currentUser) {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        let updates = {
          xp: increment(totalGainedXP)
        };

        if (userSnap.exists()) {
          const currentBest = userSnap.data().streak || 0;
          if (finalStreak > currentBest) {
            updates.streak = finalStreak;
          }
        }

        await updateDoc(userRef, updates);

        // Save quiz history
        await addDoc(collection(db, "users", currentUser.uid, "quizHistory"), {
          score: finalScore,
          total: currentQuestions.length,
          xp: totalGainedXP,
          streak: finalStreak,
          percentage: Math.round((finalScore / currentQuestions.length) * 100),
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error updating user stats:", error);
      }
    }
  }, [currentUser, quizState.score, quizState.xp]);

  // Handle Answer
  const submitAnswer = useCallback((answerIndex) => {
    if (!currentQuestions.length) return;
    
    const currentQuestion = currentQuestions[quizState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correct;
    
    const newStreak = isCorrect ? quizState.streak + 1 : 0;
    const gainedXP = isCorrect ? XP_PER_CORRECT + (newStreak * STREAK_BONUS) : 0;

    const newResults = [
      ...quizState.results,
      { questionId: currentQuestion.id, isCorrect, answerIndex }
    ];

    if (quizState.currentQuestionIndex + 1 < currentQuestions.length) {
      setQuizState(prev => ({
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        xp: prev.xp + gainedXP,
        streak: newStreak,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        results: newResults,
        timeLeft: settings.timerMode ? 30 : null,
      }));
    } else {
      finishQuiz(isCorrect, gainedXP, newStreak, newResults);
    }
  }, [currentQuestions, quizState, settings.timerMode, finishQuiz]);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (quizState.isActive && quizState.timeLeft !== null && quizState.timeLeft > 0) {
      timer = setInterval(() => {
        setQuizState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (quizState.timeLeft === 0 && quizState.isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      submitAnswer(-1);
    }
    return () => clearInterval(timer);
  }, [quizState.isActive, quizState.timeLeft, submitAnswer]);

  return {
    ...quizState,
    currentQuestion: currentQuestions[quizState.currentQuestionIndex],
    totalQuestions: currentQuestions.length,
    startQuiz,
    submitAnswer
  };
};
