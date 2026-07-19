import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../hooks/useQuiz';
import { Brain, Timer, Zap, Trophy, ArrowLeft, Check, X, ChevronRight, RotateCcw, BarChart3, AlertTriangle, Target, Globe, Palette, Atom, Shield, Clock, Rocket, Code, Server, FileText, Folder, Database, Cloud, Cpu, Braces, Binary } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

function ExitConfirm({ isOpen, onStay, onExit }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Quit quiz confirmation">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card max-w-sm w-full p-8 text-center"
      >
        <div className="bg-red-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-400" size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Quit Quiz?</h3>
        <p className="text-gray-400 mb-6">Your current progress will be lost.</p>
        <div className="flex gap-3">
          <button
            onClick={onStay}
            className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold transition-all"
          >
            Stay
          </button>
          <button
            onClick={onExit}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all"
          >
            Quit
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const CATEGORY_META = [
  { value: 'all', label: 'All Categories', icon: <Target size={18} className="text-primary" />, count: 1625, color: 'from-primary/20 to-primary/5 border-primary/30' },
  { value: 'JavaScript', label: 'JavaScript', icon: <Zap size={18} className="text-yellow-400" />, count: 125, color: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30' },
  { value: 'HTML', label: 'HTML', icon: <Globe size={18} className="text-orange-400" />, count: 125, color: 'from-orange-500/20 to-orange-500/5 border-orange-500/30' },
  { value: 'CSS', label: 'CSS', icon: <Palette size={18} className="text-blue-400" />, count: 125, color: 'from-blue-500/20 to-blue-500/5 border-blue-500/30' },
  { value: 'React', label: 'React', icon: <Atom size={18} className="text-cyan-400" />, count: 125, color: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30' },
  { value: 'TypeScript', label: 'TypeScript', icon: <FileText size={18} className="text-blue-500" />, count: 125, color: 'from-blue-600/20 to-blue-600/5 border-blue-600/30' },
  { value: 'Python', label: 'Python', icon: <Code size={18} className="text-green-400" />, count: 125, color: 'from-green-500/20 to-green-500/5 border-green-500/30' },
  { value: 'Cybersecurity', label: 'Cybersecurity', icon: <Shield size={18} className="text-red-400" />, count: 125, color: 'from-red-500/20 to-red-500/5 border-red-500/30' },
  { value: 'Backend', label: 'Backend', icon: <Server size={18} className="text-purple-400" />, count: 125, color: 'from-purple-500/20 to-purple-500/5 border-purple-500/30' },
  { value: 'SQL', label: 'SQL', icon: <Database size={18} className="text-emerald-400" />, count: 125, color: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30' },
  { value: 'NoSQL', label: 'NoSQL', icon: <Cloud size={18} className="text-pink-400" />, count: 125, color: 'from-pink-500/20 to-pink-500/5 border-pink-500/30' },
  { value: 'AI Engineering', label: 'AI Engineering', icon: <Cpu size={18} className="text-violet-400" />, count: 125, color: 'from-violet-500/20 to-violet-500/5 border-violet-500/30' },
  { value: 'Artificial Intelligence', label: 'AI', icon: <Braces size={18} className="text-amber-400" />, count: 125, color: 'from-amber-500/20 to-amber-500/5 border-amber-500/30' },
  { value: 'DSA', label: 'DSA', icon: <Binary size={18} className="text-teal-400" />, count: 125, color: 'from-teal-500/20 to-teal-500/5 border-teal-500/30' },
];

const DIFF_META = [
  { value: 'all', label: 'All Levels', color: 'bg-white/10 text-white border-white/20' },
  { value: 'easy', label: 'Easy', color: 'bg-green-500/10 text-green-400 border-green-500/30' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
  { value: 'hard', label: 'Hard', color: 'bg-red-500/10 text-red-400 border-red-500/30' },
];

const MODE_META = [
  { value: 'daily', label: 'Daily Challenge', desc: '5 questions, timed', icon: <Clock size={20} className="text-primary" /> },
  { value: 'full', label: 'Full Quiz', desc: 'All 125 questions, no timer', icon: <Trophy size={20} className="text-yellow-400" /> },
];

function SettingsScreen({ settings, setSettings, startQuiz, isLaunching }) {
  return (
    <div className="px-4 md:px-6 py-2 md:py-4">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4 md:mb-8">
        <div className="relative inline-block mb-2 md:mb-4">
          <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-2xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-primary/30 to-primary/10 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border border-primary/30">
            <Brain className="text-primary" size={28} />
          </div>
        </div>
        <h1 className="text-xl md:text-3xl font-bold text-white mb-1">
          {settings.category !== 'all' ? `${settings.category} Quiz` : 'SmartQuiz'}
        </h1>
        <p className="text-gray-400 text-xs md:text-sm">
          Test your knowledge. Choose your settings and aim for a perfect streak!
        </p>
        <div className="flex items-center justify-center gap-3 md:gap-4 mt-3 text-[10px] md:text-xs text-gray-500">
          <span className="flex items-center gap-1"><FileText size={10} /> 1625 questions</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1"><Folder size={10} /> 13 categories</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1"><BarChart3 size={10} /> 3 difficulty levels</span>
        </div>
      </motion.div>

      {/* Category Tiles */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-5 md:mb-8">
        <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Category</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-1.5 md:gap-2.5">
          {CATEGORY_META.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSettings({...settings, category: cat.value})}
              className={`relative p-2 md:p-3 rounded-xl md:rounded-2xl border text-left transition-all bg-gradient-to-br ${cat.color} ${
                settings.category === cat.value
                  ? 'ring-2 ring-primary shadow-lg shadow-primary/10 scale-[1.02]'
                  : 'hover:scale-[1.01] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="mb-1 hidden md:block">{cat.icon}</div>
              <p className="text-[10px] md:text-xs font-bold text-white truncate">{cat.label}</p>
              <p className="text-[8px] md:text-[9px] text-gray-400 mt-0.5">{cat.count} Q</p>
              {settings.category === cat.value && (
                <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Difficulty Pills */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-5 md:mb-8">
        <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Difficulty</p>
        <div className="flex flex-wrap gap-2">
          {DIFF_META.map(d => (
            <button
              key={d.value}
              onClick={() => setSettings({...settings, difficulty: d.value})}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all border ${
                settings.difficulty === d.value
                  ? `${d.color} shadow-lg`
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Mode Cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6 md:mb-8">
        <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Mode</p>
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {MODE_META.map(m => (
            <button
              key={m.value}
              onClick={() => setSettings({...settings, mode: m.value, timerMode: m.value === 'daily'})}
              className={`p-3 md:p-4 rounded-xl md:rounded-2xl border text-left transition-all ${
                settings.mode === m.value
                  ? 'bg-primary/10 border-primary/30 ring-2 ring-primary shadow-lg shadow-primary/10'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span className="hidden md:inline">{m.icon}</span>
                <span className="text-xs md:text-sm font-bold text-white">{m.label}</span>
              </div>
              <p className="text-[9px] md:text-[11px] text-gray-400 md:ml-8">{m.desc}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Launch Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={startQuiz}
        disabled={isLaunching}
        className="w-full md:w-auto md:min-w-[280px] mx-auto relative group bg-gradient-to-r from-primary to-primary/80 text-white py-3 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-xl hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 md:gap-3 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative flex items-center gap-2 md:gap-3">
          {isLaunching ? (
            <>
              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <span className="hidden md:inline"><Rocket size={20} /></span> Launch Quiz
            </>
          )}
        </span>
      </motion.button>
    </div>
  );
}

function QuestionOverview({ questions, currentIndex, results }) {
  return (
    <div className="relative mb-6">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
        {questions.map((q, i) => {
          const result = results[i];
          let bg = 'bg-white/10';
          if (i === currentIndex) bg = 'bg-primary shadow-lg shadow-primary/30';
          else if (result) bg = result.isCorrect ? 'bg-green-500/30' : 'bg-red-500/30';

          return (
            <div
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all ${bg} ${
                i === currentIndex ? 'text-white scale-110' : 'text-gray-400'
              }`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}

function ActiveQuiz({ quiz, settings }) {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExit, setShowExit] = useState(false);

  const { currentQuestion, currentQuestionIndex, totalQuestions, score, streak, timeLeft, results, submitAnswer } = quiz;

  const handleSelect = (index) => {
    if (showFeedback) return;
    setSelected(index);
    setShowFeedback(true);
  };

  const handleNext = () => {
    submitAnswer(selected);
    setShowFeedback(false);
    setSelected(null);
  };

  const isCorrect = selected === currentQuestion?.correct;

  return (
    <div className="max-w-3xl mx-auto px-2 md:px-0">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setShowExit(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
        >
          <ArrowLeft size={14} /> Exit
        </button>
        <div className="flex items-center gap-2">
          {settings.timerMode && (
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${
              timeLeft < 10 ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'
            }`}>
              <Timer className={timeLeft < 10 ? 'text-red-400' : 'text-primary'} size={14} />
              <span className={`font-mono text-sm font-bold ${timeLeft < 10 ? 'text-red-400' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-400/10 border border-orange-400/20">
            <Zap size={14} className="text-orange-400" />
            <span className="text-orange-400 font-bold text-xs">{streak}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="text-gray-400 text-xs font-bold">{score}/{totalQuestions}</span>
          </div>
        </div>
      </div>

      <div className="w-full h-1 bg-white/5 rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${((currentQuestionIndex) / totalQuestions) * 100}%` }}
        />
      </div>

      <QuestionOverview questions={quiz.questions || []} currentIndex={currentQuestionIndex} results={results} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            {currentQuestion?.category && (
              <span className="text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">{currentQuestion.category}</span>
            )}
            {currentQuestion?.difficulty && (
              <span className={`text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-500/10 text-green-400' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                'bg-red-500/10 text-red-400'
              }`}>{currentQuestion.difficulty}</span>
            )}
          </div>

          <h2 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6 leading-tight">
            {currentQuestion?.question}
          </h2>

          <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
            {currentQuestion?.options.map((option, index) => {
              const isOptionCorrect = index === currentQuestion.correct;
              const isSelected = selected === index;
              let classes = "w-full text-left p-3 md:p-5 rounded-xl md:rounded-2xl border transition-all duration-300 ";

              if (showFeedback) {
                if (isOptionCorrect) classes += "bg-green-500/15 border-green-500/40 text-green-300";
                else if (isSelected && !isOptionCorrect) classes += "bg-red-500/15 border-red-500/40 text-red-300";
                else classes += "bg-white/5 border-white/5 text-gray-500 opacity-50";
              } else {
                classes += "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white cursor-pointer";
              }

              return (
                <button key={index} onClick={() => handleSelect(index)} disabled={showFeedback} className={classes}>
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className={`w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-lg md:rounded-xl text-xs md:text-sm font-bold shrink-0 ${
                      showFeedback && isOptionCorrect ? 'bg-green-500/20 text-green-400' :
                      showFeedback && isSelected ? 'bg-red-500/20 text-red-400' :
                      'bg-white/5 text-gray-400'
                    }`}>
                      {showFeedback && isOptionCorrect ? <Check size={14} /> :
                       showFeedback && isSelected ? <X size={14} /> :
                       String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium text-sm md:text-base">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Inline Feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className={`p-4 md:p-6 rounded-xl md:rounded-2xl border mb-4 md:mb-6 ${
                  isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <X size={16} className="text-red-400" />
                    )}
                    <span className={`font-bold text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? 'Correct!' : 'Not quite right'}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-xs md:text-sm">{currentQuestion?.explanation}</p>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-primary text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 text-sm md:text-base"
                >
                  {currentQuestionIndex + 1 < totalQuestions ? (
                    <>Continue <ChevronRight size={18} /></>
                  ) : (
                    <>See Results <Trophy size={18} /></>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <ExitConfirm isOpen={showExit} onStay={() => setShowExit(false)} onExit={() => window.location.href = '/dashboard'} />
    </div>
  );
}

function ResultsScreen({ quiz, onRestart }) {
  const { score, totalQuestions, xp, streak, results } = quiz;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const [reviewMode, setReviewMode] = useState(false);

  const categoryBreakdown = results.reduce((acc, r) => {
    const cat = r.category || 'General';
    if (!acc[cat]) acc[cat] = { correct: 0, total: 0 };
    acc[cat].total++;
    if (r.isCorrect) acc[cat].correct++;
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-10"
      >
        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 ${
          percentage >= 80 ? 'bg-green-500/20' : percentage >= 50 ? 'bg-yellow-500/20' : 'bg-red-500/20'
        }`}>
          <Trophy className={percentage >= 80 ? 'text-green-400' : percentage >= 50 ? 'text-yellow-400' : 'text-red-400'} size={48} />
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Quiz Completed!</h2>
        <p className="text-gray-400">
          {percentage >= 80 ? 'Outstanding performance!' : percentage >= 50 ? 'Good effort, keep practicing!' : 'Keep learning, you\'ll get there!'}
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-5 text-center">
          <p className="text-gray-500 text-xs font-bold uppercase mb-1">Score</p>
          <p className="text-3xl font-bold text-white">{score}/{totalQuestions}</p>
          <p className="text-xs text-gray-500 mt-1">{percentage}%</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-gray-500 text-xs font-bold uppercase mb-1">XP Gained</p>
          <p className="text-3xl font-bold text-primary">+{xp}</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-gray-500 text-xs font-bold uppercase mb-1">Best Streak</p>
          <p className="text-3xl font-bold text-orange-400">{streak}</p>
        </div>
      </div>

      {Object.keys(categoryBreakdown).length > 0 && (
        <div className="glass-card p-5 mb-8">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown).map(([cat, data]) => (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-sm text-gray-300 font-medium">{cat}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(data.correct / data.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-12 text-right">{data.correct}/{data.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          onClick={() => setReviewMode(!reviewMode)}
          className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border border-white/10 min-h-[48px]"
        >
          <BarChart3 size={20} /> {reviewMode ? 'Hide Review' : 'Review Answers'}
        </button>
        <button
          onClick={onRestart}
          className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border border-white/10 min-h-[48px]"
        >
          <RotateCcw size={20} /> Try Again
        </button>
        <Link
          to="/dashboard"
          className="flex-1 bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <ArrowLeft size={20} /> Dashboard
        </Link>
      </div>

      <AnimatePresence>
        {reviewMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 mb-8">
              {results.map((r, i) => (
                <div key={i} className={`glass-card p-5 border-l-4 ${r.isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold text-gray-500">Q{i + 1}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary">{r.category}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        r.difficulty === 'easy' ? 'bg-green-500/10 text-green-400' :
                        r.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>{r.difficulty}</span>
                      {r.isCorrect ? (
                        <Check size={16} className="text-green-400" />
                      ) : (
                        <X size={16} className="text-red-400" />
                      )}
                    </div>
                  </div>
                  <p className="text-white font-medium text-sm mb-3">{r.question}</p>
                  <div className="space-y-1.5 mb-3">
                    {r.options.map((opt, j) => (
                      <div key={j} className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${
                        j === r.correct ? 'bg-green-500/10 text-green-300' :
                        j === r.answerIndex && !r.isCorrect ? 'bg-red-500/10 text-red-300' :
                        'bg-white/5 text-gray-500'
                      }`}>
                        <span className="font-bold">{String.fromCharCode(65 + j)}.</span>
                        <span>{opt}</span>
                        {j === r.correct && <Check size={12} className="ml-auto text-green-400" />}
                        {j === r.answerIndex && !r.isCorrect && <X size={12} className="ml-auto text-red-400" />}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{r.explanation}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';

  const [settings, setSettings] = useState({
    difficulty: 'all',
    category: urlCategory,
    timerMode: true,
    mode: 'daily'
  });

  useEffect(() => {
    if (urlCategory !== 'all') {
      setSettings(prev => ({ ...prev, category: urlCategory }));
    }
  }, [urlCategory]);

  const quiz = useQuiz(settings);

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-8rem)]">
        {!quiz.isActive && !quiz.isFinished && (
          <SettingsScreen settings={settings} setSettings={setSettings} startQuiz={quiz.startQuiz} isLaunching={quiz.isLaunching} />
        )}
        {quiz.isFinished && (
          <ResultsScreen quiz={quiz} onRestart={quiz.startQuiz} />
        )}
        {quiz.isActive && !quiz.isFinished && (
          <ActiveQuiz quiz={quiz} settings={settings} />
        )}
      </div>
    </DashboardLayout>
  );
}
