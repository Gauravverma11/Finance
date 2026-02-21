import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { Sparkles } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0015] p-6 relative overflow-hidden">
            {/* Animated Blobs */}
            <div className="bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="glass-card w-full max-w-md relative z-10 animate-fade-in-up">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>
                        <Sparkles size={20} className="text-white" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center mb-2">
                    Join the Vibe 💫
                </h2>
                <p className="text-center text-white/40 text-sm mb-8">Create your <span className="gradient-text font-bold">Growth</span> account</p>

                {error && (
                    <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl mb-6 text-center text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-1">Name</label>
                        <input
                            type="text"
                            className="w-full input-field"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-1">Email</label>
                        <input
                            type="email"
                            className="w-full input-field"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-1">Password</label>
                        <input
                            type="password"
                            className="w-full input-field"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full btn-primary py-3 text-base mt-2">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Create Account <Sparkles size={16} />
                        </span>
                    </button>
                </form>

                <p className="text-center mt-8 text-white/40 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-pink-400 hover:text-pink-300 font-semibold transition-colors">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
