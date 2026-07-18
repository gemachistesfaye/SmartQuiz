import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

export default function ProgressChart() {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "users", currentUser.uid, "quizHistory"),
      orderBy("createdAt", "desc"),
      limit(7)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map(d => d.data()).reverse();
      if (history.length === 0) {
        // Show placeholder when no data
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        setData(days.map(name => ({ name, score: 0 })));
        return;
      }
      setData(history.map((h) => ({
        name: new Date(h.createdAt).toLocaleDateString('en', { weekday: 'short' }),
        score: h.percentage || 0,
      })));
    });
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="glass-card p-6 h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white">Performance Overview</h3>
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Last 7 Quizzes</span>
      </div>
      
      <div className="w-full h-full pb-10 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#111111', 
                border: '1px solid #ffffff10',
                borderRadius: '12px',
                color: '#fff'
              }}
              itemStyle={{ color: '#3b82f6' }}
              formatter={(value) => [`${value}%`, 'Score']}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorScore)" 
              dot={{ r: 4, fill: '#3b82f6', stroke: '#0a0a0a', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
