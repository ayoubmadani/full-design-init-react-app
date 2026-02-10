import React, { useState } from 'react';
import {
  Plus, Trash2, Palette, Layers, Image as ImageIcon,
  X, Box, Settings2, Tag, Save, Sun, Moon
} from 'lucide-react';

const CreateProduct = () => {
  return (
    <BaseInfo />
  );
};

export default CreateProduct;

export function Option() {
  const [lang, setLang] = useState('ar');
  const [darkMode, setDarkMode] = useState(false);

  const t = {
    ar: {
      offers: "عروض الكميات والأجزاء",
      attributes: "خصائص إضافية",
      addBtn: "إضافة خاصية",
      saveBtn: "حفظ المنتج",
      colorImage: "لون / صورة",
      size: "المقاسات",
      text: "خيار نصي مخصص",
      offerLabel: "اسم العرض",
      priceLabel: "السعر (DA)",
      newOpt: "خيار جديد"
    },
    fr: {
      offers: "Offres et Bundles",
      attributes: "Attributs",
      addBtn: "Ajouter",
      saveBtn: "Enregistrer",
      colorImage: "Couleur / Image",
      size: "Tailles",
      text: "Option Textuelle",
      offerLabel: "Nom de l'offre",
      priceLabel: "Prix (DA)",
      newOpt: "Nouveau"
    }
  }[lang];

  const [offers, setOffers] = useState([{ id: 'off-1', title: 'قطعة واحدة', qtt: '1', price: '' }]); const [attributes, setAttributes] = useState([]);
  const [showAttrMenu, setShowAttrMenu] = useState(false);
  const addOffer = () => setOffers([...offers, { id: `off-${Date.now()}`, title: '', qtt: '', price: '' }]);


  const updateOffer = (id, field, value) =>
    setOffers(offers.map(o => o.id === id ? { ...o, [field]: value } : o));

  const addAttribute = (type) => {
    const names = { color: t.colorImage, size: t.size, text: t.text };
    setAttributes([...attributes, {
      id: `attr-${Date.now()}`,
      name: names[type],
      type: type,
      displayMode: 'color',
      options: [{ id: `opt-${Date.now()}`, value: '', colorCode: '#6366f1', img: null }]
    }]);
    setShowAttrMenu(false);
  };

  const updateOption = (attrId, optId, field, value) => {
    setAttributes(attributes.map(attr => attr.id === attrId ? {
      ...attr, options: attr.options.map(o => o.id === optId ? { ...o, [field]: value } : o)
    } : attr));
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-300`}>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen p-6 font-['Cairo', 'sans-serif']" dir={lang === 'ar' ? 'rtl' : 'ltr'}>

        {/* شريط تحكم علوي بسيط للتبديل بين الوضع الليلي واللغة */}
        <div className="max-w-4xl mx-auto flex justify-end gap-3 mb-6">
          <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:text-yellow-400 text-slate-600">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')} className="px-5 py-2 bg-white dark:bg-slate-800 dark:text-white rounded-2xl shadow-sm font-bold text-xs">
            {lang === 'ar' ? 'Français' : 'العربية'}
          </button>
        </div>

        <div className="max-w-4xl mx-auto space-y-10 pb-20">

          {/* Offers Section */}
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 dark:border-slate-700 bg-orange-50/50 dark:bg-orange-500/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-200"><Box size={20} /></div>
                <h3 className="font-black text-slate-800 dark:text-white">{t.offers}</h3>
              </div>
              <button onClick={addOffer} className="p-2.5 bg-white dark:bg-slate-700 text-orange-500 rounded-xl border border-orange-100 dark:border-slate-600 hover:bg-orange-600 hover:text-white transition-all shadow-sm">
                <Plus size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {offers.map(offer => (
                <div key={offer.id} className="flex flex-wrap md:flex-nowrap gap-4 p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">

                  {/* حقل اسم العرض */}
                  <div className="flex-[2]">
                    <label className="text-[10px] font-black text-slate-400 mr-2 mb-1 block uppercase">
                      {lang === 'ar' ? 'اسم العرض' : "Nom de l'offre"}
                    </label>
                    <input
                      value={offer.title}
                      onChange={(e) => updateOffer(offer.id, 'title', e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl font-bold text-sm dark:text-white outline-none focus:border-orange-300"
                    />
                  </div>

                  {/* حقل الكمية - الجديد */}
                  <div className="w-24">
                    <label className="text-[10px] font-black text-slate-400 mr-2 mb-1 block uppercase">
                      {lang === 'ar' ? 'الكمية' : "Quantité"}
                    </label>
                    <input
                      type="number"
                      placeholder="1"
                      value={offer.qtt}
                      onChange={(e) => updateOffer(offer.id, 'qtt', e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl font-black text-sm text-orange-600 outline-none focus:border-orange-300 text-center"
                    />
                  </div>

                  {/* حقل السعر */}
                  <div className="w-32">
                    <label className="text-[10px] font-black text-slate-400 mr-2 mb-1 block uppercase">
                      {t.priceLabel}
                    </label>
                    <input
                      type="number"
                      value={offer.price}
                      onChange={(e) => updateOffer(offer.id, 'price', e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl font-black text-sm text-emerald-600 outline-none focus:border-emerald-300"
                    />
                  </div>

                  <button
                    onClick={() => setOffers(offers.filter(o => o.id !== offer.id))}
                    className="mt-6 p-2 text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Attributes Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100"><Settings2 size={20} /></div>
                <h3 className="font-black text-slate-800 dark:text-white text-xl">{t.attributes}</h3>
              </div>
              <div className="relative">
                <button onClick={() => setShowAttrMenu(!showAttrMenu)} className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-xs hover:bg-indigo-700 transition-all shadow-xl">
                  <Plus size={16} /> {t.addBtn}
                </button>
                {showAttrMenu && (
                  <div className="absolute left-0 mt-3 w-56 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[1.5rem] shadow-2xl z-50 py-2">
                    {[
                      { id: 'color', label: t.colorImage, icon: <Palette size={14} />, col: 'text-purple-500' },
                      { id: 'size', label: t.size, icon: <Layers size={14} />, col: 'text-blue-500' },
                      { id: 'text', label: t.text, icon: <Tag size={14} />, col: 'text-emerald-500' }
                    ].map(item => (
                      <button key={item.id} onClick={() => addAttribute(item.id)} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-right border-b border-slate-50 dark:border-slate-700 last:border-0">
                        <span className={item.col}>{item.icon}</span>
                        <span className="text-xs font-black dark:text-slate-200">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {attributes.map(attr => (
                <div key={attr.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm p-6 relative animate-in slide-in-from-bottom-4 transition-all">
                  <button onClick={() => setAttributes(attributes.filter(a => a.id !== attr.id))} className="absolute top-6 left-6 p-2 text-slate-300 hover:text-rose-500 transition-colors"><X size={20} /></button>

                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 ${attr.type === 'color' ? 'text-purple-500' : 'text-blue-500'}`}>
                        {attr.type === 'color' ? <Palette size={20} /> : attr.type === 'text' ? <Tag size={20} /> : <Layers size={20} />}
                      </div>
                      {attr.type === 'text' ? (
                        <input value={attr.name} onChange={(e) => setAttributes(attributes.map(a => a.id === attr.id ? { ...a, name: e.target.value } : a))} className="text-lg font-black text-slate-800 dark:text-white outline-none bg-transparent border-b-2 border-indigo-500 w-48" />
                      ) : (
                        <span className="text-lg font-black text-slate-800 dark:text-white">{attr.name}</span>
                      )}
                    </div>

                    {attr.type === 'color' && (
                      <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                        <button
                          onClick={() => setAttributes(attributes.map(a => a.id === attr.id ? {
                            ...a,
                            displayMode: 'color',
                            options: [{ id: `opt-${Date.now()}`, value: '', colorCode: '#6366f1', img: null }]
                          } : a))}
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-black text-[10px] transition-all ${attr.displayMode === 'color' ? 'bg-white dark:bg-slate-700 text-purple-600 shadow-sm' : 'text-slate-400'}`}
                        >
                          <Palette size={12} /> لون
                        </button>

                        <button
                          onClick={() => setAttributes(attributes.map(a => a.id === attr.id ? {
                            ...a,
                            displayMode: 'image',
                            options: [{ id: `opt-${Date.now()}`, value: '', colorCode: '#6366f1', img: null }]
                          } : a))}
                          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-black text-[10px] transition-all ${attr.displayMode === 'image' ? 'bg-white dark:bg-slate-700 text-rose-500 shadow-sm' : 'text-slate-400'}`}
                        >
                          <ImageIcon size={12} /> صورة
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {attr.options.map(opt => (
                      <div key={opt.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 group">
                        {attr.type === 'color' && (
                          <div className="w-10 h-10 shrink-0 relative">
                            {attr.displayMode === 'image' ? (
                              <div className="w-full h-full rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center bg-white dark:bg-slate-800 overflow-hidden">
                                {opt.img ? <img src={opt.img} className="w-full h-full object-cover" /> : <Plus size={12} className="text-slate-400" />}
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                                  const reader = new FileReader();
                                  reader.onload = (r) => updateOption(attr.id, opt.id, 'img', r.target.result);
                                  reader.readAsDataURL(e.target.files[0]);
                                }} />
                              </div>
                            ) : (
                              <div className="w-full h-full rounded-xl border-2 border-white dark:border-slate-700 shadow-sm overflow-hidden relative">
                                <input type="color" value={opt.colorCode} onChange={(e) => updateOption(attr.id, opt.id, 'colorCode', e.target.value)} className="absolute inset-0 scale-[4] cursor-pointer" />
                              </div>
                            )}
                          </div>
                        )}

                        <input
                          placeholder={attr.type === 'color' ? (attr.displayMode === 'image' ? "وصف الصورة" : "اسم اللون") : "قيمة الخيار"}
                          value={opt.value}
                          onChange={(e) => updateOption(attr.id, opt.id, 'value', e.target.value)}
                          className="flex-1 bg-transparent dark:text-white font-bold text-sm outline-none px-2"
                        />

                        <button onClick={() => setAttributes(attributes.map(a => a.id === attr.id ? { ...a, options: a.options.filter(o => o.id !== opt.id) } : a))} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 transition-all p-2">
                          <X size={16} />
                        </button>
                      </div>
                    ))}

                    <button onClick={() => setAttributes(attributes.map(a => a.id === attr.id ? { ...a, options: [...a.options, { id: Date.now(), value: '', colorCode: '#6366f1', img: null }] } : a))} className="flex items-center justify-center p-3 border-2 border-dashed border-slate-100 dark:border-slate-700 rounded-2xl text-slate-400 font-black text-[10px] hover:bg-slate-50 dark:hover:bg-slate-900 transition-all uppercase tracking-widest">
                      + {t.newOpt}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button className="flex items-center gap-3 px-12 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black shadow-2xl transition-all active:scale-95">
              <Save size={20} /> {t.saveBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { 
  Package, 
  FileText,  
  DollarSign, 
} from 'lucide-react';

export function BaseInfo() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* قسم رفع الصور - Gallery */}
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-100">
            <ImageIcon size={20} />
          </div>
          <h3 className="font-black text-slate-800 dark:text-white">صور المنتج</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative aspect-square rounded-[2rem] overflow-hidden group border-2 border-slate-50 dark:border-slate-700">
              <img src={img} alt="" className="w-full h-full object-cover" />
              <button 
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          
          <label className="aspect-square rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-slate-400">
            <Plus size={24} />
            <span className="text-[10px] font-black uppercase tracking-widest">إضافة صورة</span>
            <input type="file" multiple className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
      </div>

      {/* البيانات النصية */}
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm p-8 space-y-6">
        
        {/* اسم المنتج */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase mr-2">
            <Package size={14} /> اسم المنتج
          </label>
          <input 
            type="text" 
            placeholder="أدخل اسم المنتج هنا..."
            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* وصف المنتج */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase mr-2">
            <FileText size={14} /> وصف مختصر
          </label>
          <textarea 
            rows="4"
            placeholder="اكتب وصفاً جذاباً لمنتجك..."
            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-3xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
          ></textarea>
        </div>

        {/* السعر الأساسي */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase mr-2">
              <DollarSign size={14} /> السعر الافتراضي
            </label>
            <div className="relative">
              <input 
                type="number" 
                placeholder="0.00"
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl font-black text-emerald-600 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">DA</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase mr-2">
              السعر قبل التخفيض (اختياري)
            </label>
            <div className="relative">
              <input 
                type="number" 
                placeholder="0.00"
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl font-bold text-slate-400 line-through outline-none"
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs">DA</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}