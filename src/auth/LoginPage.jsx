import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, Eye, EyeOff, Brain, LogIn, Phone } from 'lucide-react';
import PhoneLogin from './PhoneLogin';

export default function LoginPage() {
  const [loginMode, setLoginMode] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login, loginWithGoogle, userData } = useAuth();
  const navigate = useNavigate();

  // If already logged in and we have user data, redirect immediately
  useEffect(() => {
    if (userData) {
      const dest = userData.role === 'admin' ? "/admin/dashboard" : "/dashboard";
      navigate(dest, { replace: true });
    }
  }, [userData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { userDoc } = await login(formData.email, formData.password);
      toast.success("Welcome back!");
      
      const dest = userDoc.role === 'admin' ? "/admin/dashboard" : "/dashboard";
      navigate(dest, { replace: true });
    } catch {
      toast.error("Invalid email or password");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { userDoc } = await loginWithGoogle();
      toast.success("Logged in with Google!");
      
      const dest = userDoc.role === 'admin' ? "/admin/dashboard" : "/dashboard";
      navigate(dest, { replace: true });
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-md w-full p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="bg-primary/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Brain className="text-primary" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white">
            {loginMode === 'email' ? 'Welcome Back' : 'Phone Login'}
          </h1>
          <p className="text-gray-400 mt-2">
            {loginMode === 'email' ? 'Log in to your SmartQuiz account' : 'Enter your number to receive an OTP'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {loginMode === 'email' ? (
            <motion.div
              key="email-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-primary/50 transition-colors"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                    <input type="checkbox" className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary/20" />
                    Remember me
                  </label>
                  <Link to="/forgot-password" size={20} className="text-primary hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><LogIn size={20}/> Log In</>}
                </button>

                <button 
                  type="button"
                  onClick={() => setLoginMode('phone')}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3"
                >
                  <Phone size={20} className="text-gray-400" />
                  Sign in with Phone
                </button>
              </form>
            </motion.div>
          ) : (
            <PhoneLogin onBack={() => setLoginMode('email')} />
          )}
        </AnimatePresence>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-gray-500 font-bold tracking-widest">Or continue with</span></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-5 h-5" alt="Google" />
          Google Account
        </button>

        <p className="text-center text-gray-500 text-sm mt-10">
          New to SmartQuiz? <Link to="/register" className="text-primary font-bold hover:underline">Create an Account</Link>
        </p>
      </motion.div>
    </div>
  );
}
