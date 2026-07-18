import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 78 },
  { name: 'Wed', score: 72 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 92 },
  { name: 'Sat', score: 88 },
  { name: 'Sun', score: 95 },
];

export default function ProgressChart() {
  return (
    <div className="glass-card p-6 h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white">Performance Overview</h3>
        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-400 focus:outline-none">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
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
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#111111', 
                border: '1px solid #ffffff10',
                borderRadius: '12px',
                color: '#fff'
              }}
              itemStyle={{ color: '#3b82f6' }}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorScore)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
