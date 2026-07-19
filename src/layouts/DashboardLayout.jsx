import { useState } from 'react';
import StudentSidebar from '../components/dashboard/StudentSidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Header from '../components/dashboard/Header';
import MobileSidebar from '../components/dashboard/MobileSidebar';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ children }) {
  const { isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-500 ${
      isAdmin ? 'bg-[#0f0505]' : 'bg-background'
    }`}>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        {isAdmin ? <AdminSidebar /> : <StudentSidebar />}
      </div>
      
      {/* Mobile sidebar */}
      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto custom-scrollbar relative">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
