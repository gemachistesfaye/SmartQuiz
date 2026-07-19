import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { addBookmark, removeBookmark, subscribeToBookmarks } from '../utils/bookmarks';
import { concepts } from '../data/theoryVault';
import { Search, BookOpen, ChevronRight, X, Sparkles, Code, Terminal, Bookmark, BookmarkCheck } from 'lucide-react';

export default function TheoryVault() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const unsub = subscribeToBookmarks(currentUser.uid, (data) => {
      setBookmarks(data.filter(b => b.type === 'theory'));
    });
    return () => unsub();
  }, [currentUser]);

  const bookmarkedTitles = useMemo(() => new Set(bookmarks.map(b => b.title)), [bookmarks]);

  const categories = useMemo(() => ['All', ...new Set(concepts.map(c => c.category))], []);

  const filteredConcepts = useMemo(() =>
    concepts.filter(c =>
      (activeCategory === 'All' || c.category === activeCategory) &&
      (!showBookmarksOnly || bookmarkedTitles.has(c.title)) &&
      (c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       c.subcategory.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [activeCategory, searchTerm, showBookmarksOnly, bookmarkedTitles]);

  const categoryColors = {
    JavaScript: 'text-yellow-400',
    HTML: 'text-orange-400',
    CSS: 'text-blue-400',
    Cybersecurity: 'text-red-400',
    React: 'text-cyan-400',
    TypeScript: 'text-blue-300',
    Python: 'text-green-400',
    Backend: 'text-purple-400',
    SQL: 'text-amber-400',
    NoSQL: 'text-emerald-400',
    'AI Engineering': 'text-fuchsia-400',
    'Artificial Intelligence': 'text-rose-400',
    DSA: 'text-teal-400',
  };

  return (
    <DashboardLayout>
      <div className="px-4 md:px-6 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-10">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-white flex items-center gap-3">
              <BookOpen className="text-primary" size={28} /> Theory Vault
            </h1>
            <p className="text-gray-400 mt-1 text-sm">{concepts.length} concepts across {categories.length - 1} categories</p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search concepts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors text-sm"
            />
          </div>
          <button
            onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border shrink-0 ${
              showBookmarksOnly
                ? 'bg-primary border-primary text-white'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            {showBookmarksOnly ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            {showBookmarksOnly ? 'Bookmarked' : `Bookmarks (${bookmarks.length})`}
          </button>
        </div>

        {/* Category Dropdown */}
        <div className="mb-6 md:mb-10">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full md:w-72 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-primary/50 appearance-none cursor-pointer min-h-[44px]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat} {cat !== 'All' ? `(${concepts.filter(c => cat === 'All' || c.category === cat).length})` : `(${concepts.length})`}</option>
            ))}
          </select>
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
              <div key={sub} className="mb-6 md:mb-10">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${categoryColors[activeCategory] || 'bg-primary'}`} />
                  {sub}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                  {items.map((concept, i) => (
                    <ConceptCard key={concept.title} concept={concept} index={i} onClick={() => setSelectedConcept(concept)} isBookmarked={bookmarkedTitles.has(concept.title)} />
                  ))}
                </div>
              </div>
            ));
          })()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredConcepts.map((concept, i) => (
                <ConceptCard key={concept.title} concept={concept} index={i} onClick={() => setSelectedConcept(concept)} isBookmarked={bookmarkedTitles.has(concept.title)} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedConcept && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={selectedConcept.title}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedConcept(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
              >
                <button
                  onClick={() => setSelectedConcept(null)}
                  className="absolute top-4 right-4 md:top-8 md:right-8 text-gray-400 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-white/10"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${categoryColors[selectedConcept.category] || 'text-primary'} bg-white/5`}>
                    {selectedConcept.category}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {selectedConcept.subcategory}
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">{selectedConcept.title}</h2>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Terminal size={16} className="text-primary" /> Concept Overview
                    </h4>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                      {selectedConcept.content}
                    </p>
                  </section>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => { setSelectedConcept(null); navigate(`/quiz?category=${encodeURIComponent(selectedConcept.category)}`); }}
                      className="flex-1 bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                      Take {selectedConcept.category} Quiz
                    </button>
                    <button
                      onClick={async () => {
                        if (!currentUser) { toast.error("Please log in to bookmark"); return; }
                        if (bookmarkedTitles.has(selectedConcept.title)) {
                          await removeBookmark(currentUser.uid, 'theory', selectedConcept.title);
                          toast.success(`Removed "${selectedConcept.title}"`);
                        } else {
                          const ok = await addBookmark(currentUser.uid, {
                            type: 'theory',
                            title: selectedConcept.title,
                            description: selectedConcept.description,
                            category: selectedConcept.category,
                            subcategory: selectedConcept.subcategory,
                          });
                          toast[ok ? 'success' : 'info'](ok ? `${selectedConcept.title} bookmarked!` : 'Already bookmarked');
                        }
                      }}
                      className="px-6 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-all flex items-center gap-2"
                    >
                      {bookmarkedTitles.has(selectedConcept.title) ? <BookmarkCheck size={16} className="text-primary" /> : <Bookmark size={16} />}
                      {bookmarkedTitles.has(selectedConcept.title) ? 'Bookmarked' : 'Bookmark'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

function ConceptCard({ concept, index, onClick, isBookmarked }) {
  const categoryColors = {
    JavaScript: 'bg-yellow-400/20 text-yellow-400',
    HTML: 'bg-orange-400/20 text-orange-400',
    CSS: 'bg-blue-400/20 text-blue-400',
    Cybersecurity: 'bg-red-400/20 text-red-400',
    React: 'bg-cyan-400/20 text-cyan-400',
    TypeScript: 'bg-blue-300/20 text-blue-300',
    Python: 'bg-green-400/20 text-green-400',
    Backend: 'bg-purple-400/20 text-purple-400',
    SQL: 'bg-amber-400/20 text-amber-400',
    NoSQL: 'bg-emerald-400/20 text-emerald-400',
    'AI Engineering': 'bg-fuchsia-400/20 text-fuchsia-400',
    'Artificial Intelligence': 'bg-rose-400/20 text-rose-400',
    DSA: 'bg-teal-400/20 text-teal-400',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.03 }}
      onClick={onClick}
      className="glass-card p-4 md:p-6 cursor-pointer group hover:border-primary/30 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${categoryColors[concept.category] || 'bg-primary/10 text-primary'}`}>
          {concept.subcategory}
        </span>
        <div className="flex items-center gap-1">
          {isBookmarked && <BookmarkCheck size={14} className="text-primary" />}
          <div className="text-gray-600 group-hover:text-primary transition-colors">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{concept.title}</h3>
      <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
        {concept.description}
      </p>
      <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        <Sparkles size={12} className="text-yellow-400" /> Read Concept
      </div>
    </motion.div>
  );
}
