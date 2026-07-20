import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User, Mail, Lock, Eye, EyeOff, Brain, ShieldCheck, ArrowLeft, Phone } from 'lucide-react';
import PhoneLogin from './PhoneLogin';

export default function RegisterPage() {
  const [registerMode, setRegisterMode] = useState('email');
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });
  const [usernameStatus, setUsernameStatus] = useState({ checking: false, valid: null, message: '' });

  const { register, loginWithGoogle, checkUsernameUnique } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { userDoc } = await loginWithGoogle();
      toast.success('Logged in with Google!');
      const dest = userDoc.role === 'admin' ? '/admin/dashboard' : '/dashboard';
      navigate(dest, { replace: true });
    } catch (error) {
      console.error('Google login error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        return;
      } else {
        toast.error(error.message || 'Google login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score, label: 'Medium', color: 'bg-yellow-500' };
    return { score, label: 'Strong', color: 'bg-green-500' };
  };

  const validateUsername = async (username) => {
    if (!username || username.length < 3) {
      setUsernameStatus({ checking: false, valid: false, message: 'Username must be at least 3 characters' });
      return false;
    }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      setUsernameStatus({ checking: false, valid: false, message: '3-20 chars, letters/numbers/underscores only' });
      return false;
    }

    setUsernameStatus({ checking: true, valid: null, message: 'Checking availability...' });
    const isUnique = await checkUsernameUnique(username);

    if (isUnique) {
      setUsernameStatus({ checking: false, valid: true, message: 'Username is available!' });
      return true;
    } else {
      setUsernameStatus({ checking: false, valid: false, message: 'Username is already taken' });
      return false;
    }
  };

  const validate = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (!usernameStatus.valid) {
      toast.error('Please choose a valid, unique username');
      return false;
    }
    if (!formData.agree) {
      toast.error('You must agree to the Terms & Conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await register(formData.email, formData.password, formData.fullName, formData.username);
      toast.success('Account created successfully! Check your email for verification.');
      navigate('/dashboard');
    } catch (error) {
      if (error.message === 'auth/username-already-taken') {
        toast.error('Username is already taken');
        setUsernameStatus({ checking: false, valid: false, message: 'Username is already taken' });
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card max-w-md w-full p-6 relative z-10"
      >
        <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="text-center mb-5 mt-4">
          <div className="bg-primary/20 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Brain className="text-primary" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white">Join SmartQuiz</h1>
          <p className="text-gray-400 text-sm mt-1">Start your journey to mastery</p>
        </div>

        {registerMode === 'email' ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <label htmlFor="reg-fullname" className="sr-only">Full Name</label>
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="reg-fullname"
              type="text"
              placeholder="Full Name"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div className="relative">
            <label htmlFor="reg-username" className="sr-only">Username</label>
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="reg-username"
              type="text"
              placeholder="Username"
              required
              value={formData.username}
              className={`w-full bg-white/5 border rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all ${
                usernameStatus.valid === false ? 'border-red-500/50' :
                usernameStatus.valid === true ? 'border-green-500/50' : 'border-white/10'
              }`}
              onChange={(e) => {
                setFormData({...formData, username: e.target.value});
                setUsernameStatus({ checking: false, valid: null, message: '' });
              }}
              onBlur={() => validateUsername(formData.username)}
            />
            {usernameStatus.message && (
              <p className={`text-[11px] mt-1 ml-1 ${
                usernameStatus.valid === true ? 'text-green-400' :
                usernameStatus.valid === false ? 'text-red-400' : 'text-gray-400'
              }`}>
                {usernameStatus.checking ? '...' : ''} {usernameStatus.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="reg-email" className="sr-only">Email Address</label>
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="reg-email"
              type="email"
              placeholder="Email Address"
              required
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <label htmlFor="reg-password" className="sr-only">Password</label>
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              onChange={(e) => {
                setFormData({...formData, password: e.target.value});
                setPasswordStrength(checkPasswordStrength(e.target.value));
              }}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {formData.password && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                    i <= passwordStrength.score ? passwordStrength.color : 'bg-white/10'
                  }`} />
                ))}
              </div>
              <p className={`text-xs font-medium ${
                passwordStrength.score <= 1 ? 'text-red-400' :
                passwordStrength.score <= 3 ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {passwordStrength.label}
              </p>
            </div>
          )}

          <div className="relative">
            <label htmlFor="reg-confirm" className="sr-only">Confirm Password</label>
            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="reg-confirm"
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <div className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              id="agree"
              className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/20"
              onChange={(e) => setFormData({...formData, agree: e.target.checked})}
            />
            <label htmlFor="agree" className="text-xs text-gray-300">
              I agree to the <Link to="/terms" target="_blank" className="text-primary hover:underline cursor-pointer">Terms & Conditions</Link>
            </label>
          </div>

          <button
            disabled={loading || usernameStatus.checking}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Create Account"}
          </button>
        </form>
        ) : (
          <PhoneLogin onBack={() => setRegisterMode('email')} />
        )}

        <div className="relative my-5">
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
            onClick={() => setRegisterMode('phone')}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] whitespace-nowrap"
          >
            <Phone size={20} className="text-gray-300 shrink-0" />
            Phone
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-5">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
}
