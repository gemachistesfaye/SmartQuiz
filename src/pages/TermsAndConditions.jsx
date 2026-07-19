import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import Footer from '../components/Footer';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 font-medium">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <div className="glass-card p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full" />
          
          <div className="flex items-center gap-4 mb-10 relative z-10">
            <div className="bg-primary/20 p-4 rounded-2xl">
              <Shield className="text-primary" size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">Terms & Conditions</h1>
          </div>
          
          <div className="prose prose-invert prose-primary max-w-none relative z-10">
            <p className="text-gray-300 text-lg mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                By accessing and using SmartQuiz, you accept and agree to be bound by the terms and provision of this agreement. 
                In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">2. User Accounts and Security</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                To use certain features of the platform, you must register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-400 space-y-2">
                <li>Provide accurate, current, and complete information during the registration process.</li>
                <li>Maintain and promptly update your account information.</li>
                <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                <li>Notify us immediately if you discover or suspect any security breaches related to the service.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">3. Phone Authentication (OTP)</h2>
              <p className="text-gray-400 leading-relaxed">
                If you choose to authenticate using your mobile phone number, you consent to receiving SMS messages 
                containing One-Time Passwords (OTPs) for the purpose of verifying your identity. Standard message and data rates may apply.
                <strong> Note: In our simulation environments, the expected OTP is always 000000.</strong>
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
              <p className="text-gray-400 leading-relaxed">
                The service and its original content, features, and functionality are and will remain the exclusive property of SmartQuiz and its licensors. 
                The platform is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">5. Termination</h2>
              <p className="text-gray-400 leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
                including without limitation if you breach the Terms and Conditions. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
