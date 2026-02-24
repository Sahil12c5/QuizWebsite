import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Trophy,
  BookOpen,
  User,
  LogOut,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Timer,
  LayoutDashboard,
  BrainCircuit,
  Star,
  ArrowLeft,
  Settings,
  ShieldCheck,
  Zap,
  Target,
  ExternalLink,
  Github,
  Search,
  Hash,
  Activity,
  Award,
  Clock,
  BarChart3
} from 'lucide-react';

// --- CONFIG ---
const API_BASE_URL = "http://localhost:8080/quiz-backend/api";

// --- SUB-COMPONENTS ---

const Navbar = ({ view, setView, user, onLogout }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div onClick={() => setView('home')} className="flex items-center gap-2 cursor-pointer group">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">Q</div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">QuizMaster</span>
      </div>

      <div className="flex items-center gap-8">
        {user && (
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setView('dashboard')} className={`text-sm font-medium ${view === 'dashboard' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'} transition-colors`}>Quizzes</button>
            <button onClick={() => setView('profile')} className={`text-sm font-medium ${view === 'profile' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'} transition-colors`}>Dashboard</button>
          </div>
        )}

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div onClick={() => setView('profile')} className="w-9 h-9 border border-gray-200 bg-gray-50 rounded-full flex items-center justify-center text-indigo-600 font-bold uppercase cursor-pointer hover:border-indigo-300 transition-all">
                {user.username?.[0]}
              </div>
              <button onClick={onLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button onClick={() => setView('login')} className="text-sm font-semibold text-gray-600 hover:text-indigo-600">Log In</button>
              <button onClick={() => setView('register')} className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-indigo-700 transition-all active:scale-95">Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </div>
  </nav>
);

const LandingPage = ({ setView }) => (
  <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-6">
    <div className="max-w-4xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-tight uppercase italic border-l-8 border-indigo-600 pl-6 text-left">
        Master Your <br />
        <span className="text-indigo-600">Technical Skills.</span>
      </h1>
      <p className="text-xl text-gray-500 text-left max-w-2xl leading-relaxed">
        Join our elite community of developers. Challenge yourself with tiered quizzes and track your progress through our advanced performance dashboard.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-start">
        <button
          onClick={() => setView('dashboard')}
          className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1 active:scale-95"
        >
          Explore Quizzes <ChevronRight size={20} />
        </button>
        <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95">View Leaderboard</button>
      </div>
    </div>
  </div>
);

const AuthForm = ({ type, setView, onAuth }) => (
  <div className="min-h-screen pt-20 flex items-center justify-center px-6 bg-gray-50">
    <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-xl shadow-gray-200/50 border border-gray-100 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-gray-500">{type === 'login' ? 'Enter your credentials to access your dashboard' : 'Join thousands of developers improving their skills'}</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onAuth({ username: 'Operator' }); }} className="space-y-6">
        {type === 'register' && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Username</label>
            <input required type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" placeholder="johndoe" />
          </div>
        )}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Email Address</label>
          <input required type="email" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" placeholder="john@example.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <input required type="password" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" placeholder="••••••••" />
        </div>

        <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
          {type === 'login' ? 'Sign In' : 'Get Started'}
        </button>
      </form>

      <div className="text-center">
        <button onClick={() => setView(type === 'login' ? 'register' : 'login')} className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
          {type === 'login' ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  </div>
);

const QuizCard = ({ quiz, onStart }) => (
  <div className="group bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2 flex flex-col">
    <div className="space-y-4 flex-1">
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">{quiz.category}</span>
        <Activity size={16} className="text-gray-200" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight italic uppercase italic">{quiz.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{quiz.description || "Master the core concepts and advanced patterns."}</p>
    </div>

    <button
      onClick={() => onStart(quiz)}
      className="mt-8 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-95"
    >
      Start Quiz <ChevronRight size={16} />
    </button>
  </div>
);

