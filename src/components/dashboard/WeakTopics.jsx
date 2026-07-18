import { AlertCircle } from 'lucide-react';

const topics = [
  { name: 'Async/Await', percentage: 45, color: 'bg-red-500' },
  { name: 'Closures', percentage: 62, color: 'bg-orange-500' },
  { name: 'Prototypes', percentage: 58, color: 'bg-yellow-500' },
];

export default function WeakTopics() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="text-red-400" size={20} />
        <h3 className="text-lg font-bold text-white">Attention Needed</h3>
      </div>
      
      <div className="space-y-6">
        {topics.map((topic, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-300 font-medium">{topic.name}</span>
              <span className="text-gray-500">{topic.percentage}% accuracy</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${topic.color} transition-all duration-1000`} 
                style={{ width: `${topic.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-8 py-3 rounded-xl border border-primary/20 text-primary font-semibold hover:bg-primary/10 transition-colors text-sm">
        Start Practice Session
      </button>
    </div>
  );
}
