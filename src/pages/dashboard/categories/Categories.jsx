import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, Layers, Edit3, 
  Trash2, ChevronRight, 
  Hash 
} from 'lucide-react';

const Categories = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // بيانات تجريبية للتصنيفات
  const [categories] = useState([
    { id: 1, name: "إلكترونيات", slug: "electronics", count: 24, icon: "💻" },
    { id: 2, name: "ملابس رجالية", slug: "mens-wear", count: 12, icon: "👕" },
    { id: 3, name: "إكسسوارات منزلية", slug: "home-decor", count: 8, icon: "🏠" },
    { id: 4, name: "العطور", slug: "perfumes", count: 15, icon: "✨" },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Layers size={24} />
            </div>
            {t('dashboard.categories', 'التصنيفات')}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">
            {t('categories.manage_desc', 'نظم منتجاتك في مجموعات ليسهل على الزبائن العثور عليها.')}
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all active:scale-95">
          <Plus size={20} />
          {t('categories.add_new', 'إضافة تصنيف جديد')}
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-none transition-all group relative overflow-hidden">
            
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
                {cat.icon}
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all">
                  <Edit3 size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{cat.name}</h3>
              <div className="flex items-center gap-2 text-gray-400 dark:text-zinc-500 text-xs mb-4 font-mono">
                <Hash size={12} />
                <span>{cat.slug}</span>
              </div>
            </div>

            <div className="pt-5 border-t border-gray-50 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-black uppercase tracking-widest">{t('categories.products_count', 'المنتجات')}</span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{cat.count}</span>
              </div>
              <button className="w-11 h-11 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-400 dark:text-zinc-500 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white group-hover:translate-x-1 transition-all">
                <ChevronRight size={22} className={isRtl ? 'rotate-180' : ''} />
              </button>
            </div>

            {/* تأثير خلفية بسيط عند التحويم */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
          </div>
        ))}

        {/* Empty State / Add Card */}
        <button className="border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 text-gray-400 dark:text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all group">
          <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-300 dark:border-zinc-700 flex items-center justify-center group-hover:rotate-180 group-hover:scale-110 transition-all duration-500 group-hover:border-solid group-hover:bg-indigo-600 group-hover:text-white">
             <Plus size={28} />
          </div>
          <span className="font-black text-sm uppercase tracking-wider">{t('categories.quick_add', 'إضافة سريعة')}</span>
        </button>
      </div>

    </div>
  );
};

export default Categories;