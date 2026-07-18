import { motion } from 'framer-motion';

export default function QuestionCard({ question, onSelect, selectedIndex, isAnswered }) {
  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold text-white mb-8 leading-tight">
        {question.question}
      </h2>

      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correct;
          const isSelected = selectedIndex === index;
          
          let buttonClass = "w-full text-left p-5 rounded-2xl glass transition-all duration-300 border border-white/5 ";
          
          if (isAnswered) {
            if (isCorrect) buttonClass += "bg-green-500/20 border-green-500/50 text-green-400";
            else if (isSelected) buttonClass += "bg-red-500/20 border-red-500/50 text-red-400";
            else buttonClass += "opacity-50";
          } else {
            buttonClass += "hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white";
          }

          return (
            <button
              key={index}
              onClick={() => !isAnswered && onSelect(index)}
              disabled={isAnswered}
              className={buttonClass}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
