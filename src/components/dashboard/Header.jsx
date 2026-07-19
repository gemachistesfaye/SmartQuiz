import { Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AvatarMenu from './AvatarMenu';
import NotificationPanel from './NotificationPanel';

export default function Header() {
  const { isAdmin } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 md:p-6 mb-2">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search quizzes, lessons, concepts..."
            aria-label="Search"
            className={`w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none transition-colors ${
              isAdmin ? 'focus:border-red-500/50' : 'focus:border-primary/50'
            }`}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <NotificationPanel />
        <AvatarMenu />
      </div>
    </header>
  );
}
