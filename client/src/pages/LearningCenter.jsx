import { useState, useEffect } from 'react';
import api from '../api';
import { BookOpen, CheckCircle, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearningCenter = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const res = await api.get('/learning/modules');
                setModules(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchModules();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <div className="w-10 h-10 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="p-4 sm:p-10 max-w-7xl mx-auto animate-fade-in-up">
            <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
                    Learning Library <span className="text-2xl">📚</span>
                </h1>
                <p className="text-white/40">Master your finances one module at a time ✨</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {modules.map((module, index) => (
                    <div key={module._id}
                        className={`glass-card flex flex-col group relative overflow-hidden ${module.isCompleted ? 'border-pink-500/30' : ''}`}
                        style={{ animationDelay: `${index * 0.1}s` }}>

                        {module.isCompleted && (
                            <div className="absolute top-0 right-0 bg-pink-500/20 text-pink-400 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl border-l border-b border-pink-500/20">
                                Completed
                            </div>
                        )}

                        <div className="icon-badge mb-6">
                            <BookOpen size={22} />
                        </div>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-pink-400 transition-colors flex items-center gap-2">
                            {module.title}
                            {module.isCompleted && <CheckCircle size={16} className="text-pink-500" />}
                        </h3>
                        <p className="text-white/35 text-sm line-clamp-2 mb-6">{module.content}</p>

                        <div className="mt-auto space-y-4">
                            {module.progress > 0 && (
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-white/40">
                                        <span>Progress</span>
                                        <span className="text-pink-400">{module.progress}%</span>
                                    </div>
                                    <div className="progress-bar-track h-1">
                                        <div className="progress-bar-fill" style={{ width: `${module.progress}%` }} />
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 text-fuchsia-400 text-sm font-semibold">
                                    <Sparkles size={14} /> {module.xpValue} XP
                                </div>
                                <Link
                                    to={`/learning/${module.slug}`}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${module.isCompleted ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' : 'bg-white/5 text-white/60 hover:btn-primary hover:text-white'
                                        }`}
                                >
                                    {module.isCompleted ? 'Review' : 'Start'} <Play size={14} fill="currentColor" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LearningCenter;
