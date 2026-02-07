import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Store, Plus, Search, MapPin, 
  ExternalLink, Settings, 
  CircleDot, Globe, LayoutGrid, X
} from 'lucide-react';

const Stores = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [searchQuery, setSearchQuery] = useState("");

  // بيانات تجريبية للمتاجر
  const [myStores] = useState([
    { 
      id: 1, 
      name: "متجر الإلكترونيات الرئيسي", 
      domain: "electronics.mdstore.dz", 
      location: "الجزائر العاصمة", 
      status: "active",
      orders: 145 
    },
    { 
      id: 2, 
      name: "فرع الملابس - وهران", 
      domain: "fashion-oran.mdstore.dz", 
      location: "وهران", 
      status: "active",
      orders: 89 
    },
    { 
      id: 3, 
      name: "متجر العطور (قيد التجهيز)", 
      domain: "perfumes.mdstore.dz", 
      location: "سطيف", 
      status: "maintenance",
      orders: 0 
    }
  ]);

  const filteredStores = myStores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 transition-colors">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl">
              <Store size={24} />
            </div>
            {t('dashboard.my_stores', 'متاجري')}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1 font-medium">
            {t('stores.desc', 'إدارة كافة متاجرك وفروعك من مكان واحد.')}
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900 dark:bg-amber-500 text-white dark:text-zinc-900 font-black rounded-2xl shadow-xl hover:opacity-90 transition-all active:scale-95 text-sm uppercase tracking-tight">
          <Plus size={20} />
          {t('stores.add_new', 'إنشاء متجر جديد')}
        </button>
      </div>

      {/* البحث */}
      <div className="relative max-w-md group">
        <Search className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} my-auto text-gray-400 group-focus-within:text-amber-500 transition-colors`} size={18} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('stores.search_placeholder', 'البحث عن متجر...')}
          className={`w-full ${isRtl ? 'pr-12 pl-12' : 'pl-12 pr-12'} py-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-amber-500/10 dark:focus:ring-amber-500/5 outline-none transition-all dark:text-white font-bold text-sm shadow-sm`}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery("")}
            className={`absolute inset-y-0 ${isRtl ? 'left-4' : 'right-4'} my-auto text-gray-400 hover:text-rose-500`}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* قائمة المتاجر */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStores.map((store) => (
          <div key={store.id} className="bg-white dark:bg-zinc-900 p-7 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex gap-5">
                <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-zinc-700 group-hover:bg-amber-50 dark:group-hover:bg-amber-500/10 group-hover:border-amber-100 dark:group-hover:border-amber-500/20 transition-all duration-300">
                  <Store className="text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400" size={30} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{store.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-bold mt-1.5 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-lg w-fit">
                    <Globe size={14} />
                    {store.domain}
                  </div>
                </div>
              </div>
              
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                store.status === 'active' 
                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-500/20' 
                : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100/50 dark:border-amber-500/20'
              }`}>
                <CircleDot size={12} className={store.status === 'active' ? 'animate-pulse' : ''} />
                {store.status === 'active' ? t('common.active', 'نشط') : t('common.maintenance', 'صيانة')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-50 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-400">
                <MapPin size={16} className="text-amber-500" />
                <span className="text-sm font-black">{store.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-400 justify-end">
                <LayoutGrid size={16} className="text-indigo-500" />
                <span className="text-sm font-black text-gray-900 dark:text-white">{store.orders} {t('dashboard.orders', 'طلب')}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6 relative z-10">
              <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 font-black rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all border border-transparent hover:border-gray-200 dark:hover:border-zinc-600">
                <Settings size={18} />
                {t('common.manage', 'إدارة المتجر')}
              </button>
              <button className="w-14 h-14 flex items-center justify-center border border-gray-100 dark:border-zinc-800 text-gray-400 dark:text-zinc-500 rounded-2xl hover:bg-white dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-lg transition-all">
                <ExternalLink size={20} />
              </button>
            </div>

            {/* تأثير خلفية ضوئي */}
            <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-[80px] opacity-20 transition-opacity group-hover:opacity-40 pointer-events-none ${
               store.status === 'active' ? 'bg-emerald-400 dark:bg-emerald-600' : 'bg-amber-400 dark:bg-amber-600'
            }`}></div>
          </div>
        ))}

        {/* بطاقة إضافة متجر جديد */}
        <button className="border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 text-gray-400 dark:text-zinc-500 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/5 transition-all group min-h-[280px]">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 dark:border-zinc-700 flex items-center justify-center group-hover:scale-110 group-hover:rotate-90 group-hover:border-solid group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
             <Plus size={32} />
          </div>
          <span className="font-black text-lg tracking-tight uppercase">{t('stores.add_new', 'إنشاء متجر جديد')}</span>
        </button>
      </div>

    </div>
  );
};

export default Stores;