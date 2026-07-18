import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line
} from 'recharts';
import { Target, TrendingUp, Award, Brain, Zap, Clock } from 'lucide-react';

const masteryData = [
  { subject: 'Functions', A: 120, B: 110, fullMark: 150 },
  { subject: 'Async JS', A: 98, B: 130, fullMark: 150 },
  { subject: 'DOM', A: 86, B: 130, fullMark: 150 },
  { subject: 'ES6+', A: 99, B: 100, fullMark: 150 },
  { subject: 'Security', A: 85, B: 90, fullMark: 150 },
  { subject: 'APIs', A: 65, B: 85, fullMark: 150 },
];

const xpHistory = [
  { day: 'Mon', xp: 450 },
  { day: 'Tue', xp: 520 },
  { day: 'Wed', xp: 1400 },
  { day: 'Thu', xp: 600 },
  { day: 'Fri', xp: 800 },
  { day: 'Sat', xp: 1200 },
  { day: 'Sun', xp: 1500 },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="px-6 pb-20 space-y-8">
        {/* Analytics Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Target className="text-primary" size={32} /> Performance Analytics
            </h1>
            <p className="text-gray-400 mt-1">Deep dive into your JavaScript mastery levels.</p>
          </div>
          <div className="flex gap-3">
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
              <Clock className="text-gray-500" size={18} />
              <span className="text-sm font-bold text-white">45.2 Hours Studied</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar Chart - Topic Mastery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
              <Brain size={20} className="text-primary" /> Topic Mastery Radar
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={masteryData}>
                  <PolarGrid stroke="#ffffff10" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar
                    name="Student"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Global Avg"
                    dataKey="B"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                  />
                  <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* XP Progression Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
              <TrendingUp size={20} className="text-green-400" /> Weekly XP Progression
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={xpHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="xp" 
                    stroke="#10b981" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#10b981', strokeWidth: 0 }} 
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Avg. Accuracy', value: '78.5%', sub: '+2.1% from last week', icon: <Target className="text-blue-400" /> },
            { label: 'Top Category', value: 'ES6+', sub: '92% Proficiency', icon: <Award className="text-yellow-400" /> },
            { label: 'Questions Solved', value: '1,240', sub: '240 in last 7 days', icon: <Zap className="text-purple-400" /> },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/5 rounded-2xl">{stat.icon}</div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</h4>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
