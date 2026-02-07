import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, Search, Filter, Edit2, 
  Trash2, Box, ArrowUpDown, ChevronLeft, ChevronRight 
} from 'lucide-react';

const Products = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // بيانات تجريبية للمنتجات
  const [products] = useState([
    { id: 1, name: "هاتف ذكي X1", category: "إلكترونيات", price: "45,000 د.ج", stock: 12, status: "active", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop" },
    { id: 2, name: "سماعات لاسلكية", category: "إكسسوارات", price: "8,500 د.ج", stock: 0, status: "out_of_stock", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop" },
    { id: 3, name: "ساعة ذكية Pro", category: "إلكترونيات", price: "12,000 د.ج", stock: 5, status: "active", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop" },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 transition-colors">
      
      {/* Header مع زر إضافة منتج */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Box size={24} />
            </div>
            {t('dashboard.products', 'المنتجات')}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">{t('products.manage_desc', 'قم بإدارة مخزونك، أسعارك وتفاصيل منتجاتك هنا.')}</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95">
          <Plus size={20} />
          {t('products.add_new', 'إضافة منتج جديد')}
        </button>
      </div>

      {/* شريط البحث والفلاتر */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-4 items-center transition-colors">
        <div className="relative flex-1 w-full group">
          <Search className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} my-auto text-gray-400 group-focus-within:text-indigo-500 transition-colors`} size={18} />
          <input 
            type="text" 
            placeholder={t('products.search_placeholder', 'البحث باسم المنتج أو الفئة...')}
            className={`w-full ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 bg-gray-50 dark:bg-zinc-800/50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/10 dark:text-white outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-500`}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 border border-gray-100 dark:border-zinc-800 rounded-xl text-gray-600 dark:text-zinc-300 font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all">
            <Filter size={18} />
            {t('common.filter', 'تصفية')}
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 border border-gray-100 dark:border-zinc-800 rounded-xl text-gray-600 dark:text-zinc-300 font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all">
            <ArrowUpDown size={18} />
            {t('common.sort', 'ترتيب')}
          </button>
        </div>
      </div>

      {/* جدول المنتجات */}
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className={`w-full ${isRtl ? 'text-right' : 'text-left'}`}>
            <thead className="bg-gray-50/50 dark:bg-zinc-800/50 text-gray-400 dark:text-zinc-500 text-xs uppercase font-black tracking-wider">
              <tr>
                <th className="px-8 py-5">{t('products.item', 'المنتج')}</th>
                <th className="px-6 py-5">{t('dashboard.categories', 'الفئة')}</th>
                <th className="px-6 py-5">{t('products.price', 'السعر')}</th>
                <th className="px-6 py-5">{t('products.stock', 'المخزون')}</th>
                <th className="px-6 py-5">{t('products.status', 'الحالة')}</th>
                <th className="px-8 py-5 text-center">{t('common.actions', 'إجراءات')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/30 dark:hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={product.image} alt="" className="w-12 h-12 rounded-xl object-cover bg-gray-100 dark:bg-zinc-800 shadow-sm" />
                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/5"></div>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] font-black text-gray-500 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg uppercase transition-colors">{product.category}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-black text-gray-900 dark:text-white transition-colors">{product.price}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-sm font-bold transition-colors ${product.stock > 0 ? 'text-gray-600 dark:text-zinc-400' : 'text-rose-500'}`}>
                      {product.stock} {t('products.units', 'قطع')}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-colors ${
                      product.status === 'active' 
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}>
                      {product.status === 'active' ? t('products.active', 'متوفر') : t('products.out_of_stock', 'نافذ')}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all" title={t('common.edit')}>
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all" title={t('common.delete')}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* الترقيم (Pagination) */}
        <div className="p-6 border-t border-gray-50 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900 transition-colors">
          <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">
            {t('common.showing', 'عرض')} <span className="text-gray-900 dark:text-white font-bold">1-3</span> {t('common.of', 'من')} <span className="text-gray-900 dark:text-white font-bold">12</span> {t('dashboard.products')}
          </p>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-100 dark:border-zinc-800 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-400 transition-all disabled:opacity-30">
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

export default Products;