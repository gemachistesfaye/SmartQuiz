import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Menu, X, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-xl">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">Smart<span className="text-gradient">Quiz</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Features</a>
          <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Testimonials</a>
          <Link to="/quiz" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Quick Quiz</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/dashboard" 
                className="bg-primary/20 hover:bg-primary/30 text-primary px-6 py-2.5 rounded-full text-sm font-bold transition-all border border-primary/20 flex items-center gap-2"
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <button 
                onClick={async () => {
                  await logout();
                  navigate('/login');
                }}
                className="text-gray-400 hover:text-red-400 text-sm font-bold transition-colors"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Log in</Link>
              <Link 
                to="/register" 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-gray-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full glass border-t border-white/10 p-6 flex flex-col gap-4 md:hidden"
        >
          <a href="#features" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#testimonials" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Testimonials</a>
          <Link to="/quiz" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Quick Quiz</Link>
          <hr className="border-white/10 my-2" />
          {currentUser ? (
            <Link to="/dashboard" className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-center" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-left text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Log in</Link>
              <Link to="/register" className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-center mt-2" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
}
