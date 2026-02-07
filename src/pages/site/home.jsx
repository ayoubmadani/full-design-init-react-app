import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Rocket, ShieldCheck, BarChart3, ArrowRightLeft } from 'lucide-react';

const HomeSite = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* تأثير خلفية مضيئة (Glow) للوضع الليلي */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-500/5 blur-[120px] rounded-full"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* النص التعريفي */}
            <div className="flex-1 text-center lg:text-start">
              <span className="inline-block py-1 px-4 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold mb-6 animate-bounce">
                🚀 {t('home.new_feature', 'منصة التجار رقم #1')}
              </span>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.1] mb-8">
                {t('home.hero_title', 'أنشئ متجرك')} <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                   {t('home.hero_sub', 'في دقائق معدودة')}
                </span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                {t('home.hero_desc', 'منصة متكاملة توفر لك كل ما تحتاجه لبيع منتجاتك عبر الإنترنت بكل سهولة وأمان.')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/auth/register"
                  className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 dark:shadow-none transition-all transform hover:-translate-y-1"
                >
                  {t('home.get_started', 'ابدأ مجاناً')}
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-zinc-800 rounded-2xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
                >
                  {t('home.learn_more', 'تعرف علينا')}
                </Link>
              </div>
            </div>

            {/* الجانب البصري */}
            <div className="flex-1 relative">
              <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-[3rem] rotate-6 opacity-10 animate-pulse"></div>
                <div className="absolute inset-0 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="text-center p-8">
                     <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                        <Rocket size={40} />
                     </div>
                     <p className="font-black text-gray-800 dark:text-white text-2xl">MdStore Pro</p>
                     <p className="text-gray-400 dark:text-gray-500 text-sm">Dashboard v2.0</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#f8fafc] dark:bg-zinc-900/50 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {t('home.features_title', 'لماذا تختار منصتنا؟')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ArrowRightLeft className="text-indigo-600 dark:text-indigo-400" />} 
              title={t('home.feat1_title', 'سهولة الإعداد')}
              desc={t('home.feat1_desc', 'واجهة بسيطة تتيح لك إطلاق متجرك دون الحاجة لأي خبرة برمجية.')}
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-green-600 dark:text-emerald-400" />} 
              title={t('home.feat2_title', 'دفع آمن')}
              desc={t('home.feat2_desc', 'دعم كامل لبوابات الدفع المحلية والعالمية مع حماية فائقة لبياناتك.')}
            />
            <FeatureCard 
              icon={<BarChart3 className="text-purple-600 dark:text-purple-400" />} 
              title={t('home.feat3_title', 'تقارير ذكية')}
              desc={t('home.feat3_desc', 'حلل مبيعاتك وافهم سلوك عملائك من خلال لوحة تحكم ذكية.')}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] border border-gray-50 dark:border-zinc-800 hover:border-indigo-100 dark:hover:border-indigo-900/30 hover:shadow-2xl hover:shadow-indigo-50 dark:hover:shadow-none transition-all group">
    <div className="w-14 h-14 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

export default HomeSite;