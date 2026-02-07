import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingCart, Search, Filter, Eye, 
  Truck, CheckCircle2, Clock, XCircle, 
  Download, MoreHorizontal, ChevronLeft, ChevronRight 
} from 'lucide-react';

const Orders = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // بيانات تجريبية للطلبات
  const [orders] = useState([
    { id: 'ORD-7721', customer: 'أحمد بن علي', date: '2026-02-07', total: '15,600 د.ج', status: 'pending', payment: 'COD' },
    { id: 'ORD-7722', customer: 'سارة محمود', date: '2026-02-06', total: '8,200 د.ج', status: 'shipped', payment: 'Card' },
    { id: 'ORD-7723', customer: 'ياسين براهيمي', date: '2026-02-05', total: '22,000 د.ج', status: 'delivered', payment: 'COD' },
    { id: 'ORD-7724', customer: 'ليلى كريم', date: '2026-02-05', total: '4,500 د.ج', status: 'cancelled', payment: 'COD' },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20';
      case 'shipped': return 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20';
      case 'delivered': return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20';
      case 'cancelled': return 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20';
      default: return 'bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border-gray-100 dark:border-zinc-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={14} />;
      case 'shipped': return <Truck size={14} />;
      case 'delivered': return <CheckCircle2 size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 transition-colors">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg">
              <ShoppingCart size={24} />
            </div>
            {t('dashboard.orders', 'الطلبات')}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">
            {t('orders.manage_desc', 'تتبع طلبات زبائنك، غير حالات الشحن وأصدر الفواتير.')}
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 font-bold rounded-2xl shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all">
          <Download size={20} />
          {t('orders.export', 'تصدير الطلبات')}
        </button>
      </div>

      {/* Quick Filters / Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('orders.all_orders', 'الكل'), value: '128', color: 'text-gray-900 dark:text-white', labelColor: 'text-gray-400' },
          { label: t('orders.pending_filter', 'قيد الانتظار'), value: '12', color: 'text-amber-500', labelColor: 'text-amber-500/70' },
          { label: t('orders.shipped_filter', 'تم الشحن'), value: '45', color: 'text-blue-500', labelColor: 'text-blue-500/70' },
          { label: t('orders.completed_filter', 'مكتملة'), value: '71', color: 'text-emerald-500', labelColor: 'text-emerald-500/70' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 p-5 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm transition-colors">
            <p className={`text-[10px] font-black uppercase tracking-widest ${stat.labelColor}`}>{stat.label}</p>
            <p className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors">
        {/* Search & Filter Bar */}
        <div className="p-6 border-b border-gray-50 dark:border-zinc-800 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} my-auto text-gray-400 group-focus-within:text-blue-500 transition-colors`} size={18} />
            <input 
              type="text" 
              placeholder={t('orders.search_placeholder', 'البحث برقم الطلب أو اسم الزبون...')}
              className={`w-full ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 bg-gray-50 dark:bg-zinc-800/50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/10 dark:text-white outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-500`}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-100 dark:border-zinc-800 rounded-xl text-gray-600 dark:text-zinc-300 font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all">
            <Filter size={18} />
            {t('common.filter', 'تصفية')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className={`w-full ${isRtl ? 'text-right' : 'text-left'}`}>
            <thead className="bg-gray-50/50 dark:bg-zinc-800/50 text-gray-400 dark:text-zinc-500 text-[10px] uppercase font-black tracking-wider">
              <tr>
                <th className="px-8 py-5">{t('orders.id', 'رقم الطلب')}</th>
                <th className="px-6 py-5">{t('orders.customer', 'الزبون')}</th>
                <th className="px-6 py-5">{t('orders.date', 'التاريخ')}</th>
                <th className="px-6 py-5">{t('orders.total', 'الإجمالي')}</th>
                <th className="px-6 py-5">{t('orders.status', 'الحالة')}</th>
                <th className="px-8 py-5 text-center">{t('common.actions', 'إجراءات')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/30 dark:hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="font-bold text-gray-900 dark:text-zinc-100">#{order.id.split('-')[1]}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{order.customer}</span>
                      <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase">{order.payment}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-500 dark:text-zinc-400">
                    {order.date}
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-black text-gray-900 dark:text-white">{order.total}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase border transition-colors ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {t(`orders.status_${order.status}`, order.status)}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 dark:border-zinc-800 flex items-center justify-between transition-colors">
          <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">
            {t('common.showing', 'عرض')} <span className="text-gray-900 dark:text-white font-bold">1-4</span> {t('common.of', 'من')} <span className="text-gray-900 dark:text-white font-bold">128</span> {t('dashboard.orders')}
          </p>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-100 dark:border-zinc-800 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-400 disabled:opacity-30 transition-all">
              <ChevronLeft size={20} className={isRtl ? 'rotate-180' : ''} />
            </button>
            <button className="p-2 border border-gray-100 dark:border-zinc-800 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-400 transition-all">
              <ChevronRight size={20} className={isRtl ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;