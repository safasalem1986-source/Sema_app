
import React from 'react';
import { Info, Calendar, MapPin, Recycle, Award, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      {/* Top Section */}
      <section className="text-center space-y-6">
        <div className="inline-flex p-3 bg-emerald-100 text-emerald-600 rounded-2xl mb-2">
          <Info size={32} />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            مسابقة العجلات الخضراء
          </h2>
          <p className="text-lg font-bold text-emerald-700 bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100 shadow-sm">
            هذه مسابقة تم انشائها من قبل مركز زها الثقافي لبناء اول مدرسة شلل دماغي في الاردن
          </p>
          <p className="text-lg font-bold text-blue-700 bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 shadow-sm">
            لذلك قررت مدرستنا و السفيرة سيما بناء تطبيق لجمع اكبر عدد نفايات بلاستيكية
          </p>
        </div>
      </section>

      {/* Middle Section - Details */}
      <section className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500"></div>
        
        <div className="grid gap-8">
          <div className="flex items-start gap-4">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl shrink-0">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 mb-1">موعد الجمع</h3>
              <p className="text-slate-600 font-medium">
                يتم جمع النفايات البلاستيكية يوم الثلاثاء من كل اسبوع في الحصة الثانية او الثالثة.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 mb-1">المكان</h3>
              <p className="text-slate-600 font-medium">
                في مدرسة منشية حسبان الثانوية الشاملة المختلطة من سفيرات المسابقة.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl shrink-0">
              <Recycle size={24} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 mb-1">نوع النفايات المسموحة</h3>
              <p className="text-slate-600 font-medium">
                قوارير الماء البلاستك و علب المشروبات الغازية البلاستك (فقط).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-rose-100 text-rose-600 p-3 rounded-2xl shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 mb-1">المنافسة</h3>
              <p className="text-slate-600 font-medium">
                ستمدد المسابقة لنهاية شهر مارس، والفوز سيكون مع الصف الاكثر نشاطًا.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center">
          <p className="text-slate-700 font-bold leading-relaxed">
            وسيتم جمع النفايات البلاستيكية يوم الثلاثاء من كل اسبوع في الحصة الثانية او الثالثة وعملية الجمع ستتم في مدرسة منشية حسبان الثانوية الشاملة المختلطة من سفيرات المسابقة وستمدد المسابقة لنهاية شهر مارس وبالعلم ان نوع النفايات البلاستيكية التي سيتم جمعها قوارير الماء البلاستك و علب المشروبات الغازية البلاستك (فقط) و الفوز مع الصف الاكثر نشاطًا
          </p>
        </div>
      </section>

      {/* Bottom Section - Credits */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-8 text-white text-center shadow-2xl relative overflow-hidden">
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex justify-center mb-2">
            <Heart className="text-rose-400 fill-rose-400 animate-pulse" size={32} />
          </div>
          <p className="text-xl font-black leading-relaxed">
            وبكل فخر تم تصميم هذا التطبيق من قبل السفيرة سيما رزق الله من مدرسة منشية حسبان الثانوية الشاملة المختلطة
          </p>
          <div className="pt-4 border-t border-white/10">
            <span className="text-slate-400 text-sm font-bold">مدرسة منشية حسبان الثانوية الشاملة المختلطة</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
