import React, { useState } from 'react';
import { 
  Save, ArrowLeft, Search, 
  Home, Building2, RefreshCcw, 
  Filter
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Shipping() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const navigate = useNavigate();

  // نموذج لبيانات الولايات الـ 58 (عينة)
  const [rates, setRates] = useState([
    { id: 1, name: "الجزائر العاصمة", code: "16", home: 400, office: 200, return: 0, active: true },
    { id: 2, name: "وهران", code: "31", home: 600, office: 400, return: 0, active: true },
    { id: 3, name: "تمنراست", code: "11", home: 1200, office: 800, return: 200, active: true },
    { id: 4, name: "قسنطينة", code: "25", home: 500, office: 350, return: 0, active: true },
    { id: 5, name: "سطيف", code: "19", home: 550, office: 400, return: 0, active: true },
  ]);

  const handlePriceChange = (id, field, value) => {
    setRates(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const toggleStatus = (id) => {
    setRates(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 transition-colors">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 shadow-sm transition-all"
          >
            <ArrowLeft className={`w-5 h-5 text-gray-500 dark:text-zinc-400 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">{t('shipping.title', 'أسعار شحن الولايات')}</h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm">{t('shipping.subtitle', 'تخصيص تكاليف التوصيل للمنزل والمكتب لكل ولاية')}</p>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-2xl font-bold shadow-xl transition-all active:scale-95">
          <Save className="w-5 h-5" />
          <span>{t('common.save_all', 'حفظ كافة التغييرات')}</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2rem] p-4 flex flex-col md:flex-row gap-4 items-center shadow-sm transition-colors">
        <div className="relative flex-1 w-full group">
          <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors`} />
          <input 
            type="text" 
            placeholder={t('shipping.search', 'البحث عن ولاية...')}
            className={`w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-xl py-3 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} outline-none focus:ring-4 focus:ring-indigo-500/5 dark:text-white transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-zinc-500`}
          />
        </div>
        <button className="w-full md:w-auto px-5 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-xl text-sm font-bold text-gray-600 dark:text-zinc-300 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
          <Filter className="w-4 h-4" /> 
          {t('shipping.filter_region', 'تصفية حسب المنطقة')}
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className={`w-full text-sm ${isRtl ? 'text-right' : 'text-left'}`}>
            <thead className="bg-gray-50/50 dark:bg-zinc-800/50 border-b border-gray-50 dark:border-zinc-800 text-gray-400 dark:text-zinc-500 font-black uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-8 py-5">{t('shipping.state', 'الولاية')}</th>
                <th className="px-6 py-5">
                    <div className="flex items-center gap-2"><Home className="w-4 h-4 text-indigo-500"/> {t('shipping.home', 'للمنزل')}</div>
                </th>
                <th className="px-6 py-5">
                    <div className="flex items-center gap-2"><Building2 className="w-4 h-4 text-emerald-500"/> {t('shipping.office', 'للمكتب')}</div>
                </th>
                <th className="px-6 py-5">
                    <div className="flex items-center gap-2"><RefreshCcw className="w-4 h-4 text-rose-500"/> {t('shipping.return', 'الإرجاع')}</div>
                </th>
                <th className="px-6 py-5 text-center">{t('common.status', 'الحالة')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
              {rates.map((rate) => (
                <tr key={rate.id} className="hover:bg-gray-50/30 dark:hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <span className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center font-black text-gray-500 dark:text-zinc-400 text-xs border border-gray-200 dark:border-zinc-700 group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors">
                        {rate.code}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-zinc-100">{rate.name}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="relative max-w-[130px]">
                      <input 
                        type="number" 
                        value={rate.home}
                        onChange={(e) => handlePriceChange(rate.id, 'home', e.target.value)}
                        className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl py-2 px-4 text-sm font-black text-gray-700 dark:text-zinc-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                      />
                      <span className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-2.5 text-[9px] font-black text-gray-400`}>DA</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="relative max-w-[130px]">
                      <input 
                        type="number" 
                        value={rate.office}
                        onChange={(e) => handlePriceChange(rate.id, 'office', e.target.value)}
                        className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl py-2 px-4 text-sm font-black text-gray-700 dark:text-zinc-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                      />
                      <span className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-2.5 text-[9px] font-black text-gray-400`}>DA</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="relative max-w-[130px]">
                      <input 
                        type="number" 
                        value={rate.return}
                        onChange={(e) => handlePriceChange(rate.id, 'return', e.target.value)}
                        className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl py-2 px-4 text-sm font-black text-gray-700 dark:text-zinc-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 outline-none transition-all"
                      />
                      <span className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-2.5 text-[9px] font-black text-gray-400`}>DA</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => toggleStatus(rate.id)}
                      className={`w-11 h-6 rounded-full transition-all relative ${rate.active ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-zinc-700'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all ${isRtl ? (rate.active ? 'right-1' : 'right-6') : (rate.active ? 'left-6' : 'left-1')}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-gray-50/50 dark:bg-zinc-800/30 border-t border-gray-50 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
            <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium italic">
              {t('shipping.note', 'ملاحظة: هذه الأسعار تظهر للزبائن عند اختيار الولاية في المتجر.')}
            </p>
            <button className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 px-4 py-2 rounded-lg transition-colors">
              {t('shipping.bulk_edit', 'تعديل جماعي لكافة الولايات')}
            </button>
        </div>
      </div>
    </div>
  );
}