import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../hooks/useQuiz';
import DarkSelect from '../components/ui/DarkSelect';
import { Brain, Timer, Zap, Trophy, ArrowLeft, Check, X, ChevronRight, RotateCcw, BarChart3, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

function ExitConfirm({ isOpen, onStay, onExit }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
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

function SettingsScreen({ settings, setSettings, startQuiz, isLaunching }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="glass-card max-w-2xl w-full p-10 text-center">
        <div className="bg-primary/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Brain className="text-primary" size={40} />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          {settings.category !== 'all' ? settings.category : 'JS'} Mastery Quiz
        </h1>
        <p className="text-gray-400 mb-10 leading-relaxed">
          Test your {settings.category !== 'all' ? settings.category : 'JavaScript'} knowledge.
          Choose your settings and aim for a perfect streak!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
          <DarkSelect
            label="Category"
            value={settings.category}
            onChange={(val) => setSettings({...settings, category: val})}
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'JavaScript', label: 'JavaScript' },
              { value: 'HTML', label: 'HTML' },
              { value: 'CSS', label: 'CSS' },
              { value: 'React', label: 'React' },
              { value: 'Cybersecurity', label: 'Cybersecurity' },
            ]}
          />
          <DarkSelect
            label="Difficulty"
            value={settings.difficulty}
            onChange={(val) => setSettings({...settings, difficulty: val})}
            options={[
              { value: 'all', label: 'All Levels' },
              { value: 'easy', label: 'Easy' },
              { value: 'medium', label: 'Medium' },
              { value: 'hard', label: 'Hard' },
            ]}
          />
          <DarkSelect
            label="Mode"
            value={settings.mode}
            onChange={(val) => setSettings({...settings, mode: val})}
            options={[
              { value: 'daily', label: 'Daily Challenge (5 Qs)' },
              { value: 'marathon', label: 'Marathon (All Qs)' },
            ]}
          />
        </div>

        <button
          onClick={startQuiz}
          disabled={isLaunching}
          className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isLaunching ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Loading Questions...
            </>
          ) : (
            'Launch Quiz'
          )}
        </button>
      </div>
    </div>
  );
}

function QuestionOverview({ questions, currentIndex, results }) {
  return (
    <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-2">
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
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowExit(true)}
          className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
        >
          <ArrowLeft size={16} /> Exit
        </button>
        <div className="flex items-center gap-4">
          {settings.timerMode && (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
              timeLeft < 10 ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'
            }`}>
              <Timer className={timeLeft < 10 ? 'text-red-400' : 'text-primary'} size={18} />
              <span className={`font-mono text-lg font-bold ${timeLeft < 10 ? 'text-red-400' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-400/10 border border-orange-400/20">
            <Zap size={18} className="text-orange-400" />
            <span className="text-orange-400 font-bold text-sm">{streak}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-gray-400 text-sm font-bold">{score}/{totalQuestions}</span>
          </div>
        </div>
      </div>

      <div className="w-full h-1.5 bg-white/5 rounded-full mb-6 overflow-hidden">
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
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            {currentQuestion?.category && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary">{currentQuestion.category}</span>
            )}
            {currentQuestion?.difficulty && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-500/10 text-green-400' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                'bg-red-500/10 text-red-400'
              }`}>{currentQuestion.difficulty}</span>
            )}
          </div>

          <h2 className="text-2xl font-bold text-white mb-6 leading-tight">
            {currentQuestion?.question}
          </h2>

          <div className="space-y-3 mb-6">
            {currentQuestion?.options.map((option, index) => {
              const isOptionCorrect = index === currentQuestion.correct;
              const isSelected = selected === index;
              let classes = "w-full text-left p-5 rounded-2xl border transition-all duration-300 ";

              if (showFeedback) {
                if (isOptionCorrect) classes += "bg-green-500/15 border-green-500/40 text-green-300";
                else if (isSelected && !isOptionCorrect) classes += "bg-red-500/15 border-red-500/40 text-red-300";
                else classes += "bg-white/5 border-white/5 text-gray-500 opacity-50";
              } else {
                classes += "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white cursor-pointer";
              }

              return (
                <button key={index} onClick={() => handleSelect(index)} disabled={showFeedback} className={classes}>
                  <div className="flex items-center gap-4">
                    <span className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold shrink-0 ${
                      showFeedback && isOptionCorrect ? 'bg-green-500/20 text-green-400' :
                      showFeedback && isSelected ? 'bg-red-500/20 text-red-400' :
                      'bg-white/5 text-gray-400'
                    }`}>
                      {showFeedback && isOptionCorrect ? <Check size={16} /> :
                       showFeedback && isSelected ? <X size={16} /> :
                       String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium">{option}</span>
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
                <div className={`p-6 rounded-2xl border mb-6 ${
                  isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    {isCorrect ? (
                      <Check size={20} className="text-green-400" />
                    ) : (
                      <X size={20} className="text-red-400" />
                    )}
                    <span className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? 'Correct!' : 'Not quite right'}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm">{currentQuestion?.explanation}</p>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                >
                  {currentQuestionIndex + 1 < totalQuestions ? (
                    <>Continue <ChevronRight size={20} /></>
                  ) : (
                    <>See Results <Trophy size={20} /></>
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

      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setReviewMode(!reviewMode)}
          className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border border-white/10"
        >
          <BarChart3 size={20} /> {reviewMode ? 'Hide Review' : 'Review Answers'}
        </button>
        <button
          onClick={onRestart}
          className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border border-white/10"
        >
          <RotateCcw size={20} /> Try Again
        </button>
        <Link
          to="/dashboard"
          className="flex-1 bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
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
  const [settings, setSettings] = useState({
    difficulty: 'all',
    category: 'all',
    timerMode: true,
    mode: 'daily'
  });

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
