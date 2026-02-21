import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, BookOpen, Target, Calculator, LogOut, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { label: 'Learning', icon: <BookOpen size={20} />, path: '/learning' },
        { label: 'Goals', icon: <Target size={20} />, path: '/goals' },
        { label: 'Calculators', icon: <Calculator size={20} />, path: '/calculators' },
    ];

    const isActive = (path) => location.pathname === path;

    const sidebarContent = (
        <>
            {/* Brand */}
            <div className="text-2xl font-bold mb-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
                    style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>
                    <Sparkles size={20} />
                </div>
                <span className="gradient-text font-extrabold">Growth</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive(item.path)
                                ? 'bg-pink-500/10 text-pink-400'
                                : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        {isActive(item.path) && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                                style={{ background: 'linear-gradient(180deg, #ec4899, #8b5cf6)' }} />
                        )}
                        <span className={`transition-colors ${isActive(item.path) ? 'text-pink-400' : 'text-white/40 group-hover:text-pink-400'}`}>
                            {item.icon}
                        </span>
                        <span className="font-semibold text-sm">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* User Section */}
            <div className="mt-auto space-y-3 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03]">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                        style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold truncate">{user?.name}</span>
                        <span className="text-xs text-white/30 truncate">{user?.email}</span>
                    </div>
                </div>
                <button
                    onClick={() => { logout(); navigate('/login'); }}
                    className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-rose-500/10 text-rose-400/60 hover:text-rose-400 transition-all text-sm"
                >
                    <LogOut size={18} />
                    <span className="font-semibold">Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile hamburger button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white"
            >
                <Menu size={22} />
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            )}

            {/* Mobile sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 border-r border-pink-500/10 p-6 flex flex-col z-50 bg-[#0a0015]/95 backdrop-blur-xl transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                    <X size={20} />
                </button>
                {sidebarContent}
            </aside>

            {/* Desktop sidebar */}
            <aside className="hidden lg:flex w-64 border-r border-pink-500/10 p-6 flex-col relative z-10 bg-[#0a0015]/80 backdrop-blur-xl shrink-0">
                {sidebarContent}
            </aside>
        </>
    );
};

export default Sidebar;
