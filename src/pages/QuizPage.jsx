import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../hooks/useQuiz';
import QuestionCard from '../components/quiz/QuestionCard';
import ExplanationModal from '../components/quiz/ExplanationModal';
import { Brain, Timer, Zap, Trophy, RefreshCcw, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuizPage() {
  const [settings, setSettings] = useState({
    difficulty: 'all',
    timerMode: true,
    mode: 'daily'
  });
  
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastSelected, setLastSelected] = useState(null);

  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    score,
    xp,
    streak,
    isFinished,
    isActive,
    timeLeft,
    startQuiz,
    submitAnswer
  } = useQuiz(settings);

  const handleAnswerSelect = (index) => {
    setLastSelected(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    submitAnswer(lastSelected);
    setShowExplanation(false);
    setLastSelected(null);
  };

  if (!isActive && !isFinished) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all font-semibold text-sm shadow-lg"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
        </div>

        <div className="glass-card max-w-2xl w-full p-10 text-center mt-12 sm:mt-0">
          <div className="bg-primary/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Brain className="text-primary" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">JS Mastery Quiz</h1>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Test your JavaScript knowledge with our advanced quiz engine. 
            Choose your settings and aim for a perfect streak!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-left">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Difficulty</label>
              <select 
                onChange={(e) => setSettings({...settings, difficulty: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Mode</label>
              <select 
                onChange={(e) => setSettings({...settings, mode: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
              >
                <option value="daily">Daily Challenge (5 Qs)</option>
                <option value="marathon">Marathon (All Qs)</option>
              </select>
            </div>
          </div>

          <button 
            onClick={startQuiz}
            className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
          >
            Launch Quiz
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card max-w-2xl w-full p-12 text-center"
        >
          <Trophy className="text-yellow-400 w-24 h-24 mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-white mb-2">Quiz Completed!</h2>
          <p className="text-gray-400 mb-10">You've gained valuable knowledge today.</p>
          
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-500 text-xs font-bold uppercase mb-1">Score</p>
              <p className="text-2xl font-bold text-white">{score}/{totalQuestions}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-500 text-xs font-bold uppercase mb-1">XP Gained</p>
              <p className="text-2xl font-bold text-primary">+{xp}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-500 text-xs font-bold uppercase mb-1">Best Streak</p>
              <p className="text-2xl font-bold text-orange-400">{streak}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={startQuiz}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <RefreshCcw size={20} /> Try Again
            </button>
            <Link 
              to="/dashboard"
              className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Home size={20} /> Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/dashboard"
              className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              title="Exit Quiz"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="glass p-3 rounded-xl">
              <Brain className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
              <h3 className="text-white font-semibold">{currentQuestion?.category}</h3>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {settings.timerMode && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <Timer className={timeLeft < 10 ? 'text-red-400' : 'text-primary'} size={20} />
                <span className={`font-mono text-xl font-bold ${timeLeft < 10 ? 'text-red-400' : 'text-white'}`}>
                  {timeLeft}s
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-400/10 border border-orange-400/20 text-orange-400">
              <Zap size={20} />
              <span className="font-bold">{streak}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/5 rounded-full mb-12 overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question Area */}
        <AnimatePresence mode="wait">
          <QuestionCard 
            key={currentQuestionIndex}
            question={currentQuestion}
            onSelect={handleAnswerSelect}
            selectedIndex={lastSelected}
            isAnswered={showExplanation}
          />
        </AnimatePresence>

        <ExplanationModal 
          isOpen={showExplanation}
          onClose={() => setShowExplanation(false)}
          explanation={currentQuestion?.explanation}
          isCorrect={lastSelected === currentQuestion?.correct}
          nextQuestion={handleNext}
        />
      </div>
    </div>
  );
}
