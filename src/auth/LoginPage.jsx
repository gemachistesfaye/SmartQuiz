import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, Eye, EyeOff, Brain, LogIn, Phone, ArrowLeft } from 'lucide-react';
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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      setLoading(true);
      const { userDoc } = await login(formData.email, formData.password);
      toast.success("Welcome back!");
      
      const dest = userDoc.role === 'admin' ? "/admin/dashboard" : "/dashboard";
      navigate(dest, { replace: true });
    } catch (error) {
      console.error("Email login error:", error);
      if (error.code === 'auth/user-not-found') {
        toast.error("No account found with this email");
      } else if (error.code === 'auth/wrong-password') {
        toast.error("Incorrect password");
      } else if (error.code === 'auth/invalid-email') {
        toast.error("Invalid email address");
      } else if (error.code === 'auth/too-many-requests') {
        toast.error("Too many failed attempts. Please try again later");
      } else if (error.code === 'auth/invalid-credential') {
        toast.error("Invalid email or password");
      } else {
        toast.error(error.message || "Login failed. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { userDoc } = await loginWithGoogle();
      toast.success("Logged in with Google!");
      
      const dest = userDoc.role === 'admin' ? "/admin/dashboard" : "/dashboard";
      navigate(dest, { replace: true });
    } catch (error) {
      console.error("Google login error:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup intentionally — no error needed
        return;
      } else if (error.code === 'auth/popup-blocked') {
        toast.error("Popup blocked. Please allow popups for this site");
      } else {
        toast.error(error.message || "Google login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-md w-full p-6 md:p-8 relative z-10"
      >
        <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className="text-center mb-6 mt-4">
          <div className="bg-primary/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Brain className="text-primary" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">
            {loginMode === 'email' ? 'Welcome Back' : 'Phone Login'}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
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
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <label htmlFor="login-email" className="sr-only">Email Address</label>
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    id="login-email"
                    type="email" 
                    placeholder="Email Address" 
                    required
                    autoFocus
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="login-password" className="sr-only">Password</label>
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    id="login-password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                    <input type="checkbox" className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary/20" />
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="text-primary hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><LogIn size={20}/> Log In</>}
                </button>
              </form>
            </motion.div>
          ) : (
            <PhoneLogin onBack={() => setLoginMode('email')} />
          )}
        </AnimatePresence>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-gray-400 font-bold tracking-widest">Or continue with</span></div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleGoogleLogin}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] whitespace-nowrap"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          
          <button 
            type="button"
            onClick={() => setLoginMode('phone')}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] whitespace-nowrap"
          >
            <Phone size={20} className="text-gray-300 shrink-0" />
            Phone
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          New to SmartQuiz? <Link to="/register" className="text-primary font-bold hover:underline">Create an Account</Link>
        </p>
      </motion.div>
    </div>
  );
}
