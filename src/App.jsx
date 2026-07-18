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

const INITIAL_QUESTIONS = [
  { question: "What is the output of typeof null?", options: ["'object'", "'null'", "'undefined'", "'number'"], correct: 0, difficulty: "medium", explanation: "In JavaScript, typeof null is historical quirk that returns 'object'." },
  { question: "Which keyword is used to define a constant in ES6?", options: ["var", "let", "const", "def"], correct: 2, difficulty: "easy", explanation: "The 'const' keyword is used to declare variables that cannot be reassigned." },
  { question: "What is hoisting in JavaScript?", options: ["Moving declarations to top", "Lifting errors", "A way to loop", "Memory cleanup"], correct: 0, difficulty: "hard", explanation: "Hoisting is the default behavior of moving all declarations to the top of the current scope." }
];

function App() {
  React.useEffect(() => {
    const seedQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      if (querySnapshot.empty) {
        for (const q of INITIAL_QUESTIONS) {
          await addDoc(collection(db, "questions"), q);
        }
      }
    };
    seedQuestions();
  }, []);

  return (
    <AuthProvider>
      <ToastContainer theme="dark" position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

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