const LevelSelection = ({ quiz, onSelect, onBack }) => (
  <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-6 bg-gray-50">
    <div className="w-full max-w-2xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <button onClick={onBack} className="text-indigo-600 font-bold flex items-center gap-2 mx-auto mb-6 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft size={18} /> Back to Library
        </button>
        <h2 className="text-4xl font-bold text-gray-900 uppercase italic">Select Difficulty Tier</h2>
        <p className="text-gray-500">Choosing level for <span className="text-indigo-600 font-bold">{quiz.title}</span></p>
      </div>

      <div className="grid gap-4">
        {[
          { id: 'core', title: 'Core', questions: 25, icon: <Zap size={24} />, color: 'indigo' },
          { id: 'advanced', title: 'Advanced', questions: 50, icon: <Activity size={24} />, color: 'indigo' },
          { id: 'pro', title: 'Pro', questions: 100, icon: <Award size={24} />, color: 'indigo' }
        ].map((level) => (
          <button
            key={level.id}
            onClick={() => onSelect(level)}
            className="group w-full p-8 bg-white rounded-3xl border border-gray-100 flex items-center justify-between hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {level.icon}
              </div>
              <div className="text-left">
                <h4 className="text-xl font-bold text-gray-900 italic uppercase italic">{level.title} Tier</h4>
                <p className="text-gray-400 text-sm font-medium">{level.questions} Curated Questions</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <ChevronRight size={20} />
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const QuizPlayer = ({ quiz, level, onComplete, onExit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    axios.get(`${API_BASE_URL}/quizzes/${quiz.id}/questions`)
      .then(res => {
        const queryQs = res.data;
        // Mock data generation up to level.questions if actual DB has fewer
        const finalQs = [...queryQs];
        while (finalQs.length < level.questions) {
          const template = queryQs[finalQs.length % queryQs.length] || { question_text: "System Generated Question Loop", option_a: "Option A", option_b: "Option B", option_c: "Option C", option_d: "Option D", correct_option: "A" };
          finalQs.push({ ...template, id: `gen-${finalQs.length}` });
        }
        setQuestions(finalQs.slice(0, level.questions));
        setLoading(false);
      })
      .catch(() => {
        setQuestions(Array(level.questions).fill(0).map((_, i) => ({
          id: i, question_text: `Offline Validation Node #${i + 1}: What is the standard return type of an void method?`, option_a: "null", option_b: "void", option_c: "Object", option_d: "Undefined", correct_option: "B"
        })));
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    const finalAnswers = [...answers, selected];
    setAnswers(finalAnswers);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
    } else {
      const correctCount = finalAnswers.reduce((acc, ans, idx) => acc + (ans === questions[idx].correct_option ? 1 : 0), 0);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      onComplete({
        score: Math.round((correctCount / questions.length) * 100),
        correct: correctCount,
        total: questions.length,
        timeSpent
      });
    }
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-bold text-gray-400 italic">Initializing Sequence...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={onExit} className="text-gray-400 hover:text-indigo-600 transition-colors"><ArrowLeft size={20} /></button>
          <div>
            <h2 className="text-xl font-bold text-gray-900 uppercase italic">{quiz.title}</h2>
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">{level.title} Tier // Node {currentIdx + 1} of {questions.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-6 py-2 bg-indigo-50 rounded-full text-indigo-600 font-bold text-sm">
          <Clock size={16} />
          {Math.floor((Date.now() - startTime) / 60000)}m {Math.floor((Date.now() - startTime) / 1000) % 60}s
        </div>
      </header>

      <div className="h-1 bg-gray-100">
        <div className="h-full bg-indigo-600 transition-all duration-700 ease-out" style={{ width: `${(currentIdx / questions.length) * 100}%` }}></div>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white rounded-[2rem] p-12 md:p-16 shadow-xl shadow-gray-200/50 border border-gray-100 space-y-12 animate-in fade-in slide-in-from-bottom-12">
          <div className="space-y-4">
            <div className="w-12 h-1 bg-indigo-600 rounded-full"></div>
            <p className="text-5xl font-bold text-gray-900 italic uppercase italic leading-tight">{questions[currentIdx].question_text}</p>
          </div>

          <div className="grid gap-4">
            {['A', 'B', 'C', 'D'].map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`group p-6 text-left border-2 rounded-2xl transition-all flex items-center justify-between ${selected === opt
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600 shadow-lg shadow-indigo-100/50'
                    : 'border-gray-50 bg-gray-50/50 text-gray-500 hover:border-indigo-200 hover:text-indigo-600'
                  }`}
              >
                <div className="flex items-center gap-4 font-bold uppercase tracking-tight">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${selected === opt ? 'bg-indigo-600 text-white' : 'bg-white text-gray-400'}`}>{opt}</span>
                  {questions[currentIdx][`option_${opt.toLowerCase()}`]}
                </div>
              </button>
            ))}
          </div>

          <button
            disabled={selected === null}
            onClick={handleNext}
            className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-indigo-600 shadow-xl shadow-gray-200 disabled:opacity-20 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            {currentIdx === questions.length - 1 ? 'Finalize Assembly' : 'Submit Node'} <ChevronRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
};

const QuizResults = ({ results, onDone }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div className="w-full max-w-2xl bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-gray-200/50 border border-gray-100 text-center space-y-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex flex-col items-center gap-6">
        <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200 rotate-12">
          <Trophy size={48} className="-rotate-12" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 uppercase italic">Analysis Complete</h2>
        <p className="text-gray-400 font-medium">Session recorded in performance history.</p>
      </div>

      <div className="py-10 border-y border-gray-50">
        <div className="text-[120px] font-black italic tracking-tighter leading-none text-indigo-600">
          {results.score}<span className="text-gray-300 text-4xl mt-4">%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="space-y-1">
          <p className="text-xs uppercase font-bold text-gray-400 tracking-widest">Correct</p>
          <p className="text-3xl font-bold text-indigo-600 italic uppercase italic">{results.correct}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase font-bold text-gray-400 tracking-widest">Time</p>
          <p className="text-3xl font-bold text-indigo-600 italic uppercase italic">{Math.floor(results.timeSpent / 60)}m {results.timeSpent % 60}s</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase font-bold text-gray-400 tracking-widest">Status</p>
          <p className="text-3xl font-bold text-indigo-600 italic uppercase italic">Pass</p>
        </div>
      </div>

      <button onClick={onDone} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95">Return to Dashboard</button>
    </div>
  </div>
);

const Profile = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // userId is 1 for primary operator by default
    axios.get(`${API_BASE_URL}/profile/1`)
      .then(res => { setStats(res.data); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center text-gray-400 font-bold animate-pulse italic">Retrieving Operator Data...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-32 space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b-8 border-gray-100 pb-12">
        <div className="flex items-center gap-10">
          <div className="w-40 h-40 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white text-7xl font-bold italic shadow-2xl shadow-indigo-200">
            {user.username?.[0]}
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Primary Operator</span>
            <h2 className="text-7xl font-bold text-gray-900 uppercase italic leading-none">{user.username}</h2>
            <p className="text-gray-400 font-medium">Joined System: Feb 2024</p>
          </div>
        </div>
        <button className="px-8 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2">
          <Settings size={18} /> Configuration
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Attempts', val: stats?.totalQuizzesTaken || 0, icon: <BarChart3 className="text-indigo-600" /> },
          { label: 'Avg Score', val: `${stats?.averageScore || 0}%`, icon: <Activity className="text-green-500" /> },
          { label: 'High Score', val: `${stats?.highestScore || 0}%`, icon: <Award className="text-amber-500" /> },
          { label: 'Low Score', val: `${stats?.lowestScore || 0}%`, icon: <Activity className="text-red-500" /> }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">{stat.icon}</div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-4xl font-bold text-gray-900 italic uppercase italic leading-none">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        <h3 className="text-3xl font-bold text-gray-900 uppercase italic">History Log</h3>
        <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-[9px]">Module</th>
                <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-[9px]">Tier</th>
                <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-[9px]">Accuracy</th>
                <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-[9px]">Runtime</th>
                <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-[9px]">Log Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats?.history?.map((entry, i) => (
                <tr key={i} className="group hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6 font-bold text-gray-900 uppercase italic text-sm">{entry.quizTitle}</td>
                  <td className="px-8 py-6"><span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest">{entry.difficulty}</span></td>
                  <td className="px-8 py-6 font-bold text-gray-900">{entry.score}%</td>
                  <td className="px-8 py-6 text-gray-400 font-medium text-sm">{entry.timeSpent || 0}s</td>
                  <td className="px-8 py-6 text-gray-400 text-xs font-medium">{new Date(entry.takenAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {(!stats?.history || stats.history.length === 0) && (
                <tr><td colSpan="5" className="px-8 py-20 text-center text-gray-300 font-bold uppercase italic tracking-widest">No Log Entries Found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ onStartQuiz }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/quizzes/`)
      .then(res => { setQuizzes(res.data); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center text-gray-400 font-bold animate-pulse italic">Scanning Remote Library...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-40 space-y-16">
      <div className="flex flex-col gap-6">
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-none uppercase italic border-l-[16px] border-indigo-600 pl-8">Available <br /><span className="text-indigo-600 italic uppercase italic">Modules.</span></h1>
        <p className="text-gray-400 font-medium max-w-xl pl-8">Select a language to begin the technical assessment. Each module supports Tier integration.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes.map(quiz => <QuizCard key={quiz.id} quiz={quiz} onStart={onStartQuiz} />)}
      </div>
    </div>
  );
};

// --- MAIN ENTRY ---

export default function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const handleAuth = (u) => { setUser(u); setView('dashboard'); };
  const handleStart = (q) => {
    if (!user) { setView('login'); return; }
    setActiveQuiz(q); setView('levels');
  };
  const handleLevelSelect = (l) => { setActiveLevel(l); setView('quiz'); };
  const handleComplete = (r) => {
    setResults(r);
    setView('results');
    // Save score to backend (Async)
    axios.post(`${API_BASE_URL}/profile/score`, {
      userId: 1, // Default for now
      quizId: activeQuiz.id,
      score: r.score,
      totalQuestions: r.total,
      timeSpent: r.timeSpent
    }).catch(err => console.error("History Save Failed", err));
  };

  const renderContent = () => {
    switch (view) {
      case 'home': return <LandingPage setView={setView} />;
      case 'dashboard': return <Dashboard onStartQuiz={handleStart} />;
      case 'levels': return <LevelSelection quiz={activeQuiz} onSelect={handleLevelSelect} onBack={() => setView('dashboard')} />;
      case 'profile': return <Profile user={user} />;
      case 'login': return <AuthForm type="login" setView={setView} onAuth={handleAuth} />;
      case 'register': return <AuthForm type="register" setView={setView} onAuth={handleAuth} />;
      case 'quiz': return <QuizPlayer quiz={activeQuiz} level={activeLevel} onComplete={handleComplete} onExit={() => setView('dashboard')} />;
      case 'results': return <QuizResults results={results} onDone={() => setView('profile')} />;
      default: return <LandingPage setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-indigo-100">
      {view !== 'quiz' && view !== 'results' && <Navbar view={view} setView={setView} user={user} onLogout={() => setUser(null)} />}
      <main className="transition-all duration-700 ease-in-out">
        {renderContent()}
      </main>

      {view !== 'quiz' && view !== 'results' && (
        <footer className="bg-gray-50 border-t border-gray-100 py-32 px-10">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">Q</div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">QuizMaster</span>
            </div>
            <p className="max-w-sm text-sm text-gray-400 font-medium leading-relaxed uppercase italic tracking-widest">
              Professional assessment architecture for high-performing technology teams.
            </p>
            <div className="flex gap-8 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
              <span>Security Verified</span>
              <span>Backend Connected</span>
              <span>V4.0 Operational</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
