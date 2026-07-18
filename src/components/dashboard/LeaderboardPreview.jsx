import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const users = [
  { rank: 1, name: 'Sarah Miller', xp: '15,420', img: 'https://i.pravatar.cc/150?img=1' },
  { rank: 2, name: 'Alex Johnson', xp: '14,850', img: 'https://i.pravatar.cc/150?img=12' },
  { rank: 3, name: 'David Chen', xp: '13,100', img: 'https://i.pravatar.cc/150?img=11' },
  { rank: 4, name: 'Elena R.', xp: '12,940', img: 'https://i.pravatar.cc/150?img=5' },
];

export default function LeaderboardPreview() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Top Learners</h3>
        <Trophy className="text-yellow-400" size={20} />
      </div>
      
      <div className="space-y-4">
        {users.map((user) => (
          <div 
            key={user.rank} 
            className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
              user.rank === 2 ? 'bg-primary/10 border border-primary/20' : ''
            }`}
          >
            <span className={`w-5 text-xs font-bold ${
              user.rank === 1 ? 'text-yellow-400' : 
              user.rank === 2 ? 'text-primary' : 'text-gray-500'
            }`}>
              #{user.rank}
            </span>
            <img src={user.img} alt={user.name} className="w-8 h-8 rounded-full border border-white/10" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{user.name}</p>
              <p className="text-[10px] text-gray-500">{user.xp} XP</p>
            </div>
          </div>
        ))}
      </div>
      
      <Link to="/leaderboard" className="block w-full mt-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium hover:bg-white/10 transition-all text-center">
        Full Leaderboard
      </Link>
    </div>
  );
}
