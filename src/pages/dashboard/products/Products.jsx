import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Eye, Edit3, Trash2, Box, 
  ArrowUpDown, CheckCircle2, AlertCircle, Clock, 
  FileText, Image as ImageIcon, Tag, Globe, MoreVertical
} from 'lucide-react';

export default function Products() {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'products' });
  const isRtl = i18n.language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  // بيانات تحاكي الجدول في قاعدة البيانات (SQL Schema)
  const [products] = useState([
    { 
      id: "uuid-1", 
      title: 'قميص قطني فاخر', 
      handle: 'premium-cotton-shirt',
      product_type: 'ملابس', 
      vendor: 'براند كوليكشن',
      status: 'published', // مطابق لـ product_status Enum
      featured_image_url: null,
      tags: ['صيف 2024', 'قطن'],
      created_at: '2024-02-08'
    },
    { 
      id: "uuid-2", 
      title: 'ساعة يد ذكية S8', 
      handle: 'smart-watch-s8',
      product_type: 'إلكترونيات', 
      vendor: 'شاومي',
      status: 'draft', 
      featured_image_url: null,
      tags: ['تكنولوجيا'],
      created_at: '2024-02-07'
    }
  ]);

  // دالة لتحديد شكل حالة المنتج بناءً على الـ Schema
  const StatusBadge = ({ status }) => {
    const configs = {
      published: { color: 'text-emerald-500 bg-emerald-500/10', icon: <CheckCircle2 size={12} />, label: t('status_published', 'منشور') },
      draft: { color: 'text-zinc-500 bg-zinc-500/10', icon: <FileText size={12} />, label: t('status_draft', 'مسودة') },
      archived: { color: 'text-amber-500 bg-amber-500/10', icon: <Clock size={12} />, label: t('status_archived', 'مؤرشف') }
    };
    const config = configs[status] || configs.draft;
    return (
      <div className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase ${config.color}`}>
        {config.icon} {config.label}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg"><Box size={24} /></div>
            {t('list_title', 'المخزون والمنتجات')}
          </h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">{t('list_desc', 'إدارة العرض، الـ SEO، وحالات النشر للمنتجات')}</p>
        </div>

        <Link to="/dashboard/products/create" className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-emerald-500 text-white rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all">
          <Plus size={20} /> {t('add_new', 'إضافة منتج')}
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[300px] relative group">
          <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors`} size={18} />
          <input 
            type="text"
            placeholder={t('search_placeholder', 'البحث بالعنوان، المورد، أو الـ handle...')}
            className={`w-full ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all font-bold text-sm dark:text-white`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="px-5 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-600 dark:text-zinc-400 font-black text-xs flex items-center gap-2 hover:bg-zinc-50 transition-all"><Filter size={16} /> {t('filter', 'تصفية')}</button>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className={`w-full ${isRtl ? 'text-right' : 'text-left'} border-collapse`}>
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t('table_product', 'المنتج والمسار')}</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t('table_info', 'التصنيف والمورد')}</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t('table_status', 'الحالة')}</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t('table_tags', 'الوسوم')}</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-center">{t('table_actions', 'إجراءات')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-200 dark:border-zinc-700 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                        {product.featured_image_url ? <img src={product.featured_image_url} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={20} />}
                      </div>
                      <div>
                        <div className="font-black text-zinc-800 dark:text-zinc-200 text-sm leading-tight">{product.title}</div>
                        <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1 mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                          <Globe size={10} /> /{product.handle}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{product.product_type || '---'}</span>
                      <span className="text-[10px] font-medium text-zinc-400 uppercase">{product.vendor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                      {product.tags?.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded text-[9px] font-black border border-zinc-200 dark:border-zinc-700">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-2 text-zinc-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-all"><Edit3 size={16} /></button>
                      <button className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"><Trash2 size={16} /></button>
                      <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-all"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-50/30 dark:bg-zinc-800/20">
          <p className="text-[11px] font-bold text-zinc-500">
            {t('showing', 'عرض')} 1-2 {t('of', 'من')} 2 {t('results', 'منتجات مضافة')}
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-black text-zinc-400 cursor-not-allowed uppercase tracking-tighter">{t('prev', 'السابق')}</button>
            <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-black text-zinc-900 dark:text-white shadow-sm hover:bg-zinc-50 transition-all uppercase tracking-tighter">{t('next', 'التالي')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}