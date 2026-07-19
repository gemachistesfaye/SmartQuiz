import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Frontend Engineer at TechCorp",
    image: "https://i.pravatar.cc/150?img=1",
    content: "SmartQuiz completely changed how I learn. The AI hints are incredible, and the interactive IDE makes it so easy to practice immediately. I landed my first dev job after completing the advanced track!"
  },
  {
    name: "David Chen",
    role: "Full Stack Developer",
    image: "https://i.pravatar.cc/150?img=11",
    content: "The level of detail in the explanations is unmatched. I've tried many platforms, but the gamified approach here actually kept me coming back every single day. Highly recommended."
  },
  {
    name: "Elena Rodriguez",
    role: "Software Student",
    image: "https://i.pravatar.cc/150?img=5",
    content: "I love the clean UI and the dark mode. It feels like a premium tool. The real-world projects actually taught me things I use in my current job on a daily basis."
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative bg-black/40 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Loved by <span className="text-gradient">developers</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Don't just take our word for it. Here's what our community has to say about their learning experience.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 flex flex-col h-full"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-8 flex-grow leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full border-2 border-primary/50"
                />
                <div>
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
