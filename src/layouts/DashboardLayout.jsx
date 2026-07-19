import StudentSidebar from '../components/dashboard/StudentSidebar';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Header from '../components/dashboard/Header';
import MobileNav from '../components/dashboard/MobileNav';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ children }) {
  const { isAdmin } = useAuth();

  return (
    <div className={`min-h-screen flex p-2 sm:p-4 gap-4 overflow-x-hidden font-sans transition-colors duration-500 ${
      isAdmin ? 'bg-[#0f0505]' : 'bg-background'
    }`}>
      {isAdmin ? <AdminSidebar /> : <StudentSidebar />}
      
      <div className="flex-1 flex flex-col h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar relative">
        <Header />
        <main className="flex-1 p-4 md:p-6 pb-20 lg:pb-20">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
