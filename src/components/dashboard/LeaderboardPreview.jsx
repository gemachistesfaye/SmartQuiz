import { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../../services/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

export default function LeaderboardPreview() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(4));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Top Learners</h3>
        <Trophy className="text-yellow-400" size={20} />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">No learners yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {users.map((user, index) => (
            <div 
              key={user.id} 
              className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
                index === 0 ? 'bg-yellow-500/10 border border-yellow-500/20' :
                index === 1 ? 'bg-primary/10 border border-primary/20' : ''
              }`}
            >
              <span className={`w-5 text-xs font-bold ${
                index === 0 ? 'text-yellow-400' : 
                index === 1 ? 'text-primary' : 'text-gray-500'
              }`}>
                #{index + 1}
              </span>
              <img 
                src={`https://ui-avatars.com/api/?name=${user.fullName || 'User'}&background=random`} 
                alt={user.fullName} 
                className="w-8 h-8 rounded-full border border-white/10" 
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{user.fullName || 'Anonymous'}</p>
                <p className="text-[10px] text-gray-500">{(user.xp || 0).toLocaleString()} XP</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Link to="/leaderboard" className="block w-full mt-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium hover:bg-white/10 transition-all text-center">
        Full Leaderboard
      </Link>
    </div>
  );
}
