import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './components/Sidebar';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-[#0a0015]">
            <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-pink-500 border-t-transparent animate-spin"></div>
                <span className="text-pink-400 font-medium">Loading...</span>
            </div>
        </div>
    );
    if (!user) return <Navigate to="/login" />;
    return (
        <div className="flex min-h-screen bg-[#0a0015] relative">
            {/* Animated Background Blobs */}
            <div className="bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            <Sidebar />
            <div className="flex-1 overflow-y-auto relative z-10">
                {children}
            </div>
        </div>
    );
};

import Dashboard from './pages/Dashboard';
import LearningCenter from './pages/LearningCenter';
import GoalPlanner from './pages/GoalPlanner';
import ModuleDetail from './pages/ModuleDetail';
import Calculators from './pages/Calculators';

function App() {
    return (
        <AuthProvider>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#1a1025',
                        color: '#fff',
                        border: '1px solid rgba(236, 72, 153, 0.2)',
                        backdropFilter: 'blur(10px)',
                    },
                    success: {
                        iconTheme: {
                            primary: '#ec4899',
                            secondary: '#fff',
                        },
                    },
                }}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/learning" element={<ProtectedRoute><LearningCenter /></ProtectedRoute>} />
                    <Route path="/learning/:slug" element={<ProtectedRoute><ModuleDetail /></ProtectedRoute>} />
                    <Route path="/goals" element={<ProtectedRoute><GoalPlanner /></ProtectedRoute>} />
                    <Route path="/calculators" element={<ProtectedRoute><Calculators /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
