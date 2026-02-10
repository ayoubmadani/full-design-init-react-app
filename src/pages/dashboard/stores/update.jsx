import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import {  
  ArrowRight, Store, Upload, Save, Eye, Globe,
  Image as ImageIcon, Palette, LayoutGrid, 
  Check, Shirt, Smartphone, Home, Sparkles,
  Info, MapPin, BadgeCheck, Trash2, MoveRight, 
  Plus, Type, Settings, ExternalLink, Copy,
  CheckCircle, AlertCircle
} from 'lucide-react';

const Update = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const isRtl = i18n.language === 'ar';

  // States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  
  // Store Data States
  const [storeData, setStoreData] = useState({
    name: '',
    domain: '',
    location: 'Algiers',
    primaryColor: '#6366f1',
    niche: 'fashion',
    logo: null,
    heroImage: null,
    heroTitle: 'Your Cozy Era',
    heroSubtitle: 'Get peak comfy-chic with new winter essentials.',
    showTopBar: true,
    topBarText: 'شحن مجاني للطلبات أكثر من 5000 دج 🎉',
    status: 'active'
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState(null);

  const niches = [
    { id: 'fashion', label: 'الموضة والأزياء', icon: <Shirt size={20} />, description: 'مثل متجر Everlane' },
    { id: 'electronics', label: 'الإلكترونيات', icon: <Smartphone size={20} />, description: 'أدوات وتقنيات' },
    { id: 'home', label: 'المنزل والديكور', icon: <Home size={20} />, description: 'أثاث ومستلزمات' },
    { id: 'beauty', label: 'الجمال', icon: <Sparkles size={20} />, description: 'عناية ومكياج' },
  ];

  // Simulate fetching store data
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/stores/${id}`);
        // const data = await response.json();
        
        // Simulated data
        setTimeout(() => {
          setStoreData({
            name: 'متجر إيفرلين',
            domain: 'everlane-clone',
            location: 'Algiers',
            primaryColor: '#6366f1',
            niche: 'fashion',
            logo: null,
            heroImage: null,
            heroTitle: 'Your Cozy Era',
            heroSubtitle: 'Get peak comfy-chic with new winter essentials.',
            showTopBar: true,
            topBarText: 'شحن مجاني للطلبات أكثر من 5000 دج 🎉',
            status: 'active'
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching store:', error);
        showNotification('error', 'فشل في تحميل بيانات المتجر');
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [id]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 3000);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setStoreData({ ...storeData, logo: file });
    }
  };

  const handleHeroImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroImagePreview(URL.createObjectURL(file));
      setStoreData({ ...storeData, heroImage: file });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // Object.keys(storeData).forEach(key => {
      //   formData.append(key, storeData[key]);
      // });
      // await fetch(`/api/stores/${id}`, {
      //   method: 'PUT',
      //   body: formData
      // });

      setTimeout(() => {
        setSaving(false);
        showNotification('success', 'تم حفظ التغييرات بنجاح! ✅');
      }, 1500);
    } catch (error) {
      console.error('Error saving store:', error);
      setSaving(false);
      showNotification('error', 'فشل في حفظ التغييرات');
    }
  };

  const copyStoreLink = () => {
    const link = `https://${storeData.domain}.mdstore.dz`;
    navigator.clipboard.writeText(link);
    showNotification('success', 'تم نسخ رابط المتجر! 📋');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 dark:text-zinc-400 font-bold">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 px-4">
      
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300 ${
          notification.type === 'success' 
            ? 'bg-emerald-500 text-white' 
            : 'bg-rose-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold text-sm">{notification.message}</span>
        </div>
      )}

      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/stores')} 
            className="p-2.5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl hover:scale-105 transition-all shadow-sm"
          >
            <ArrowRight className={isRtl ? '' : 'rotate-180'} size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
              <Settings size={24} className="text-indigo-500" />
              إدارة المتجر
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">
              {storeData.name || 'متجر جديد'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Store Link */}
          <button
            onClick={copyStoreLink}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded-xl font-bold text-sm hover:scale-105 transition-all border border-gray-200 dark:border-zinc-700"
          >
            <Copy size={16} />
            نسخ الرابط
          </button>

          {/* Visit Store */}
          <a
            href={`https://${storeData.domain}.mdstore.dz`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-xl font-bold text-sm hover:scale-105 transition-all border border-gray-200 dark:border-zinc-800 shadow-sm"
          >
            <ExternalLink size={16} />
            زيارة المتجر
          </a>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save size={16} />
                حفظ التغييرات
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Store Status Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-[2.5rem] text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-90 mb-1">حالة المتجر</p>
                <h3 className="text-2xl font-black">{storeData.status === 'active' ? 'نشط ✅' : 'غير نشط'}</h3>
              </div>
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Globe size={32} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-xs opacity-90 font-medium">
                رابط المتجر: <span className="font-black">{storeData.domain}.mdstore.dz</span>
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 text-lg">
                <Store size={22} className="text-amber-500" />
                المعلومات الأساسية
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Store Name */}
              <div className="space-y-2 group">
                <label className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
                  اسم المتجر
                </label>
                <input 
                  type="text"
                  value={storeData.name}
                  onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-amber-500/10 outline-none transition-all dark:text-white font-bold"
                />
              </div>

              {/* Domain */}
              <div className="space-y-2 group">
                <label className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
                  رابط المتجر (Subdomain)
                </label>
                <div className="relative flex items-center">
                  <input 
                    type="text"
                    value={storeData.domain}
                    onChange={(e) => setStoreData({...storeData, domain: e.target.value})}
                    className={`w-full ${isRtl ? 'pl-28' : 'pr-28'} px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white font-mono font-bold text-sm`}
                  />
                  <span className={`absolute ${isRtl ? 'left-4' : 'right-4'} text-xs font-black text-indigo-500/60 uppercase tracking-tight`}>
                    .mdstore.dz
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={14} className="text-rose-500" />
                  مقر العمل
                </label>
                <select 
                  value={storeData.location}
                  onChange={(e) => setStoreData({...storeData, location: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-rose-500/10 outline-none transition-all dark:text-white font-bold appearance-none cursor-pointer"
                >
                  <option value="Algiers">الجزائر العاصمة</option>
                  <option value="Oran">وهران</option>
                  <option value="Setif">سطيف</option>
                  <option value="International">شحن دولي</option>
                </select>
              </div>
            </div>
          </div>

          {/* Branding & Design */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8">
            <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
              <ImageIcon size={20} className="text-indigo-500" />
              العلامة التجارية (Branding)
            </h3>

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Logo Upload */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-3xl border-2 border-dashed border-gray-200 dark:border-zinc-700 flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-800/50 hover:border-indigo-500 transition-all overflow-hidden shadow-inner">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-4" />
                  ) : (
                    <>
                      <Upload className="text-gray-300 group-hover:text-indigo-500 mb-2" size={32} />
                      <span className="text-[10px] font-black text-gray-400 uppercase">رفع الشعار</span>
                    </>
                  )}
                </div>
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleLogoChange} />
              </div>

              {/* Color Palette */}
              <div className="flex-1 space-y-6 w-full">
                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-700 dark:text-zinc-300 flex items-center gap-2">
                    <Palette size={16} className="text-rose-500" />
                    اللون الأساسي للمتجر
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {['#000000', '#6366f1', '#10b981', '#f43f5e', '#f59e0b'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setStoreData({...storeData, primaryColor: color})}
                        className={`w-10 h-10 rounded-full border-4 transition-all ${storeData.primaryColor === color ? 'border-indigo-200 scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                        style={{ backgroundColor: color }}
                      >
                        {storeData.primaryColor === color && <Check size={16} className="text-white mx-auto" />}
                      </button>
                    ))}
                    <input 
                      type="color" 
                      value={storeData.primaryColor}
                      className="w-10 h-10 rounded-full overflow-hidden border-none cursor-pointer hover:scale-110 transition-transform"
                      onChange={(e) => setStoreData({...storeData, primaryColor: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Niche Selection */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6">
            <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
              <LayoutGrid size={20} className="text-amber-500" />
              تخصص المتجر (Niche)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {niches.map((niche) => (
                <button
                  key={niche.id}
                  onClick={() => setStoreData({...storeData, niche: niche.id})}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-right ${
                    storeData.niche === niche.id 
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10' 
                    : 'border-gray-50 dark:border-zinc-800 hover:border-gray-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${storeData.niche === niche.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-400'}`}>
                    {niche.icon}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 dark:text-white text-sm">{niche.label}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{niche.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8">
            <h3 className="font-black text-gray-900 dark:text-white flex items-center gap-2 text-lg">
              <ImageIcon size={22} className="text-rose-500" />
              واجهة المتجر الرئيسية (Hero Slider)
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Controls */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Type size={14} /> العنوان الرئيسي
                    </label>
                    <input 
                      type="text" 
                      value={storeData.heroTitle}
                      onChange={(e) => setStoreData({...storeData, heroTitle: e.target.value})}
                      className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-800 rounded-xl outline-none dark:text-white font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      وصف العرض
                    </label>
                    <textarea 
                      rows={2}
                      value={storeData.heroSubtitle}
                      onChange={(e) => setStoreData({...storeData, heroSubtitle: e.target.value})}
                      className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-800 rounded-xl outline-none dark:text-white font-medium text-sm"
                    />
                  </div>
                </div>

                {/* TopBar Toggle */}
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-gray-600 dark:text-zinc-300 flex items-center gap-2">
                      <LayoutGrid size={14} className="text-indigo-500" />
                      شريط الإعلانات العلوي
                    </label>
                    <button
                      onClick={() => setStoreData({...storeData, showTopBar: !storeData.showTopBar})}
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        storeData.showTopBar ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-zinc-700'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                          storeData.showTopBar ? 'right-0.5' : 'right-6'
                        }`}
                      />
                    </button>
                  </div>
                  
                  {storeData.showTopBar && (
                    <div className="space-y-2 animate-in fade-in duration-300">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        نص الإعلان
                      </label>
                      <input 
                        type="text" 
                        value={storeData.topBarText}
                        onChange={(e) => setStoreData({...storeData, topBarText: e.target.value})}
                        placeholder="مثال: شحن مجاني للطلبات أكثر من 5000 دج"
                        className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none dark:text-white font-medium text-sm focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                  )}
                </div>

                {/* Image Upload */}
                <div className="relative group">
                  <input type="file" accept="image/*" onChange={handleHeroImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className="py-8 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-rose-400 transition-colors bg-gray-50/50 dark:bg-zinc-800/30">
                    <Plus className="text-gray-400 group-hover:text-rose-500" />
                    <span className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase">اضغط لرفع صورة الواجهة</span>
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-2xl">
                {heroImagePreview ? (
                  <img src={heroImagePreview} className="w-full h-full object-cover" alt="Hero" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800">
                    <ImageIcon size={48} className="text-zinc-400 opacity-20" />
                  </div>
                )}
                
                {/* TopBar */}
                {storeData.showTopBar && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 py-2 px-4 flex items-center justify-center z-20">
                    <span className="text-white text-[8px] font-bold text-center tracking-wide">{storeData.topBarText}</span>
                  </div>
                )}

                {/* Hero Content */}
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-6">
                  <h4 className="text-white text-xl md:text-2xl font-black mb-2 drop-shadow-lg">{storeData.heroTitle}</h4>
                  <p className="text-white/90 text-[10px] md:text-xs mb-6 max-w-[250px] font-medium leading-relaxed uppercase tracking-widest">
                    {storeData.heroSubtitle}
                  </p>
                  <button 
                    className="px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-white transition-transform active:scale-95 shadow-lg flex items-center gap-2"
                    style={{ backgroundColor: storeData.primaryColor }}
                  >
                    Shop Now <MoveRight size={14} />
                  </button>
                </div>

                {heroImagePreview && (
                  <button 
                    onClick={() => {
                      setHeroImagePreview(null);
                      setStoreData({...storeData, heroImage: null});
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-rose-500 transition-colors z-30"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Sidebar: Live Preview */}
        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-[2.5rem] text-white shadow-2xl sticky top-8 border-4 border-zinc-800">
            <div className="flex justify-between items-center mb-6">
              <div className="w-16 h-4 bg-zinc-800 rounded-full"></div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Header Preview */}
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                {logoPreview ? (
                  <img src={logoPreview} className="h-4 w-auto object-contain" alt="preview" />
                ) : (
                  <span className="font-black text-[10px] tracking-widest uppercase">LOGO</span>
                )}
                <div className="flex gap-2">
                  <div className="w-4 h-1 bg-white/20 rounded-full"></div>
                  <div className="w-4 h-1 bg-white/20 rounded-full"></div>
                </div>
              </div>

              {/* Banner Preview */}
              <div className="aspect-video bg-zinc-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10 p-2">
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] mb-1">{storeData.heroTitle}</p>
                  <button 
                    className="px-4 py-1.5 rounded text-[8px] font-black uppercase transition-all"
                    style={{ backgroundColor: storeData.primaryColor }}
                  >
                    Shop Now
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-1">
                    <div className="aspect-square bg-zinc-800 rounded-lg"></div>
                    <div className="h-1 w-2/3 bg-zinc-700 mx-auto rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <a
                href={`https://${storeData.domain}.mdstore.dz`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                style={{ backgroundColor: storeData.primaryColor }}
              >
                <Eye size={16} />
                معاينة المتجر
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Update;