import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, Users, ShoppingBag, CreditCard, 
  ArrowUpRight, ArrowDownRight, Clock, ChevronRight 
} from 'lucide-react';

const DashboardHome = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // بيانات تجريبية للإحصائيات
  const stats = [
    { 
      label: t('dashboard.total_sales', 'إجمالي المبيعات'), 
      value: '145,000 د.ج', 
      change: '+12.5%', 
      isUp: true, 
      icon: <CreditCard className="text-emerald-600 dark:text-emerald-400" />,
      bg: 'bg-emerald-50 dark:bg-emerald-500/10'
    },
    { 
      label: t('dashboard.total_orders', 'الطلبات الجديدة'), 
      value: '28', 
      change: '+4.2%', 
      isUp: true, 
      icon: <ShoppingBag className="text-blue-600 dark:text-blue-400" />,
      bg: 'bg-blue-50 dark:bg-blue-500/10'
    },
    { 
      label: t('dashboard.total_customers', 'الزبائن'), 
      value: '1,240', 
      change: '-2.1%', 
      isUp: false, 
      icon: <Users className="text-purple-600 dark:text-purple-400" />,
      bg: 'bg-purple-50 dark:bg-purple-500/10'
    },
    { 
      label: t('dashboard.conversion_rate', 'معدل التحويل'), 
      value: '3.45%', 
      change: '+0.8%', 
      isUp: true, 
      icon: <TrendingUp className="text-amber-600 dark:text-amber-400" />,
      bg: 'bg-amber-50 dark:bg-amber-500/10'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 transition-colors">
      
      {/* الترحيب */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            {t('dashboard.welcome_user', 'مرحباً بك مجدداً، جون! 👋')}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1 font-medium">
            {t('dashboard.summary_text', 'إليك ما يحدث في متجرك اليوم.')}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-1.5 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
          <button className="px-5 py-2.5 text-sm font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-zinc-800 rounded-xl transition-all">
            {t('common.today', 'اليوم')}
          </button>
          <button className="px-5 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 transition-colors">
            {t('common.last_7_days', 'آخر 7 أيام')}
          </button>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black ${
                stat.isUp 
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' 
                  : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'
              }`}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* قسم الطلبات الأخيرة */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors">
          <div className="p-7 border-b border-gray-50 dark:border-zinc-800 flex items-center justify-between">
            <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Clock size={20} className="text-indigo-600 dark:text-indigo-400" />
              {t('dashboard.recent_orders', 'آخر الطلبات')}
            </h3>
            <button className="text-sm font-black text-indigo-600 dark:text-indigo-400 hover:gap-2 flex items-center gap-1 transition-all">
              {t('common.view_all', 'عرض الكل')}
              <ChevronRight size={16} className={isRtl ? 'rotate-180' : ''} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className={`w-full ${isRtl ? 'text-right' : 'text-left'}`}>
              <thead className="bg-gray-50/50 dark:bg-zinc-800/50 text-gray-400 dark:text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="px-8 py-5">{t('dashboard.order_id', 'رقم الطلب')}</th>
                  <th className="px-6 py-5">{t('dashboard.customer', 'الزبون')}</th>
                  <th className="px-6 py-5">{t('dashboard.status', 'الحالة')}</th>
                  <th className="px-8 py-5">{t('dashboard.total', 'الإجمالي')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
                {[1, 2, 3, 4].map((order) => (
                  <tr key={order} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-8 py-5 font-bold text-sm text-gray-900 dark:text-zinc-100">#ORD-240{order}</td>
                    <td className="px-6 py-5 text-sm text-gray-600 dark:text-zinc-300 font-bold">محمد بن يحيى</td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-[10px] font-black uppercase border border-amber-100 dark:border-amber-500/20">
                        {t('dashboard.pending', 'قيد الانتظار')}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-black text-sm text-gray-900 dark:text-white">12,500 د.ج</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* بطاقة سريعة: حالة المخزون */}
        <div className="bg-zinc-900 dark:bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-2xl font-black mb-3">{t('dashboard.inventory_status', 'حالة المخزون')}</h3>
              <p className="text-zinc-400 dark:text-indigo-100 text-sm leading-relaxed font-medium">
                {t('dashboard.inventory_desc', 'لديك 5 منتجات قارب مخزونها على الانتهاء. قم بتحديث الكميات لتجنب توقف المبيعات.')}
              </p>
            </div>
            <button className="mt-10 w-full py-4 bg-white text-zinc-900 dark:text-indigo-600 font-black rounded-2xl hover:bg-zinc-100 transition-all shadow-lg active:scale-95">
              {t('dashboard.manage_stock', 'إدارة المخزون')}
            </button>
          </div>
          {/* تأثيرات خلفية هندسية */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
             <svg width="100%" height="100%"><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;