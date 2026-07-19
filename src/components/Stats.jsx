import { motion } from 'framer-motion';

const stats = [
  { value: '6+', label: 'Languages' },
  { value: '500+', label: 'Quizzes' },
  { value: '10K+', label: 'Learners' },
  { value: '4.9/5', label: 'Rating' },
];

export default function Stats() {
  return (
    <section className="py-12 relative z-20 -mt-12">
      <div className="container mx-auto px-6">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-5xl mx-auto shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center flex flex-col items-center justify-center"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-1 drop-shadow-sm">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-[11px] text-gray-500 font-semibold uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
