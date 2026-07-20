import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { db } from '../../services/firebase';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { Users, Search, MoreHorizontal, Shield, User, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 30;

export default function UserManagement() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchUsers = useCallback(async (isInitial = false) => {
    try {
      setLoading(true);
      let q;
      if (isInitial) {
        q = query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(PAGE_SIZE));
      } else if (lastDoc) {
        q = query(collection(db, 'users'), orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(PAGE_SIZE));
      } else {
        setLoading(false);
        return;
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

      if (isInitial) {
        setUserList(docs);
      } else {
        setUserList(prev => [...prev, ...docs]);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [lastDoc]);

  useEffect(() => {
    fetchUsers(true);
  }, []);

  const loadMore = async () => {
    setPage(p => p + 1);
    await fetchUsers(false);
  };

  const filteredUsers = userList.filter(u =>
    u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="px-6 space-y-8 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Users className="text-red-500" size={32} /> User Management
            </h1>
            <p className="text-gray-400 mt-1">Manage and moderate all platform participants.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
            <span className="text-xs text-gray-500 self-center font-bold">Page {page}</span>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <th className="px-6 py-5">User Profile</th>
                  <th className="px-6 py-5">Role</th>
                  <th className="px-6 py-5">Experience</th>
                  <th className="px-6 py-5">Joined Date</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading && userList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center">
                      <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500 italic">
                      No users found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(u.fullName || 'User')}&background=random`}
                            className="w-10 h-10 rounded-xl border border-white/5"
                            alt=""
                          />
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">{u.fullName}</p>
                            <p className="text-[10px] text-gray-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter ${
                          u.role === 'admin' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'
                        }`}>
                          {u.role === 'admin' ? <Shield size={10} /> : <User size={10} />}
                          {u.role || 'student'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-mono text-white">{u.xp || 0} XP</span>
                          <span className="text-[9px] text-gray-600 font-bold uppercase">Streak: {u.streak || 0}d</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {u.createdAt ? new Date(u.createdAt?.toDate?.() || u.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
            <span className="text-xs text-gray-500">
              Showing {filteredUsers.length} users
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => { setPage(1); fetchUsers(true); }}
                disabled={page === 1}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-lg bg-white/5"
              >
                <ChevronLeft size={14} /> First
              </button>
              <button
                onClick={loadMore}
                disabled={!hasMore || loading}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-lg bg-white/5"
              >
                Load More <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
