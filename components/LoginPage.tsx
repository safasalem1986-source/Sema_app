
import React, { useState } from 'react';
import { Droplets, ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onLogin: (name: string, grade: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && grade.trim()) {
      onLogin(name, grade);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>

        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="bg-gradient-to-br from-blue-500 to-emerald-500 p-4 rounded-2xl text-white shadow-lg mb-4">
            <Droplets size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Plastic<span className="text-emerald-500">Hope</span></h1>
          <p className="text-slate-500 text-center font-medium">بلاستيك اليوم.. هو أمل مدرسة الغد لطلاب الشلل الدماغي</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 mr-1">الاسم الكامل</label>
            <input
              type="text"
              required
              placeholder="مثال: أحمد محمد"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 mr-1">الصف</label>
            <input
              type="text"
              required
              placeholder="مثال: الخامس أ"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold py-4 rounded-xl shadow-xl shadow-emerald-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            انطلق للمنافسة
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400">
          بتسجيلك، أنت تساهم في دعم أول مدرسة متخصصة لطلاب الشلل الدماغي في منطقتنا.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
