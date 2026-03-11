
import React, { useMemo, useState } from 'react';
import { CollectionEntry } from '../types';
import { Trophy, Medal, Crown, Target, Layers } from 'lucide-react';

interface LeaderboardPageProps {
  entries: CollectionEntry[];
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ entries }) => {
  const [tab, setTab] = useState<'students' | 'grades'>('students');

  const studentRankings = useMemo(() => {
    const map = new Map<string, { name: string; grade: string; total: number }>();
    entries.forEach(e => {
      const current = map.get(e.studentName) || { name: e.studentName, grade: e.grade, total: 0 };
      map.set(e.studentName, { ...current, total: current.total + e.amount });
    });
    return Array.from(map.values()).sort((a, b) => b.total - a.total).slice(0, 10);
  }, [entries]);

  const gradeRankings = useMemo(() => {
    const map = new Map<string, number>();
    entries.forEach(e => {
      map.set(e.grade, (map.get(e.grade) || 0) + e.amount);
    });
    return Array.from(map.entries())
      .map(([grade, total]) => ({ grade, total }))
      .sort((a, b) => b.total - a.total);
  }, [entries]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-2">لوحة الصدارة</h2>
        <p className="text-slate-500 font-medium">منافسة شريفة من أجل هدف إنساني</p>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-2xl max-w-xs mx-auto">
        <button 
          onClick={() => setTab('students')}
          className={`flex-1 py-2 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${tab === 'students' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
        >
          <Target size={16} /> الطلاب
        </button>
        <button 
          onClick={() => setTab('grades')}
          className={`flex-1 py-2 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${tab === 'grades' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
        >
          <Layers size={16} /> الصفوف
        </button>
      </div>

      {/* Podium for Students */}
      {tab === 'students' && studentRankings.length > 0 && (
        <div className="grid grid-cols-3 items-end gap-2 px-2 pt-8">
          {/* Second Place */}
          {studentRankings[1] && (
            <div className="flex flex-col items-center">
              <div className="mb-2 relative">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-slate-200">
                  <Medal size={32} />
                </div>
                <div className="absolute -top-2 -right-1 bg-slate-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</div>
              </div>
              <div className="h-24 w-full bg-slate-200 rounded-t-2xl flex flex-col items-center justify-center p-2 text-center">
                 <span className="text-[10px] font-black text-slate-600 line-clamp-1">{studentRankings[1].name}</span>
                 <span className="text-xs font-black text-slate-700">{studentRankings[1].total} قطعة</span>
              </div>
            </div>
          )}
          
          {/* First Place */}
          {studentRankings[0] && (
            <div className="flex flex-col items-center">
              <div className="mb-2 relative">
                <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 border-4 border-amber-100 shadow-lg shadow-amber-100">
                  <Crown size={40} />
                </div>
                <div className="absolute -top-2 -right-1 bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white">1</div>
              </div>
              <div className="h-32 w-full bg-amber-500 rounded-t-2xl flex flex-col items-center justify-center p-2 text-center shadow-lg shadow-amber-100">
                 <span className="text-xs font-black text-white line-clamp-1">{studentRankings[0].name}</span>
                 <span className="text-sm font-black text-amber-50">{studentRankings[0].total} قطعة</span>
              </div>
            </div>
          )}

          {/* Third Place */}
          {studentRankings[2] && (
            <div className="flex flex-col items-center">
              <div className="mb-2 relative">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-400 border-2 border-orange-100">
                  <Medal size={32} />
                </div>
                <div className="absolute -top-2 -right-1 bg-orange-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</div>
              </div>
              <div className="h-20 w-full bg-orange-100 rounded-t-2xl flex flex-col items-center justify-center p-2 text-center">
                 <span className="text-[10px] font-black text-orange-800 line-clamp-1">{studentRankings[2].name}</span>
                 <span className="text-xs font-black text-orange-900">{studentRankings[2].total} قطعة</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {tab === 'students' ? (
          <div className="divide-y divide-slate-50">
            {studentRankings.map((student, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                <span className="w-8 text-center font-black text-slate-400">{idx + 1}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">{student.name}</h4>
                  <span className="text-xs text-slate-400 font-medium">الصف: {student.grade}</span>
                </div>
                <div className="text-right">
                  <span className="block font-black text-emerald-600">{student.total} قطعة</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">إجمالي الجمع</span>
                </div>
              </div>
            ))}
            {studentRankings.length === 0 && (
              <div className="p-12 text-center text-slate-400 font-medium">لا توجد بيانات مسجلة بعد. كن أول المتبرعين!</div>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {gradeRankings.map((g, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${idx < 3 ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <h4 className="font-black text-slate-800">الصف {g.grade}</h4>
                </div>
                <div className="text-right">
                  <span className="block font-black text-blue-600">{g.total} قطعة</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">إجمالي الصف</span>
                </div>
              </div>
            ))}
            {gradeRankings.length === 0 && (
              <div className="p-12 text-center text-slate-400 font-medium">بانتظار مساهمات الصفوف...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
