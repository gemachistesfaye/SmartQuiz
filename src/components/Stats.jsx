import { motion } from 'framer-motion';

const stats = [
  { value: '10K+', label: 'Active Learners' },
  { value: '500+', label: 'Interactive Quizzes' },
  { value: '98%', label: 'Completion Rate' },
  { value: '4.9/5', label: 'Average Rating' },
];

export default function Stats() {
  return (
    <section className="py-10 border-y border-white/10 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
