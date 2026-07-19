import { Search, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AvatarMenu from './AvatarMenu';
import NotificationPanel from './NotificationPanel';

export default function Header({ onMenuClick }) {
  const { isAdmin } = useAuth();

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/5 bg-[#0a0a10]/80 backdrop-blur-xl sticky top-0 z-30">
      {/* Mobile: Hamburger only */}
      <div className="flex items-center lg:hidden">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl hover:bg-white/10 text-gray-400 min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop: Centered Search */}
      <div className="hidden lg:flex items-center justify-center flex-1 max-w-lg mx-auto">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            className={`w-full bg-[#111119] border border-white/8 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-primary/40 focus:bg-[#13131b] transition-all ${
              isAdmin ? 'focus:border-red-500/40' : ''
            }`}
          />
        </div>
      </div>

      {/* Right side: Notifications + Avatar */}
      <div className="flex items-center gap-3 md:gap-4">
        <NotificationPanel />
        <AvatarMenu />
      </div>
    </header>
  );
}
