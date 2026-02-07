import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Settings as SettingsIcon, User, Lock, Bell, 
  Globe, Coins, ShieldCheck, Save, Moon, Sun
} from 'lucide-react';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  
  // مزامنة حالة الوضع الليلي مع الـ HTML class و localStorage
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const tabs = [
    { id: 'profile', label: t('settings.profile', 'الحساب الشخصي'), icon: <User size={18} /> },
    { id: 'store', label: t('settings.preferences', 'التفضيلات'), icon: <Globe size={18} /> },
    { id: 'security', label: t('settings.security', 'الأمان'), icon: <Lock size={18} /> },
    { id: 'notifications', label: t('settings.notifications', 'التنبيهات'), icon: <Bell size={18} /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 transition-colors">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg">
              <SettingsIcon size={24} />
            </div>
            {t('dashboard.settings', 'الإعدادات العامة')}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">
            {t('settings.desc', 'إدارة حسابك الشخصي، تفضيلات المنصة، وكلمة المرور.')}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Tabs */}
        <aside className="lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg shadow-zinc-200 dark:shadow-none' 
                : 'bg-white dark:bg-zinc-900/50 text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 border border-gray-100 dark:border-zinc-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* 1. Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6 animate-in slide-in-from-top-4 duration-300">
              <h3 className="text-lg font-black text-gray-900 dark:text-white border-b border-gray-50 dark:border-zinc-800 pb-4">
                {t('settings.personal_info', 'المعلومات الشخصية')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-zinc-300">{t('settings.full_name', 'الاسم الكامل')}</label>
                  <input type="text" defaultValue="عبد المالك" className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-2xl outline-none focus:bg-white dark:focus:bg-zinc-800 focus:ring-2 focus:ring-zinc-900/5 text-gray-900 dark:text-white transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-zinc-300">{t('settings.email', 'البريد الإلكتروني')}</label>
                  <input type="email" defaultValue="admin@mdstore.dz" className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-2xl outline-none focus:bg-white dark:focus:bg-zinc-800 focus:ring-2 focus:ring-zinc-900/5 text-gray-900 dark:text-white transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* 2. Preferences & Mode Switch */}
          {activeTab === 'store' && (
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8 animate-in slide-in-from-top-4 duration-300">
              <section className="space-y-6">
                <h3 className="text-lg font-black text-gray-900 dark:text-white border-b border-gray-50 dark:border-zinc-800 pb-4">
                  {t('settings.platform_pref', 'تفضيلات المنصة')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-zinc-300 flex items-center gap-2">
                      <Coins size={16} /> {t('settings.currency', 'العملة الافتراضية')}
                    </label>
                    <select className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-2xl outline-none transition-all font-bold text-gray-600 dark:text-zinc-300">
                      <option>DZD - دينار جزائري</option>
                      <option>USD - دولار أمريكي</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-zinc-300 flex items-center gap-2">
                      <Globe size={16} /> {t('settings.language', 'لغة لوحة التحكم')}
                    </label>
                    <select 
                      value={i18n.language}
                      onChange={(e) => i18n.changeLanguage(e.target.value)}
                      className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-2xl outline-none transition-all font-bold text-gray-600 dark:text-zinc-300"
                    >
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </section>

              
            </div>
          )}

          {/* 3. Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6 animate-in slide-in-from-top-4 duration-300">
              <h3 className="text-lg font-black text-gray-900 dark:text-white border-b border-gray-50 dark:border-zinc-800 pb-4 flex items-center gap-2">
                <ShieldCheck className="text-emerald-500" />
                {t('settings.password_change', 'تغيير كلمة المرور')}
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-zinc-300">{t('settings.curr_pass', 'كلمة المرور الحالية')}</label>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-2xl outline-none focus:bg-white dark:focus:bg-zinc-800 text-gray-900 dark:text-white transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-zinc-300">{t('settings.new_pass', 'كلمة المرور الجديدة')}</label>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700 rounded-2xl outline-none focus:bg-white dark:focus:bg-zinc-800 text-gray-900 dark:text-white transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* 4. Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6 animate-in slide-in-from-top-4 duration-300">
              <h3 className="text-lg font-black text-gray-900 dark:text-white border-b border-gray-50 dark:border-zinc-800 pb-4">{t('settings.notif_settings', 'إعدادات التنبيهات')}</h3>
              <div className="space-y-4">
                {[
                  { id: 'orders', label: t('settings.notif_orders', 'طلبات جديدة'), desc: 'تلقي تنبيه عند كل عملية شراء جديدة' },
                  { id: 'stock', label: t('settings.notif_stock', 'تنبيهات المخزون'), desc: 'تنبيه عندما يوشك منتج على النفاذ' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100/50 dark:border-zinc-700">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-zinc-400">{item.desc}</p>
                    </div>
                    {/* Toggle Switch */}
                    <div className="w-11 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${isRtl ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button className="group flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black rounded-2xl shadow-xl shadow-zinc-200 dark:shadow-none hover:-translate-y-1 transition-all active:scale-95">
              <Save size={18} className="group-hover:rotate-12 transition-transform" />
              {t('common.save_settings', 'حفظ الإعدادات')}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Settings;