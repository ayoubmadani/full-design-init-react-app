import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Eye, Lock, Database, Globe, Bell } from 'lucide-react';

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div className="py-16 bg-white dark:bg-brand-dark min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-3xl mb-6 shadow-sm">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            {t('privacy.title', 'سياسة الخصوصية')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('privacy.subtitle', 'في MdStore، نضع خصوصية بياناتك وأمان متجرك على رأس أولوياتنا. إليك كيف نحمي معلوماتك.')}
          </p>
        </div>

        {/* Content Sections */}
        <div className="grid gap-8">
          <PrivacyCard 
            icon={<Database className="text-blue-600 dark:text-blue-400" />}
            title={t('privacy.collection_title', 'البيانات التي نجمعها')}
            desc={t('privacy.collection_desc', 'نجمع فقط البيانات الضرورية لتشغيل متجرك، مثل الاسم، البريد الإلكتروني، ومعلومات الدفع لضمان تجربة بيع سلسة.')}
          />

          <PrivacyCard 
            icon={<Eye className="text-purple-600 dark:text-purple-400" />}
            title={t('privacy.usage_title', 'كيفية استخدام البيانات')}
            desc={t('privacy.usage_desc', 'تُستخدم بياناتك لتحسين خدماتنا، ومعالجة الطلبات، وتوفير تقارير ذكية تساعدك في اتخاذ قرارات تجارية أفضل.')}
          />

          <PrivacyCard 
            icon={<Lock className="text-brand-success" />}
            title={t('privacy.protection_title', 'حماية المعلومات')}
            desc={t('privacy.protection_desc', 'نستخدم تقنيات تشفير متطورة ومعايير أمان عالمية لحماية بياناتك من أي وصول غير مصرح به.')}
          />

          <PrivacyCard 
            icon={<Globe className="text-brand-primary" />}
            title={t('privacy.sharing_title', 'مشاركة البيانات')}
            desc={t('privacy.sharing_desc', 'نحن لا نبيع بياناتك أبداً. نشاركها فقط مع مزودي الخدمات الموثوقين (مثل بوابات الدفع) لإتمام عملياتك التجارية.')}
          />
        </div>

        {/* Last Updated - Footer of page */}
        <div className="mt-16 p-8 bg-gray-50 dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-sm text-gray-400 dark:text-zinc-500">
              <Bell size={20} />
            </div>
            <div className="text-center md:text-right lg:text-right">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{t('privacy.updates_title', 'التحديثات')}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t('privacy.updates_desc', 'نقوم بتحديث هذه السياسة دورياً لضمان مواكبة أحدث معايير الأمان.')}</p>
            </div>
          </div>
          <div className="text-sm text-gray-400 dark:text-zinc-500 font-medium">
             {t('privacy.last_updated', 'آخر تحديث')}: 06/02/2026
          </div>
        </div>
      </div>
    </div>
  );
};

// مكون فرعي للبطاقات
const PrivacyCard = ({ icon, title, desc }) => (
  <div className="p-8 md:p-10 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2.5rem] hover:shadow-xl hover:shadow-brand-primary/5 dark:hover:shadow-none transition-all group">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-14 h-14 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-black text-gray-900 dark:text-white transition-colors">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base">{desc}</p>
      </div>
    </div>
  </div>
);

export default Privacy;