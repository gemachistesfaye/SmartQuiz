import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { db } from '../services/firebase';
import { collection, addDoc, deleteDoc, doc, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import DashboardLayout from '../layouts/DashboardLayout';
import { Plus, Trash2, Database, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

const PAGE_SIZE = 20;

export default function AdminPanel() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correct: 0,
    difficulty: 'medium',
    category: 'JavaScript',
    explanation: ''
  });

  const fetchQuestions = useCallback(async (isInitial = false) => {
    try {
      setPageLoading(true);
      let q;
      if (isInitial) {
        q = query(collection(db, 'questions'), orderBy('question', 'asc'), limit(PAGE_SIZE));
      } else if (lastDoc) {
        q = query(collection(db, 'questions'), orderBy('question', 'asc'), startAfter(lastDoc), limit(PAGE_SIZE));
      } else {
        return;
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

      if (isInitial) {
        setQuestions(data);
      } else {
        setQuestions(prev => [...prev, ...data]);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (err) {
      console.error('Error fetching questions:', err);
      toast.error('Failed to load questions');
    } finally {
      setPageLoading(false);
    }
  }, [lastDoc]);

  useEffect(() => {
    fetchQuestions(true);
  }, []);

  const handleAddQuestion = async (e) => {
    e.preventDefault();

    // Validate
    if (!newQuestion.question.trim()) {
      toast.error('Question text is required');
      return;
    }
    if (newQuestion.options.some(o => !o.trim())) {
      toast.error('All 4 options are required');
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, 'questions'), {
        ...newQuestion,
        question: newQuestion.question.trim(),
        explanation: newQuestion.explanation.trim(),
        options: newQuestion.options.map(o => o.trim()),
      });
      toast.success('Question added to database!');
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correct: 0,
        difficulty: 'medium',
        category: 'JavaScript',
        explanation: ''
      });
      // Refresh the list
      await fetchQuestions(true);
    } catch (error) {
      console.error('Error adding question:', error);
      toast.error('Failed to add question');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await deleteDoc(doc(db, 'questions', id));
      setQuestions(prev => prev.filter(q => q.id !== id));
      toast.info('Question deleted');
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Failed to delete question');
    }
  };

  const loadMore = async () => {
    setPage(p => p + 1);
    await fetchQuestions(false);
  };

  const loadPrevious = () => {
    // Reset and refetch from beginning
    setPage(1);
    setLastDoc(null);
    fetchQuestions(true);
  };

  return (
    <DashboardLayout>
      <div className="px-6 pb-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* Add New Question */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 border-red-500/10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-red-500/20 p-2 rounded-lg text-red-500">
                <Plus size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Add New Question</h3>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500 uppercase">Question Text</label>
                <textarea
                  required
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-red-500/50 transition-colors h-24"
                  placeholder="Enter the question..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newQuestion.options.map((opt, i) => (
                  <div key={i} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Option {i + 1}</label>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...newQuestion.options];
                        newOpts[i] = e.target.value;
                        setNewQuestion({...newQuestion, options: newOpts});
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-red-500/50 transition-colors"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase">Correct Answer</label>
                  <select
                    value={newQuestion.correct}
                    onChange={(e) => setNewQuestion({...newQuestion, correct: parseInt(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none"
                  >
                    <option value={0}>Option 1</option>
                    <option value={1}>Option 2</option>
                    <option value={2}>Option 3</option>
                    <option value={3}>Option 4</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase">Difficulty</label>
                  <select
                    value={newQuestion.difficulty}
                    onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase">Category</label>
                  <select
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none"
                  >
                    {['JavaScript', 'HTML', 'CSS', 'React', 'TypeScript', 'Python', 'Cybersecurity', 'Backend', 'SQL', 'NoSQL', 'AI Engineering', 'AI', 'DSA'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-500 uppercase">Explanation</label>
                <input
                  type="text"
                  value={newQuestion.explanation}
                  onChange={(e) => setNewQuestion({...newQuestion, explanation: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-red-500/50 transition-colors"
                  placeholder="Why is this answer correct?"
                />
              </div>

              <button
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-50"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={20} /> Save Question</>}
              </button>
            </form>
          </motion.div>

          {/* Existing Questions List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-red-500/20 p-2 rounded-lg text-red-500">
                  <Database size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Question Bank</h3>
              </div>
              <span className="text-xs text-gray-500 font-bold">Page {page}</span>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {pageLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
                </div>
              ) : questions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No questions yet</p>
              ) : (
                questions.map((q) => (
                  <div key={q.id} className="p-4 rounded-xl bg-white/5 border border-white/5 group relative">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          q.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' :
                          q.difficulty === 'medium' ? 'bg-blue-500/20 text-blue-500' : 'bg-red-500/20 text-red-500'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                          {q.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-white font-medium mb-1 line-clamp-2">{q.question}</p>
                    <p className="text-xs text-gray-500 italic">{q.explanation}</p>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
              <button
                onClick={loadPrevious}
                disabled={page === 1}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <button
                onClick={loadMore}
                disabled={!hasMore || pageLoading}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
