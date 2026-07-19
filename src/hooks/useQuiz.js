import { useState, useEffect, useCallback } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, doc, updateDoc, increment, getDoc, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const XP_PER_CORRECT = 50;
const STREAK_BONUS = 10;

const TIMER_BY_DIFFICULTY = { easy: 30, medium: 20, hard: 15, all: 25 };

export const useQuiz = (settings) => {
  const { currentUser } = useAuth();
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    score: 0,
    xp: 0,
    streak: 0,
    isFinished: false,
    results: [],
    timeLeft: null,
    isActive: false,
    isLaunching: false,
  });

  const [currentQuestions, setCurrentQuestions] = useState([]);

  const getTimerForDifficulty = useCallback((diff) => {
    if (!settings.timerMode || settings.mode === 'full') return null;
    return TIMER_BY_DIFFICULTY[diff] || 25;
  }, [settings.timerMode, settings.mode]);

  const startQuiz = useCallback(async () => {
    setQuizState(prev => ({ ...prev, isLaunching: true }));
    try {
      const querySnapshot = await getDocs(collection(db, "questions"));
      let fetchedQuestions = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));

      if (settings.difficulty !== 'all') {
        fetchedQuestions = fetchedQuestions.filter(q => q.difficulty === settings.difficulty);
      }
      if (settings.category && settings.category !== 'all') {
        fetchedQuestions = fetchedQuestions.filter(q => q.category === settings.category);
      }

      const shuffled = [...fetchedQuestions].sort(() => Math.random() - 0.5);
      const finalQuestions = settings.mode === 'full' ? shuffled : shuffled.slice(0, 5);

      if (finalQuestions.length === 0) {
        setQuizState(prev => ({ ...prev, isLaunching: false }));
        return;
      }

      const firstTimer = getTimerForDifficulty(finalQuestions[0]?.difficulty);

      setCurrentQuestions(finalQuestions);
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: 0,
        score: 0,
        xp: 0,
        streak: 0,
        isFinished: false,
        results: [],
        timeLeft: firstTimer,
        isActive: true,
        isLaunching: false,
      }));
    } catch (error) {
      console.error("Failed to fetch quiz questions:", error);
      setQuizState(prev => ({ ...prev, isLaunching: false }));
    }
  }, [settings, getTimerForDifficulty]);

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

    if (currentUser) {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        let updates = { xp: increment(totalGainedXP) };
        if (userSnap.exists()) {
          const currentBest = userSnap.data().streak || 0;
          if (finalStreak > currentBest) updates.streak = finalStreak;
        }
        await updateDoc(userRef, updates);

        await addDoc(collection(db, "users", currentUser.uid, "quizHistory"), {
          score: finalScore,
          total: currentQuestions.length,
          xp: totalGainedXP,
          streak: finalStreak,
          percentage: Math.round((finalScore / currentQuestions.length) * 100),
          category: currentQuestions[0]?.category || 'General',
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error updating user stats:", error);
      }
    }
  }, [currentUser, quizState.score, quizState.xp, currentQuestions]);

  const submitAnswer = useCallback((answerIndex) => {
    if (!currentQuestions.length) return;

    const currentQuestion = currentQuestions[quizState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correct;
    const newStreak = isCorrect ? quizState.streak + 1 : 0;
    const gainedXP = isCorrect ? XP_PER_CORRECT + (newStreak * STREAK_BONUS) : 0;

    const newResults = [
      ...quizState.results,
      {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        options: currentQuestion.options,
        correct: currentQuestion.correct,
        explanation: currentQuestion.explanation,
        category: currentQuestion.category,
        difficulty: currentQuestion.difficulty,
        answerIndex,
        isCorrect
      }
    ];

    if (quizState.currentQuestionIndex + 1 < currentQuestions.length) {
      const nextQuestion = currentQuestions[quizState.currentQuestionIndex + 1];
      const nextTimer = getTimerForDifficulty(nextQuestion?.difficulty);

      setQuizState(prev => ({
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        xp: prev.xp + gainedXP,
        streak: newStreak,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        results: newResults,
        timeLeft: nextTimer,
      }));
    } else {
      finishQuiz(isCorrect, gainedXP, newStreak, newResults);
    }
  }, [currentQuestions, quizState, finishQuiz, getTimerForDifficulty]);

  useEffect(() => {
    let timer;
    if (quizState.isActive && quizState.timeLeft !== null && quizState.timeLeft > 0) {
      timer = setInterval(() => {
        setQuizState(prev => {
          if (prev.timeLeft <= 1) {
            return { ...prev, timeLeft: 0 };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizState.isActive, quizState.timeLeft]);

  // Time out handling moved to component level so it can show feedback before advancing

  return {
    ...quizState,
    currentQuestion: currentQuestions[quizState.currentQuestionIndex],
    totalQuestions: currentQuestions.length,
    questions: currentQuestions,
    startQuiz,
    submitAnswer
  };
};
