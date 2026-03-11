
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, 
  BarChart3, 
  Trophy, 
  PlusCircle, 
  LogOut,
  Droplets,
  Sprout,
  Users,
  Info
} from 'lucide-react'; // Removed Heart as it was primarily used for ImpactPage icon
import { User, CollectionEntry, AppView } from './types';
import { BADGES, POINTS_PER_ITEM } from './constants';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CollectionPage from './components/CollectionPage';
import LeaderboardPage from './components/LeaderboardPage';
// Removed: import ImpactPage from './components/ImpactPage';
import StatsPage from './components/StatsPage';
import AboutPage from './components/AboutPage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<AppView>('home');
  const [entries, setEntries] = useState<CollectionEntry[]>([]);

  // Load initial data
  useEffect(() => {
    const savedUser = localStorage.getItem('plastic_hope_user');
    const savedEntries = localStorage.getItem('plastic_hope_entries');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedEntries) setEntries(JSON.parse(savedEntries));
  }, []);

  // Persistence
  useEffect(() => {
    if (user) localStorage.setItem('plastic_hope_user', JSON.stringify(user));
    localStorage.setItem('plastic_hope_entries', JSON.stringify(entries));
  }, [user, entries]);

  const handleLogin = (name: string, grade: string) => {
    const newUser: User = {
      name,
      grade,
      totalItems: 0,
      hopePoints: 0,
      badges: []
    };
    setUser(newUser);
    setView('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('plastic_hope_user');
    setView('login');
  };

  const addEntry = (amount: number, photoUrl?: string) => {
    if (!user) return;

    const newEntry: CollectionEntry = {
      id: Date.now().toString(),
      studentName: user.name,
      grade: user.grade,
      amount,
      timestamp: Date.now(),
      photoUrl
    };

    const newEntries = [newEntry, ...entries];
    setEntries(newEntries);

    const newTotalItems = (user.totalItems || 0) + amount;
    const newHopePoints = (user.hopePoints || 0) + (amount * POINTS_PER_ITEM);
    
    // Check for new badges
    const newBadges = BADGES
      .filter(b => newTotalItems >= b.threshold)
      .map(b => b.id);

    setUser({
      ...user,
      totalItems: newTotalItems,
      hopePoints: newHopePoints,
      badges: newBadges
    });

    setView('home');
  };

  const totalSchoolItems = useMemo(() => 
    entries.reduce((acc, curr) => acc + curr.amount, 0)
  , [entries]);

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const NavItem = ({ icon: Icon, label, target }: { icon: any, label: string, target: AppView }) => (
    <button
      onClick={() => setView(target)}
      className={`flex flex-col items-center justify-center gap-1 transition-colors px-4 py-2 rounded-xl ${
        view === target ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 hover:text-emerald-500'
      }`}
    >
      <Icon size={24} />
      <span className="text-xs font-bold">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0 md:pt-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-30 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-500 to-emerald-500 p-2 rounded-lg text-white">
            <Droplets size={24} />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Plastic<span className="text-emerald-500">Hope</span></h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold text-slate-800">{user.name}</span>
            <span className="text-xs text-slate-500">الصف {user.grade}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="تسجيل الخروج"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 mt-16 md:mt-4">
        {view === 'home' && <HomePage user={user} totalSchoolItems={totalSchoolItems} />}
        {view === 'collect' && <CollectionPage onAdd={addEntry} />}
        {view === 'leaderboard' && <LeaderboardPage entries={entries} />}
        {/* Removed: {view === 'impact' && <ImpactPage totalItems={totalSchoolItems} />} */}
        {view === 'stats' && <StatsPage entries={entries} />}
        {view === 'about' && <AboutPage />}
      </main>

      {/* Navigation - Bottom for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 px-6 flex justify-around items-center z-40 md:hidden">
        <NavItem icon={Home} label="الرئيسية" target="home" />
        <NavItem icon={PlusCircle} label="تسجيل" target="collect" />
        <NavItem icon={Trophy} label="الترتيب" target="leaderboard" />
        <NavItem icon={BarChart3} label="إحصائيات" target="stats" />
        <NavItem icon={Info} label="حول" target="about" />
        {/* Removed: <NavItem icon={Heart} label="الأثر" target="impact" /> */}
      </nav>

      {/* Desktop Side Nav */}
      <div className="hidden md:flex fixed right-0 top-0 bottom-0 w-64 bg-white border-l border-slate-200 p-6 flex-col gap-8 pt-24 z-20">
         <button onClick={() => setView('home')} className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${view === 'home' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'text-slate-600 hover:bg-slate-100'}`}>
            <Home size={22} /> الرئيسية
         </button>
         <button onClick={() => setView('collect')} className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${view === 'collect' ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-slate-100'}`}>
            <PlusCircle size={22} /> تسجيل العدد
         </button>
         <button onClick={() => setView('leaderboard')} className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${view === 'leaderboard' ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' : 'text-slate-600 hover:bg-slate-100'}`}>
            <Trophy size={22} /> لوحة الصدارة
         </button>
         <button onClick={() => setView('stats')} className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${view === 'stats' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-100'}`}>
            <BarChart3 size={22} /> الإحصائيات
         </button>
         <button onClick={() => setView('about')} className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${view === 'about' ? 'bg-slate-800 text-white shadow-lg shadow-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}>
            <Info size={22} /> حول التطبيق
         </button>
         {/* Removed: <button onClick={() => setView('impact')} className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${view === 'impact' ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'text-slate-600 hover:bg-slate-100'}`}>
            <Heart size={22} /> أثرنا
         </button> */}

         <div className="mt-auto bg-slate-50 p-4 rounded-2xl border border-slate-100">
           <div className="flex items-center gap-3 mb-2 text-emerald-600">
             <Sprout size={20} />
             <span className="font-bold">حسابك</span>
           </div>
           <p className="text-2xl font-black text-slate-800">{user.hopePoints} <span className="text-sm font-normal text-slate-500">نقطة أمل</span></p>
         </div>
      </div>
    </div>
  );
};

export default App;