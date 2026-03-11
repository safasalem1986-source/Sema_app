
import React, { useState, useRef } from 'react';
import { Camera, Scale, Upload, CheckCircle2, AlertCircle, Hash } from 'lucide-react';

interface CollectionPageProps {
  onAdd: (amount: number, photoUrl?: string) => void;
}

const CollectionPage: React.FC<CollectionPageProps> = ({ onAdd }) => {
  const [amount, setAmount] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(amount, 10);
    if (isNaN(count) || count <= 0) return;

    setIsSubmitting(true);
    // Simulate some delay
    setTimeout(() => {
      onAdd(count, photo || undefined);
      setIsSubmitting(false);
      setAmount('');
      setPhoto(null);
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-2">تسجيل عدد جديد</h2>
        <p className="text-slate-500 font-medium">أدخل عدد القطع البلاستيكية التي جمعتها</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-6">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Hash size={18} className="text-emerald-500" />
            عدد القطع البلاستيكية
          </label>
          <div className="relative">
            <input
              type="number"
              step="1"
              required
              min="1"
              placeholder="مثال: 15"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-2xl font-black text-slate-800 text-center focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Camera size={18} className="text-blue-500" />
            صورة الإثبات (اختياري)
          </label>
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handlePhotoChange}
          />
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
              photo ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50'
            }`}
          >
            {photo ? (
              <div className="relative group">
                <img src={photo} alt="Preview" className="w-32 h-32 object-cover rounded-xl shadow-md" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity">
                   <Upload size={24} className="text-white" />
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white p-4 rounded-full shadow-sm text-slate-400">
                  <Camera size={32} />
                </div>
                <span className="text-sm font-bold text-slate-400">اضغط لالتقاط أو اختيار صورة</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
          <AlertCircle size={20} className="text-amber-500 shrink-0" />
          <p className="text-xs text-amber-700 font-medium leading-relaxed">
            تأكد من تنظيف العبوات البلاستيكية وإزالة الأغطية لزيادة قيمة التدوير. كل قطعة تساوي نقطة أمل واحدة!
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !amount}
          className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${
            isSubmitting 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-200 hover:scale-[1.02] active:scale-95'
          }`}
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-4 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
          ) : (
            <>
              <CheckCircle2 size={24} />
              تأكيد التسجيل
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CollectionPage;
