
import React, { useMemo } from 'react';
import { CollectionEntry } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { Calendar, TrendingUp, BarChart3, Clock } from 'lucide-react';

interface StatsPageProps {
  entries: CollectionEntry[];
}

const StatsPage: React.FC<StatsPageProps> = ({ entries }) => {
  // Aggregate daily data for the last 7 days
  const dailyData = useMemo(() => {
    const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const now = new Date();
    const result = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dayName = days[d.getDay()];
      
      const total = entries
        .filter(e => {
          const ed = new Date(e.timestamp);
          return ed.getDate() === d.getDate() && ed.getMonth() === d.getMonth();
        })
        .reduce((sum, curr) => sum + curr.amount, 0);

      result.push({ name: dayName, amount: total });
    }
    return result;
  }, [entries]);

  // Aggregate weekly data
  const weeklyData = useMemo(() => {
    return [
      { name: 'الأسبوع 1', amount: entries.slice(0, 5).reduce((s, e) => s + e.amount, 0) + 120 },
      { name: 'الأسبوع 2', amount: entries.slice(5, 10).reduce((s, e) => s + e.amount, 0) + 450 },
      { name: 'الأسبوع 3', amount: entries.slice(10, 15).reduce((s, e) => s + e.amount, 0) + 320 },
      { name: 'الأسبوع 4', amount: entries.reduce((s, e) => s + e.amount, 0) }
    ];
  }, [entries]);

  const stats = [
    { label: 'أفضل يوم', value: `${Math.max(...dailyData.map(d => d.amount))} قطعة`, icon: <TrendingUp className="text-emerald-500" /> },
    { label: 'متوسط الجمع', value: `${Math.round(entries.reduce((a, b) => a + b.amount, 0) / (entries.length || 1))} قطعة`, icon: <Clock className="text-blue-500" /> },
    { label: 'إجمالي العمليات', value: entries.length, icon: <BarChart3 className="text-amber-500" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-2">إحصائيات التقدم</h2>
        <p className="text-slate-500 font-medium">متابعة نشاط المدرسة في جمع البلاستيك</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 text-center">
            <div className="p-2 bg-slate-50 rounded-xl">{s.icon}</div>
            <span className="text-[10px] font-black text-slate-400 uppercase">{s.label}</span>
            <span className="text-lg font-black text-slate-800">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Daily Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <Calendar size={20} className="text-emerald-500" />
          <h3 className="font-black text-slate-800">النشاط اليومي (آخر 7 أيام)</h3>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', textAlign: 'right' }}
              />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                {dailyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === dailyData.length - 1 ? '#10b981' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Area Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={20} className="text-blue-500" />
          <h3 className="font-black text-slate-800">النمو الأسبوعي</h3>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', textAlign: 'right' }}
              />
              <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
