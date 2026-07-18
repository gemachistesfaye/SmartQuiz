import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ChevronRight } from 'lucide-react';

export default function ExplanationModal({ isOpen, explanation, isCorrect, nextQuestion }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      nextQuestion();
    }
  }, [nextQuestion]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card max-w-lg w-full p-8 relative overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={isCorrect ? 'Correct answer' : 'Incorrect answer'}
          >
            <div className={`absolute top-0 left-0 w-full h-2 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`} />
            
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                <Info size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">
                {isCorrect ? 'Correct!' : 'Not quite right'}
              </h3>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8">
              {explanation}
            </p>

            <button
              onClick={nextQuestion}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              Continue
              <ChevronRight size={20} />
            </button>
            <p className="text-center text-gray-600 text-xs mt-3">Press Enter or Escape to continue</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
