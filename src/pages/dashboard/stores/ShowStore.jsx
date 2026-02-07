import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Store, Upload, Globe, Mail, 
  Phone, Save, Camera, Link as LinkIcon 
} from 'lucide-react';

const StoreSettings = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const isRtl = i18n.language === 'ar';

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    // محاكاة عملية حفظ البيانات
    setTimeout(() => {
      setLoading(false);
      // يمكنك استبدال alert بـ Toast notification لاحقاً
      alert(t('common.saved_success', 'تم حفظ التغييرات بنجاح!'));
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 transition-colors">
      
      {/* العنوان */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Store size={24} />
          </div>
          {t('dashboard.store_settings', 'إعدادات المتجر')}
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 text-sm mt-2">
          {t('dashboard.store_desc', 'تحكم في هوية متجرك ومعلومات التواصل التي تظهر للزبائن.')}
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* قسم الهوية البصرية (الشعار) */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm transition-colors">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
             <Camera size={18} className="text-gray-400 dark:text-zinc-500" />
             {t('dashboard.visual_identity', 'الهوية البصرية')}
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 bg-gray-50 dark:bg-zinc-800/50 border-2 border-dashed border-gray-200 dark:border-zinc-700 rounded-[2rem] flex items-center justify-center overflow-hidden group-hover:border-indigo-300 dark:group-hover:border-indigo-500/50 transition-colors">
                <Upload className="text-gray-300 dark:text-zinc-600 group-hover:text-indigo-400 transition-colors" />
              </div>
              <button type="button" className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                <Upload size={16} />
              </button>
            </div>
            <div className={`space-y-1 text-center ${isRtl ? 'md:text-right' : 'md:text-left'}`}>
              <h4 className="font-bold text-gray-900 dark:text-white">{t('dashboard.store_logo', 'شعار المتجر')}</h4>
              <p className="text-xs text-gray-400 dark:text-zinc-500 leading-relaxed max-w-xs">
                {t('dashboard.logo_requirements', 'يفضل استخدام صورة مربعة بحجم 512x512 بكسل بصيغة PNG أو JPG.')}
              </p>
            </div>
          </div>
        </div>

        {/* قسم المعلومات الأساسية */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 transition-colors">
          <h3 className="col-span-full text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
             <Globe size={18} className="text-gray-400 dark:text-zinc-500" />
             {t('dashboard.basic_info', 'المعلومات الأساسية')}
          </h3>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-zinc-300 px-1">{t('dashboard.store_name', 'اسم المتجر')}</label>
            <input 
              type="text" 
              placeholder="MdStore"
              className="w-full px-5 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-zinc-300 px-1">{t('dashboard.store_domain', 'نطاق المتجر (Domain)')}</label>
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="my-store"
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all ltr"
              />
              <span className={`absolute ${isRtl ? 'left-4' : 'right-4'} text-gray-400 dark:text-zinc-500 font-medium text-sm pointer-events-none`}>.mdstore.dz</span>
            </div>
          </div>

          <div className="space-y-2 col-span-full">
            <label className="text-sm font-bold text-gray-700 dark:text-zinc-300 px-1">{t('dashboard.store_bio', 'وصف المتجر')}</label>
            <textarea 
              rows="3"
              className="w-full px-5 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all resize-none"
              placeholder={t('dashboard.bio_placeholder', 'أخبر زبائنك قليلاً عن متجرك...')}
            ></textarea>
          </div>
        </div>

        {/* قسم التواصل */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 transition-colors">
          <h3 className="col-span-full text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
             <LinkIcon size={18} className="text-gray-400 dark:text-zinc-500" />
             {t('dashboard.contact_links', 'روابط التواصل')}
          </h3>
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gray-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-gray-400 dark:text-zinc-500 shrink-0 transition-colors">
              <Mail size={18} />
            </div>
            <input type="email" placeholder="email@store.com" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all" />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gray-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-gray-400 dark:text-zinc-500 shrink-0 transition-colors">
              <Phone size={18} />
            </div>
            <input type="tel" placeholder="+213 000 000 000" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all" />
          </div>
        </div>

        {/* زر الحفظ العائم */}
        <div className="sticky bottom-8 flex justify-end z-10">
          <button 
            type="submit"
            disabled={loading}
            className="flex items-center gap-3 px-10 py-4 bg-indigo-600 dark:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save size={20} />
            )}
            {t('common.save_changes', 'حفظ التغييرات')}
          </button>
        </div>

      </form>
    </div>
  );
};

export default StoreSettings;