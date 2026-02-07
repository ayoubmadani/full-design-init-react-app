import React from 'react';
import { useTranslation } from 'react-i18next';
import { Target, Users, Zap, Award, BarChart as ChartIcon, Globe } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-brand-dark transition-colors duration-300">
      
      {/* Hero Section - تصميم عصري مع خلفية داكنة ثابتة */}
      <section className="relative py-24 bg-zinc-900 dark:bg-zinc-900/50 overflow-hidden rounded-[3xl] mx-4 my-4">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <Globe className="w-full h-full scale-150 text-white" />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {t('about.hero_title', 'نحن نعيد تعريف')} <br />
            <span className="bg-gradient-to-r from-brand-primary to-purple-400 bg-clip-text text-transparent">
               {t('about.hero_sub', 'التجارة الإلكترونية')}
            </span>
          </h1>
          <p className="text-indigo-100 dark:text-gray-300 text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
            {t('about.hero_desc', 'نحن لسنا مجرد منصة، بل نحن المحرك التقني الذي يحول أحلامك التجارية إلى واقع ملموس.')}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-4 bg-brand-primary/10 dark:bg-brand-primary/5 rounded-[2.5rem] rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="relative bg-gray-50 dark:bg-zinc-900 h-[400px] rounded-[2.5rem] flex items-center justify-center border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                <Zap size={120} className="text-brand-primary animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-6 text-right order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
               {t('about.story_title', 'قصتنا وكيف بدأنا')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              {t('about.story_p1', 'بدأت MdStore بفكرة بسيطة: جعل التجارة الإلكترونية متاحة للجميع. لاحظنا الصعوبات التي يواجهها التجار في إطلاق مواقعهم، فقررنا بناء بيئة تقنية متكاملة تتسم بالسهولة والقوة.')}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
               <div className="p-4 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-2xl border border-brand-primary/10">
                  <h4 className="font-bold text-brand-primary text-xl mb-1">2024</h4>
                  <p className="text-[10px] text-brand-primary opacity-80 uppercase tracking-widest font-black">تاريخ الانطلاق</p>
               </div>
               <div className="p-4 bg-purple-50 dark:bg-purple-500/10 rounded-2xl border border-purple-100 dark:border-purple-500/10">
                  <h4 className="font-bold text-purple-700 dark:text-purple-400 text-xl mb-1">+1000</h4>
                  <p className="text-[10px] text-purple-600 dark:text-purple-400 opacity-80 uppercase tracking-widest font-black">تاجر موثوق</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50/50 dark:bg-zinc-900/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem number="+15k" label={t('about.stat_merchants', 'تاجر نشط')} />
            <StatItem number="+200k" label={t('about.stat_products', 'منتج مباع')} />
            <StatItem number="24/7" label={t('about.stat_support', 'دعم متواصل')} />
            <StatItem number="99.9%" label={t('about.stat_uptime', 'وقت التشغيل')} />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">{t('about.values_title', 'قيمنا الأساسية')}</h2>
          <div className="w-20 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <ValueCard 
            icon={<Target className="text-brand-primary" />} 
            title={t('about.val1_title', 'الابتكار المستمر')}
            desc={t('about.val1_desc', 'نسعى دائماً لتوفير أحدث الأدوات التقنية التي تسبق توقعات السوق.')}
          />
          <ValueCard 
            icon={<Award className="text-purple-600 dark:text-purple-400" />} 
            title={t('about.val2_title', 'الشفافية المطلقة')}
            desc={t('about.val2_desc', 'نتعامل بوضوح تام مع شركائنا في جميع الرسوم والخدمات المقدمة.')}
          />
          <ValueCard 
            icon={<Users className="text-blue-600 dark:text-blue-400" />} 
            title={t('about.val3_title', 'تمكين التاجر')}
            desc={t('about.val3_desc', 'هدفنا هو منحك التحكم الكامل ببياناتك وعملياتك التجارية.')}
          />
        </div>
      </section>
    </div>
  );
};

const StatItem = ({ number, label }) => (
  <div className="text-center p-6 rounded-3xl hover:bg-white dark:hover:bg-zinc-900 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-zinc-800">
    <div className="text-3xl md:text-4xl font-black text-brand-primary mb-2">{number}</div>
    <div className="text-gray-500 dark:text-gray-400 font-bold text-sm md:text-base">{label}</div>
  </div>
);

const ValueCard = ({ icon, title, desc }) => (
  <div className="group p-10 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2.5rem] hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-300">
    <div className="w-14 h-14 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base">{desc}</p>
  </div>
);

export default About;