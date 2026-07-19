import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Phone, ShieldCheck, ArrowRight, RefreshCcw } from 'lucide-react';

export default function PhoneLogin({ onBack }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  
  const { setupRecaptcha, signInWithPhone } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber.startsWith('+')) {
      toast.error("Please include country code (e.g., +1)");
      return;
    }

    try {
      setLoading(true);
      const verifier = setupRecaptcha('recaptcha-container');
      const result = await signInWithPhone(phoneNumber, verifier);
      setConfirmationResult(result);
      setStep('otp');
      toast.success("OTP sent to your phone!");
    } catch (error) {
      console.error("Phone login error:", error);
      if (error.code === 'auth/invalid-phone-number') {
        toast.error("Invalid phone number format");
      } else if (error.code === 'auth/too-many-requests') {
        toast.error("Too many attempts. Please try again later");
      } else if (error.code === 'auth/captcha-check-failed') {
        toast.error("reCAPTCHA verification failed. Please refresh and try again");
      } else {
        toast.error(error.message || "Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await confirmationResult.confirm(otp);
      toast.success("Login successful!");
      navigate('/dashboard');
    } catch (error) {
      console.error("OTP verification error:", error);
      if (error.code === 'auth/invalid-verification-code') {
        toast.error("Invalid OTP code. Please check and try again");
      } else if (error.code === 'auth/session-expired') {
        toast.error("Session expired. Please request a new OTP");
      } else {
        toast.error(error.message || "Failed to verify OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div id="recaptcha-container"></div>
      
      <AnimatePresence mode="wait">
        {step === 'phone' ? (
          <motion.form 
            key="phone-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSendOtp} 
            className="space-y-6"
          >
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="tel" 
                placeholder="+1 234 567 8900" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ArrowRight size={20}/> Send OTP</>}
            </button>
            <button 
              type="button"
              onClick={onBack}
              className="w-full text-gray-500 hover:text-white text-sm transition-colors"
            >
              Back to Email Login
            </button>
          </motion.form>
        ) : (
          <motion.form 
            key="otp-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleVerifyOtp} 
            className="space-y-6"
          >
            <div className="text-center mb-4">
              <p className="text-gray-400 text-sm">Enter the 6-digit code sent to {phoneNumber}</p>
            </div>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="000000" 
                maxLength={6}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-primary/50 transition-colors"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button 
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify & Login"}
            </button>
            <button 
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-gray-500 hover:text-white text-sm transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCcw size={14} /> Resend Code / Change Number
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
