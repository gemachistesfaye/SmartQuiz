import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import QuizPage from './pages/QuizPage';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import AdminPanel from './pages/AdminPanel';
import CodeLab from './pages/CodeLab';
import AIAssistant from './pages/AIAssistant';
import TheoryVault from './pages/TheoryVault';
import Cybersecurity from './pages/Cybersecurity';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import TermsAndConditions from './pages/TermsAndConditions';
import UserManagement from './pages/admin/UserManagement';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ForgotPassword from './auth/ForgotPassword';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { db } from './services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import INITIAL_QUESTIONS from './data/questions';

function App() {
  React.useEffect(() => {
    const seedQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const existingTexts = new Set(querySnapshot.docs.map(doc => doc.data().question));
      const missing = INITIAL_QUESTIONS.filter(q => !existingTexts.has(q.question));
      for (const q of missing) {
        await addDoc(collection(db, "questions"), q);
      }
    };
    seedQuestions();
  }, []);

  return (
    <AuthProvider>
      {/* Toast notifications removed per user request */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/terms" element={<TermsAndConditions />} />

        {/* Student Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quiz" 
          element={<ProtectedRoute><QuizPage /></ProtectedRoute>} 
        />
        <Route 
          path="/profile" 
          element={<ProtectedRoute><Profile /></ProtectedRoute>} 
        />
        <Route 
          path="/leaderboard" 
          element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} 
        />
        <Route 
          path="/codelab" 
          element={<ProtectedRoute><CodeLab /></ProtectedRoute>} 
        />
        <Route 
          path="/ai-assistant" 
          element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} 
        />
        <Route 
          path="/theory" 
          element={<ProtectedRoute><TheoryVault /></ProtectedRoute>} 
        />
        <Route 
          path="/cybersecurity" 
          element={<ProtectedRoute><Cybersecurity /></ProtectedRoute>} 
        />
        <Route 
          path="/analytics" 
          element={<ProtectedRoute><Analytics /></ProtectedRoute>} 
        />
        <Route 
          path="/settings" 
          element={<ProtectedRoute><Settings /></ProtectedRoute>} 
        />

        {/* Admin Routes (Strictly Protected) */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <UserManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/questions" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all Redirect */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
