
import React from 'react';
import { User } from '../types';
import { BADGES } from '../constants';
import { Sprout, Users, Award, Heart, CheckCircle2, Trophy } from 'lucide-react';

interface HomePageProps {
  user: User;
  totalSchoolItems: number;
}

const HomePage: React.FC<HomePageProps> = ({ user, totalSchoolItems }) => {
  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Card */}
      <section className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-1">أهلاً بك، {user.name} 👋</h2>
          <p className="text-emerald-50 opacity-90 font-medium mb-6 italic">عظيم! أنت الآن بطل يغير حياة الآخرين.</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <span className="text-xs font-bold block mb-1 uppercase tracking-wider opacity-80">مساهمتك</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black">{user.totalItems || 0}</span>
                <span className="text-sm font-bold">قطعة</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <span className="text-xs font-bold block mb-1 uppercase tracking-wider opacity-80">نقاط الأمل</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black">{user.hopePoints || 0}</span>
                <span className="text-sm font-bold">نقطة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Progress */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-slate-800 flex items-center gap-2">
            <Users size={20} className="text-blue-500" />
            هدفنا المدرسي
          </h3>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-black">المرحلة الأولى</span>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span className="text-slate-500">تم جمع {totalSchoolItems} قطعة</span>
            <span className="text-emerald-500">الهدف: 10,000 قطعة</span>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((totalSchoolItems / 10000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          هذا البلاستيك سيتم بيعه لشركات التدوير، وسيتم تخصيص كامل الأرباح لتجهيز أول قاعة علاج طبيعي في مدرسة الطلاب ذوي الشلل الدماغي.
        </p>
      </section>

      {/* Badges Section */}
      <section>
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="font-black text-slate-800 flex items-center gap-2">
            <Award size={20} className="text-amber-500" />
            شاراتي المحققة
          </h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BADGES.map(badge => {
            const isUnlocked = user.badges?.includes(badge.id);
            return (
              <div 
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center text-center gap-2 ${
                  isUnlocked 
                    ? 'bg-white border-amber-200 shadow-md shadow-amber-50' 
                    : 'bg-slate-50 border-slate-100 opacity-40 grayscale'
                }`}
              >
                <div className={`p-3 rounded-full ${isUnlocked ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-400'}`}>
                  {badge.icon === 'Leaf' && <Sprout size={24} />}
                  {badge.icon === 'Award' && <Award size={24} />}
                  {badge.icon === 'Heart' && <Heart size={24} />}
                  {badge.icon === 'Trophy' && <Trophy size={24} />}
                </div>
                <span className="text-xs font-black text-slate-800">{badge.name}</span>
                {isUnlocked && <CheckCircle2 size={12} className="text-emerald-500" />}
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to action */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4">
        <div className="bg-blue-500 text-white p-3 rounded-xl">
          <Heart size={24} />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 text-sm">شارك الأمل</h4>
          <p className="text-xs text-blue-700">كل قطعة بلاستيك تجمعه يقرّبنا أكثر من بناء مدرسة أحلام زملائنا.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
