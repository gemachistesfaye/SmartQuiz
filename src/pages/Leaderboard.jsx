import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../services/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import DashboardLayout from '../layouts/DashboardLayout';
import { Trophy, Medal, Star, Target } from 'lucide-react';

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

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-24 px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-12"
        >
          <div className="bg-yellow-400/20 w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-3 md:mb-6 shadow-lg shadow-yellow-400/10">
            <Trophy className="text-yellow-400" size={28} />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Global Leaderboard</h1>
          <p className="text-gray-400 text-sm">The world's top JavaScript masters</p>
        </motion.div>

        <div className="space-y-2 md:space-y-4">
          {loading ? (
            <div className="flex justify-center p-12 md:p-20">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            topUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-card p-3 md:p-6 flex items-center gap-3 md:gap-6 ${index < 3 ? 'border-primary/30 bg-primary/5 shadow-lg shadow-primary/5' : ''}`}
              >
                <div className="w-8 md:w-12 text-center font-bold text-lg md:text-2xl text-gray-500">
                  {index === 0 ? <Medal className="text-yellow-400 mx-auto" size={32} /> : 
                   index === 1 ? <Medal className="text-gray-300 mx-auto" size={32} /> :
                   index === 2 ? <Medal className="text-orange-400 mx-auto" size={32} /> :
                   `#${index + 1}`}
                </div>
                
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.fullName}&background=random`} 
                  alt={user.fullName}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/10"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">{user.fullName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      user.role === 'admin' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'
                    }`}>
                      {user.role || 'Student'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:gap-8">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-widest">XP Points</p>
                    <div className="flex items-center gap-2 text-primary font-bold text-xl">
                      <Star size={18} />
                      {user.xp || 0}
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-widest">Streak</p>
                    <div className="flex items-center gap-2 text-orange-400 font-bold text-xl">
                      <Target size={18} />
                      {user.streak || 0}d
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
