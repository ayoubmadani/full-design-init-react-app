import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, TrendingUp, Users, ShoppingCart, 
  ArrowUpRight, ArrowDownRight, Calendar, 
  Download, Target, MousePointer2 
} from 'lucide-react';

    const Analytics = () => {
    const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // بيانات افتراضية للرسوم البيانية البسيطة
  const performanceData = [
    { label: t('analytics.visitors', 'الزوار'), value: '12,450', grow: '+15%', isUp: true },
    { label: t('analytics.sessions', 'الجلسات'), value: '45,200', grow: '+8%', isUp: true },
    { label: t('analytics.bounce_rate', 'معدل الارتداد'), value: '42.3%', grow: '-5%', isUp: false },
    { label: t('analytics.avg_order', 'متوسط قيمة الطلب'), value: '8,400 د.ج', grow: '+12%', isUp: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 transition-colors">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg">
              <BarChart3 size={24} />
            </div>
            {t('dashboard.analytics', 'التحليلات والأداء')}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1 font-medium">
            {t('analytics.desc', 'حلل بيانات مبيعاتك، سلوك الزوار وأداء منتجاتك.')}
          </p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl text-sm font-bold text-gray-600 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-sm">
                <Calendar size={18} />
                {t('common.last_30_days', 'آخر 30 يوم')}
            </button>
            <button className="p-2.5 bg-zinc-900 dark:bg-indigo-600 text-white rounded-xl hover:opacity-90 transition-all shadow-lg">
                <Download size={20} />
            </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceData.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm relative overflow-hidden group transition-all">
            <div className="relative z-10">
                <p className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1">{item.label}</p>
                <div className="flex items-end justify-between">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">{item.value}</h3>
                    <div className={`flex items-center text-[11px] font-black px-2 py-1 rounded-lg ${
                      item.isUp 
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}>
                        {item.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {item.grow}
                    </div>
                </div>
            </div>
            {/* زخرفة خلفية بسيطة */}
            <div className={`absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-125 transition-transform duration-500 ${isRtl ? '-scale-x-100' : ''}`}>
                <TrendingUp size={100} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sales Chart Placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm min-h-[400px] flex flex-col transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 text-lg">
                    <Target size={20} className="text-indigo-600 dark:text-indigo-400" />
                    {t('analytics.sales_overview', 'مخطط المبيعات')}
                </h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-tighter">
                        <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span> {t('analytics.this_month', 'الشهر الحالي')}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-tighter">
                        <span className="w-2.5 h-2.5 bg-gray-200 dark:bg-zinc-700 rounded-full"></span> {t('analytics.last_month', 'الشهر الماضي')}
                    </div>
                </div>
            </div>
            {/* مكان الرسم البياني المستقبلي */}
            <div className="flex-1 w-full bg-gray-50/50 dark:bg-zinc-800/30 rounded-3xl border border-dashed border-gray-200 dark:border-zinc-700 flex items-center justify-center relative group">
                <div className="text-center space-y-3 z-10">
                    <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <BarChart3 size={32} className="text-indigo-500" />
                    </div>
                    <p className="text-gray-400 dark:text-zinc-500 text-sm font-black">{t('analytics.chart_placeholder', 'سيظهر الرسم البياني التفاعلي هنا')}</p>
                </div>
                {/* خطوط شبكية وهمية للخلفية */}
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
                  <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
                </div>
            </div>
        </div>

        {/* Top Products / Insights */}
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-500 dark:to-purple-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 group-hover:rotate-12 transition-transform">
                        <MousePointer2 size={24} />
                    </div>
                    <h3 className="text-xl font-black mb-2 tracking-tight">{t('analytics.top_source', 'أعلى مصدر حركة')}</h3>
                    <p className="text-indigo-100 text-sm leading-relaxed mb-6 font-medium">
                        {t('analytics.source_desc', 'فيسبوك هو المصدر الأول للزيارات هذا الأسبوع بنسبة 65% من إجمالي الترافيك.')}
                    </p>
                    <button className="w-full py-3.5 bg-white text-indigo-600 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-lg active:scale-95">
                        {t('analytics.view_details', 'تفاصيل المصادر')}
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-colors"></div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm transition-colors">
                <h3 className="font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <ShoppingCart size={18} className="text-emerald-500" />
                    {t('analytics.best_sellers', 'الأكثر مبيعاً')}
                </h3>
                <div className="space-y-4">
                    {[1, 2, 3].map(item => (
                        <div key={item} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-zinc-800/50 rounded-2xl transition-all group">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                               <div className="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-50 dark:from-zinc-700 dark:to-zinc-800"></div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-black text-gray-900 dark:text-zinc-100">منتج رقم {item}</p>
                                <p className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase">120 {t('products.units', 'مبيعة')}</p>
                            </div>
                            <div className="text-sm font-black text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                                12.5%
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;