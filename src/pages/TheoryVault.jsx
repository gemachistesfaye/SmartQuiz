import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashboardLayout from '../layouts/DashboardLayout';
import { concepts } from '../data/theoryVault';
import { Search, BookOpen, ChevronRight, X, Sparkles, Code, Terminal } from 'lucide-react';

export default function TheoryVault() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(concepts.map(c => c.category))], []);

  const filteredConcepts = useMemo(() =>
    concepts.filter(c =>
      (activeCategory === 'All' || c.category === activeCategory) &&
      (c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       c.subcategory.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [activeCategory, searchTerm]);

  const categoryColors = {
    JavaScript: 'text-yellow-400',
    HTML: 'text-orange-400',
    CSS: 'text-blue-400',
    Cybersecurity: 'text-red-400',
    React: 'text-cyan-400',
  };

  return (
    <DashboardLayout>
      <div className="px-6 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <BookOpen className="text-primary" size={32} /> Theory Vault
            </h1>
            <p className="text-gray-400 mt-1">{concepts.length} concepts across {categories.length - 1} categories</p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search concepts, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === cat
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:border-white/10'
              }`}
            >
              {cat} {cat !== 'All' && <span className="ml-1 opacity-60">({concepts.filter(c => cat === 'All' || c.category === cat).length})</span>}
            </button>
          ))}
        </div>

        {/* Subcategory groups */}
        {activeCategory !== 'All' ? (
          (() => {
            const grouped = {};
            filteredConcepts.forEach(c => {
              if (!grouped[c.subcategory]) grouped[c.subcategory] = [];
              grouped[c.subcategory].push(c);
            });
            return Object.entries(grouped).map(([sub, items]) => (
              <div key={sub} className="mb-10">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${categoryColors[activeCategory] || 'bg-primary'}`} />
                  {sub}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((concept, i) => (
                    <ConceptCard key={concept.title} concept={concept} index={i} onClick={() => setSelectedConcept(concept)} />
                  ))}
                </div>
              </div>
            ));
          })()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredConcepts.map((concept, i) => (
                <ConceptCard key={concept.title} concept={concept} index={i} onClick={() => setSelectedConcept(concept)} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedConcept && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedConcept(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-[2rem] p-8 md:p-12 z-[70] max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
              >
                <button
                  onClick={() => setSelectedConcept(null)}
                  className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${categoryColors[selectedConcept.category] || 'text-primary'} bg-white/5`}>
                    {selectedConcept.category}
                  </span>
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                    {selectedConcept.subcategory}
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-white mb-6">{selectedConcept.title}</h2>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Terminal size={16} className="text-primary" /> Concept Overview
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      {selectedConcept.content}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Code size={16} className="text-primary" /> Practical Example
                    </h4>
                    <pre className="bg-black/50 border border-white/5 rounded-2xl p-6 text-sm font-mono text-primary-200 overflow-x-auto whitespace-pre-wrap">
                      {selectedConcept.example}
                    </pre>
                  </section>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => { setSelectedConcept(null); navigate('/quiz'); }}
                      className="flex-1 bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                      Take {selectedConcept.title} Quiz
                    </button>
                    <button
                      onClick={() => { toast.success(`${selectedConcept.title} saved to bookmarks!`); }}
                      className="px-6 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-all"
                    >
                      Bookmark
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

function ConceptCard({ concept, index, onClick }) {
  const categoryColors = {
    JavaScript: 'bg-yellow-400/20 text-yellow-400',
    HTML: 'bg-orange-400/20 text-orange-400',
    CSS: 'bg-blue-400/20 text-blue-400',
    Cybersecurity: 'bg-red-400/20 text-red-400',
    React: 'bg-cyan-400/20 text-cyan-400',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.03 }}
      onClick={onClick}
      className="glass-card p-6 cursor-pointer group hover:border-primary/30 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${categoryColors[concept.category] || 'bg-primary/10 text-primary'}`}>
          {concept.subcategory}
        </span>
        <div className="text-gray-600 group-hover:text-primary transition-colors">
          <ChevronRight size={20} />
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{concept.title}</h3>
      <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
        {concept.description}
      </p>
      <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        <Sparkles size={12} className="text-yellow-400" /> Read Concept
      </div>
    </motion.div>
  );
}
