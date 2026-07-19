import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../services/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import DashboardLayout from '../layouts/DashboardLayout';
import { Trophy, Medal, Star, Target, Crown } from 'lucide-react';

export default function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(20));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTopUsers(users);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getMedal = (index) => {
    if (index === 0) return <Crown className="text-yellow-400" size={20} />;
    if (index === 1) return <Medal className="text-gray-300" size={20} />;
    if (index === 2) return <Medal className="text-orange-400" size={20} />;
    return <span className="text-gray-500 text-sm font-bold">#{index + 1}</span>;
  };

  const getRankBg = (index) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-yellow-500/20';
    if (index === 1) return 'bg-gradient-to-r from-gray-400/10 to-gray-400/5 border-gray-400/20';
    if (index === 2) return 'bg-gradient-to-r from-orange-500/10 to-orange-500/5 border-orange-500/20';
    return 'bg-white/[0.02] border-white/5';
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-24 px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-10"
        >
          <div className="bg-yellow-400/15 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Trophy className="text-yellow-400" size={28} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Leaderboard</h1>
          <p className="text-gray-400 text-sm">Top performers in the community</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {topUsers.length >= 3 && (
              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
                {[1, 0, 2].map((rank) => {
                  const user = topUsers[rank];
                  if (!user) return null;
                  const isTop = rank === 0;
                  return (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: rank * 0.1 }}
                      className={`text-center p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all ${
                        isTop ? 'bg-gradient-to-b from-yellow-500/10 to-transparent border-yellow-500/20 md:-mt-4' : getRankBg(rank)
                      }`}
                    >
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        isTop ? 'bg-yellow-500/20 ring-2 ring-yellow-500/30' : 'bg-white/5'
                      }`}>
                        {getMedal(rank)}
                      </div>
                      <img 
                        src={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&size=48`}
                        alt={user.fullName}
                        className={`w-10 h-10 md:w-14 md:h-14 rounded-full mx-auto mb-2 border-2 ${
                          isTop ? 'border-yellow-500/30' : 'border-white/10'
                        }`}
                      />
                      <p className="text-xs md:text-sm font-bold text-white truncate">{user.fullName}</p>
                      <p className="text-[10px] md:text-xs font-bold text-primary mt-1">⭐ {user.xp || 0} XP</p>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Remaining Users */}
            <div className="space-y-2">
              {topUsers.slice(3).map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-8 text-center font-bold text-gray-500">
                    #{index + 4}
                  </div>
                  
                  <img 
                    src={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&size=40`}
                    alt={user.fullName}
                    className="w-9 h-9 rounded-lg border border-white/10"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{user.fullName}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        user.role === 'admin' ? 'bg-red-500/15 text-red-400' : 'bg-blue-500/15 text-blue-400'
                      }`}>
                        {user.role || 'Student'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:gap-5">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-primary font-bold text-sm">
                        <Star size={12} />
                        {user.xp || 0}
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-1 text-orange-400 font-bold text-sm">
                        <Target size={12} />
                        {user.streak || 0}d
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {topUsers.length === 0 && (
              <div className="text-center py-12">
                <Trophy size={32} className="text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No users on the leaderboard yet</p>
                <p className="text-gray-600 text-xs mt-1">Take quizzes to earn XP and climb the ranks</p>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
