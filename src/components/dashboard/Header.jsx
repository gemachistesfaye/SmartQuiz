import { Search, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AvatarMenu from './AvatarMenu';

export default function Header() {
  const { isAdmin } = useAuth();

  return (
    <header className="flex items-center justify-between p-6 mb-2">
      {/* Mobile hamburger + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search quizzes, lessons, concepts..."
            className={`w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none transition-colors ${
              isAdmin ? 'focus:border-red-500/50' : 'focus:border-primary/50'
            }`}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button type="button" className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className={`absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-[#0a0a0a] ${
            isAdmin ? 'bg-red-500' : 'bg-primary'
          }`} />
        </button>

        <AvatarMenu />
      </div>
    </header>
  );
}
