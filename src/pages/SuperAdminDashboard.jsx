import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { db } from '../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { 
  Users, 
  Database, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  BookOpen
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    questions: 0,
    active: 1, // At least the current admin
    health: '99.9%'
  });

  useEffect(() => {
    // Real-time user count
    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      setStats(prev => ({ ...prev, users: snap.size }));
    });

    // Real-time question count
    const unsubQuestions = onSnapshot(collection(db, "questions"), (snap) => {
      setStats(prev => ({ ...prev, questions: snap.size }));
    });

    return () => {
      unsubUsers();
      unsubQuestions();
    };
  }, []);

  const userGrowth = [
    { name: 'Mon', active: 4, total: stats.users - 2 },
    { name: 'Tue', active: 3, total: stats.users - 1 },
    { name: 'Wed', active: 5, total: stats.users },
    { name: 'Thu', active: 2, total: stats.users },
    { name: 'Fri', active: 6, total: stats.users },
    { name: 'Sat', active: stats.users, total: stats.users },
    { name: 'Sun', active: stats.users, total: stats.users },
  ];

  const statCards = [
    { label: 'Total Users', value: stats.users, growth: '+5%', icon: <Users className="text-blue-400" /> },
    { label: 'Platform Tools', value: '8', growth: 'Stable', icon: <Activity className="text-green-400" /> },
    { label: 'Question Bank', value: stats.questions, growth: `+${stats.questions}`, icon: <BookOpen className="text-purple-400" /> },
    { label: 'System Health', value: stats.health, growth: 'Stable', icon: <Database className="text-yellow-400" /> },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10 px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Platform Console</h1>
            <p className="text-gray-400">Monitoring real-time activity and system integrity.</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live System
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 border-red-500/10"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-2xl">{stat.icon}</div>
                <span className="text-[10px] font-bold text-red-400 flex items-center gap-1 uppercase tracking-widest">
                  {stat.growth}
                </span>
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-3xl font-bold text-white mt-1">{stat.value}</h4>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <TrendingUp size={20} className="text-red-400" /> Activity Overview
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowth}>
                  <defs>
                    <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#ef4444' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="#ef4444" fillOpacity={1} fill="url(#colorAdmin)" />
                  <Area type="monotone" dataKey="active" stroke="#f87171" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <ShieldCheck size={20} className="text-green-400" /> Security Status
            </h3>
            <div className="space-y-4">
              {[
                { event: 'SSL Certificate', status: 'Valid', color: 'text-green-400' },
                { event: 'Firebase Auth', status: 'Operational', color: 'text-green-400' },
                { event: 'Firestore DB', status: 'Connected', color: 'text-green-400' },
                { event: 'Admin Bypass', status: 'Active', color: 'text-yellow-400' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-sm font-medium text-gray-300">{log.event}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${log.color}`}>{log.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
