import { Search, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AvatarMenu from './AvatarMenu';
import NotificationPanel from './NotificationPanel';

export default function Header({ onMenuClick }) {
  const { isAdmin } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 md:p-6 mb-2">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-white/10 text-gray-400 min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search..."
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
