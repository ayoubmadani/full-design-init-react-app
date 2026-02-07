import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cookie, Settings, ShieldCheck, MousePointer2, ToggleRight } from 'lucide-react';

const Cookies = () => {
  const { t } = useTranslation();

  return (
    <div className="py-16 bg-white dark:bg-brand-dark min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-3xl mb-6 shadow-sm animate-bounce">
            <Cookie size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            {t('cookies.title', 'سياسة ملفات تعريف الارتباط')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('cookies.subtitle', 'نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك، وتخصيص المحتوى، وتحليل حركة المرور على منصتنا.')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6">
          <CookieCategory 
            icon={<ShieldCheck className="text-brand-primary" />}
            title={t('cookies.essential_title', 'ملفات ضرورية')}
            desc={t('cookies.essential_desc', 'هذه الملفات مطلوبة لتشغيل الوظائف الأساسية للموقع مثل تسجيل الدخول وتأمين سلة التسوق. لا يمكن إيقافها.')}
            status={t('cookies.status_active', 'دائماً نشطة')}
          />

          <CookieCategory 
            icon={<Settings className="text-purple-600 dark:text-purple-400" />}
            title={t('cookies.pref_title', 'ملفات التفضيلات')}
            desc={t('cookies.pref_desc', 'تسمح للموقع بتذكر خياراتك مثل اللغة التي تستخدمها حالياً (العربية/الإنجليزية) ومنطقتك الزمنية.')}
            status={t('cookies.status_optional', 'اختياري')}
          />

          <CookieCategory 
            icon={<MousePointer2 className="text-blue-600 dark:text-blue-400" />}
            title={t('cookies.analytics_title', 'ملفات التحليل')}
            desc={t('cookies.analytics_desc', 'تساعدنا على فهم كيفية تفاعل التجار مع MdStore، مما يسمح لنا بتطوير أدوات بيع أكثر كفاءة.')}
            status={t('cookies.status_optional', 'اختياري')}
          />
        </div>

        {/* Management Note */}
        <div className="mt-16 p-8 bg-brand-primary rounded-[2.5rem] text-white relative overflow-hidden group shadow-xl shadow-brand-primary/20">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl">
              <ToggleRight size={32} />
            </div>
            <div className="text-center md:text-start lg:text-start">
              <h3 className="text-xl font-bold mb-2">{t('cookies.manage_title', 'كيف تتحكم في خياراتك؟')}</h3>
              <p className="text-indigo-100 opacity-90 text-sm leading-relaxed">
                {t('cookies.manage_desc', 'يمكنك إدارة أو مسح ملفات تعريف الارتباط من خلال إعدادات متصفحك في أي وقت. يرجى العلم أن تعطيل بعضها قد يؤثر على تجربة استخدام المنصة.')}
              </p>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </div>

      </div>
    </div>
  );
};

// مكون فرعي للفئات
const CookieCategory = ({ icon, title, desc, status }) => {
  const isActive = status.includes('دائماً') || status.includes('Always') || status.includes('نشطة');
  
  return (
    <div className="p-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2.5rem] flex flex-col md:flex-row gap-6 items-start hover:border-brand-primary/30 dark:hover:border-brand-primary/20 transition-all group">
      <div className="w-14 h-14 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex-grow space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl font-black text-gray-900 dark:text-white">{title}</h3>
          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            isActive 
            ? 'bg-brand-primary/10 text-brand-primary' 
            : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400'
          }`}>
            {status}
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base">{desc}</p>
      </div>
    </div>
  );
};

export default Cookies;