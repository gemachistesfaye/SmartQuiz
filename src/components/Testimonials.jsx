import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Hanna Tesfaye",
    role: "CS Student at Addis Ababa University",
    image: "https://ui-avatars.com/api/?name=Hanna+Tesfaye&background=3b82f6&color=fff",
    content: "SmartQuiz helped me go from struggling with JavaScript basics to building full React apps. The AI hints explain things in a way that actually makes sense. I use it every day before class.",
    rating: 5
  },
  {
    name: "Dawit Mekonnen",
    role: "Self-taught Developer, Addis Ababa",
    image: "https://ui-avatars.com/api/?name=Dawit+Mekonnen&background=8b5cf6&color=fff",
    content: "I tried Udemy and YouTube, but SmartQuiz is different — the code lab lets me practice right in the browser. The Python and cybersecurity tracks are exactly what I needed for my freelance work.",
    rating: 5
  },
  {
    name: "Fatuma Ahmed",
    role: "Junior Frontend Developer",
    image: "https://ui-avatars.com/api/?name=Fatuma+Ahmed&background=ec4899&color=fff",
    content: "As a woman in tech in Ethiopia, finding good learning resources was hard. SmartQuiz gave me the structure I needed. I completed the HTML/CSS track in 2 weeks and landed my first internship.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-24 relative bg-black/40 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Loved by <span className="text-primary">Ethiopian learners</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-sm md:text-base"
          >
            Real stories from developers across Ethiopia who are building their careers with SmartQuiz.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111] border border-white/5 rounded-2xl p-5 md:p-6 flex flex-col hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5 flex-grow">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="text-white text-sm font-semibold">{testimonial.name}</h4>
                  <p className="text-[10px] text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
