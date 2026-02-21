import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { CheckCircle, ArrowLeft, Trophy, Sparkles } from 'lucide-react';

const ModuleDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [module, setModule] = useState(null);
    const [currentStep, setCurrentStep] = useState('content');
    const [quizIndex, setQuizIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchModule = async () => {
            try {
                const res = await api.get('/learning/modules');
                const found = res.data.find(m => m.slug === slug);
                setModule(found);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchModule();
    }, [slug]);

    const handleAnswer = (optionIndex) => {
        const newAnswers = [...answers, optionIndex];
        setAnswers(newAnswers);
        if (quizIndex < module.quizzes.length - 1) {
            setQuizIndex(quizIndex + 1);
        } else {
            submitQuiz(newAnswers);
        }
    };

    const submitQuiz = async (finalAnswers) => {
        let correctCount = 0;
        module.quizzes.forEach((q, i) => {
            if (q.correctAnswer === finalAnswers[i]) correctCount++;
        });
        const accuracy = (correctCount / module.quizzes.length) * 100;

        try {
            await api.post('/learning/complete', {
                moduleId: module._id,
                quizAccuracy: accuracy
            });
            setCurrentStep('result');
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <div className="w-10 h-10 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
    if (!module) return <div className="p-10 text-white/40">Module not found</div>;

    return (
        <div className="p-10 max-w-4xl mx-auto animate-fade-in-up">
            <button
                onClick={() => navigate('/learning')}
                className="flex items-center gap-2 text-white/40 hover:text-pink-400 mb-8 transition-colors font-medium"
            >
                <ArrowLeft size={20} /> Back to Library
            </button>

            {currentStep === 'content' && (
                <div className="space-y-8">
                    <div className="glass-card">
                        <h1 className="text-3xl font-extrabold mb-6 gradient-text">{module.title}</h1>
                        <div className="text-white/50 leading-relaxed space-y-4">
                            {module.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {module.examples.map((ex, i) => (
                            <div key={i} className="glass-card" style={{ borderColor: 'rgba(236, 72, 153, 0.15)', background: 'rgba(236, 72, 153, 0.03)' }}>
                                <div className="flex items-center gap-2 text-pink-400 font-bold mb-3 text-sm">
                                    <CheckCircle size={16} /> Example Scenario
                                </div>
                                <div className="text-sm font-medium mb-3 italic text-white/70">"{ex.scenario}"</div>
                                <div className="text-sm text-white/40">Outcome: <span className="text-white/80">{ex.outcome}</span></div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentStep('quiz')}
                        className="w-full btn-primary py-4 text-lg"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Take the Quiz <Sparkles size={18} />
                        </span>
                    </button>
                </div>
            )}

            {currentStep === 'quiz' && (
                <div className="glass-card">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-sm font-bold text-pink-400 uppercase tracking-widest">
                            Question {quizIndex + 1} of {module.quizzes.length}
                        </span>
                        <div className="w-32 progress-bar-track">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${((quizIndex + 1) / module.quizzes.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-8">{module.quizzes[quizIndex].question}</h2>

                    <div className="space-y-3">
                        {module.quizzes[quizIndex].options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(i)}
                                className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/5 transition-all outline-none text-white/80 hover:text-white font-medium"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {currentStep === 'result' && (
                <div className="glass-card text-center py-12">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                        style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(139,92,246,0.2))' }}>
                        <Trophy size={36} className="text-pink-400" />
                    </div>
                    <h2 className="text-3xl font-extrabold mb-2">Module Completed! 🎉</h2>
                    <p className="text-white/40 mb-8">You've earned <span className="text-fuchsia-400 font-bold">{module.xpValue} XP</span> and boosted your financial knowledge.</p>

                    <div className="flex gap-4 justify-center">
                        <button onClick={() => navigate('/learning')} className="btn-primary">
                            <span className="relative z-10">Continue Learning</span>
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-white/5 hover:bg-white/10 px-6 py-2 rounded-xl font-semibold transition-all border border-white/10 hover:border-pink-500/30"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModuleDetail;
