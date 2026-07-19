import { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ children }) {
  const { isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-500 overflow-x-hidden ${
      isAdmin ? 'bg-[#0f0505]' : 'bg-background'
    }`}>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto custom-scrollbar relative min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 md:px-6 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
