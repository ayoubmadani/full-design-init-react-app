import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, Store, Upload, Save, 
  Image as ImageIcon, Palette, LayoutGrid, 
  Check, Shirt, Smartphone, Home, Sparkles,
  Info, MapPin, BadgeCheck, Trash2, MoveRight, 
  Plus, Type, CheckCircle, AlertCircle, Loader2,
  Zap, Globe, Rocket
} from 'lucide-react';

const CreateStore = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.dir() === 'rtl';

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: '',
    domain: '',
    location: 'Algiers',
    phone: '',
    email: '',
    address: '',
    description: '',
    
    // Step 2: Branding
    logo: null,
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    niche: 'fashion',
    
    // Step 3: Hero Section
    heroImage: null,
    heroTitle: t('hero.defaultTitle', { defaultValue: 'Your Cozy Era' }),
    heroSubtitle: t('hero.defaultSubtitle', { defaultValue: 'Get peak comfy-chic with new winter essentials.' }),
    showTopBar: true,
    topBarText: t('hero.defaultTopBar', { defaultValue: 'شحن مجاني للطلبات أكثر من 5000 دج 🎉' }),
    topBarColor: '#6366f1',
    
    // Step 4: Business Settings
    currency: 'DZD',
    language: 'ar',
    shippingFee: 0,
    freeShippingThreshold: 5000,
    cashOnDelivery: true,
    onlinePayment: false,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const niches = [
    { id: 'fashion', label: t('niches.fashion'), icon: <Shirt size={20} />, description: t('niches.fashionDesc') },
    { id: 'electronics', label: t('niches.electronics'), icon: <Smartphone size={20} />, description: t('niches.electronicsDesc') },
    { id: 'home', label: t('niches.home'), icon: <Home size={20} />, description: t('niches.homeDesc') },
    { id: 'beauty', label: t('niches.beauty'), icon: <Sparkles size={20} />, description: t('niches.beautyDesc') },
  ];

  const locations = [
    { value: 'Algiers', label: t('locations.algiers') },
    { value: 'Oran', label: t('locations.oran') },
    { value: 'Constantine', label: t('locations.constantine') },
    { value: 'Setif', label: t('locations.setif') },
    { value: 'Annaba', label: t('locations.annaba') },
    { value: 'Blida', label: t('locations.blida') },
    { value: 'Batna', label: t('locations.batna') },
    { value: 'Tlemcen', label: t('locations.tlemcen') },
    { value: 'International', label: t('locations.international') },
  ];

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 3000);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showNotification('error', t('validation.logoSize'));
        return;
      }
      setLogoPreview(URL.createObjectURL(file));
      setFormData({ ...formData, logo: file });
    }
  };

  const handleHeroImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showNotification('error', t('validation.heroSize'));
        return;
      }
      setHeroImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, heroImage: file });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = t('validation.nameRequired');
      if (formData.name.length < 2) newErrors.name = t('validation.nameLength');
      
      if (!formData.domain.trim()) newErrors.domain = t('validation.domainRequired');
      if (!/^[a-z0-9-]+$/.test(formData.domain)) {
        newErrors.domain = t('validation.domainFormat');
      }
      
      if (formData.phone && !/^(0)(5|6|7)[0-9]{8}$/.test(formData.phone)) {
        newErrors.phone = t('validation.phoneInvalid');
      }
      
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('validation.emailInvalid');
      }
    }
    
    if (step === 2) {
      if (!formData.niche) newErrors.niche = t('validation.nicheRequired');
    }
    
    if (step === 3) {
      if (!formData.heroTitle.trim()) newErrors.heroTitle = t('validation.heroTitleRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      showNotification('error', t('validation.fixErrors'));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      showNotification('error', t('validation.fixErrors'));
      return;
    }

    setLoading(true);
    
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      showNotification('success', t('notifications.createSuccess'));
      
      setTimeout(() => {
        navigate('/dashboard/stores');
      }, 1500);
    } catch (error) {
      console.error('Error creating store:', error);
      showNotification('error', t('notifications.createError'));
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-black text-sm transition-all ${
            step < currentStep ? 'bg-emerald-500 text-white' :
            step === currentStep ? 'bg-indigo-600 text-white ring-4 ring-indigo-200 dark:ring-indigo-500/30' :
            'bg-gray-200 dark:bg-zinc-800 text-gray-400'
          }`}>
            {step < currentStep ? <Check size={18} /> : step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-1 rounded-full transition-all ${
              step < currentStep ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-zinc-800'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Store size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">{t('steps.basicInfo.title')}</h3>
            <p className="text-sm opacity-90">{t('steps.basicInfo.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Store Name */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
              {t('fields.storeName')} *
            </label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder={t('placeholders.storeName')}
              className={`w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border ${
                errors.name ? 'border-rose-500' : 'border-gray-100 dark:border-zinc-800'
              } rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white font-bold`}
            />
            {errors.name && <p className="text-xs text-rose-500 font-bold">{errors.name}</p>}
          </div>

          {/* Domain */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
              {t('fields.domain')} *
            </label>
            <div className="relative flex items-center">
              <input 
                type="text"
                value={formData.domain}
                onChange={(e) => setFormData({...formData, domain: e.target.value.toLowerCase()})}
                placeholder={t('placeholders.domain')}
                className={`w-full ${isRtl ? 'pl-32' : 'pr-32'} px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border ${
                  errors.domain ? 'border-rose-500' : 'border-gray-100 dark:border-zinc-800'
                } rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white font-mono font-bold text-sm`}
              />
              <span className={`absolute ${isRtl ? 'left-4' : 'right-4'} text-xs font-black text-indigo-500/60 uppercase`}>
                .mdstore.dz
              </span>
            </div>
            {errors.domain && <p className="text-xs text-rose-500 font-bold">{errors.domain}</p>}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <MapPin size={14} className="text-rose-500" />
              {t('fields.location')} *
            </label>
            <select 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-rose-500/10 outline-none transition-all dark:text-white font-bold appearance-none cursor-pointer"
            >
              {locations.map(loc => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
              {t('fields.phone')}
            </label>
            <input 
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder={t('placeholders.phone')}
              className={`w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border ${
                errors.phone ? 'border-rose-500' : 'border-gray-100 dark:border-zinc-800'
              } rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white font-bold`}
            />
            {errors.phone && <p className="text-xs text-rose-500 font-bold">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
              {t('fields.email')}
            </label>
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder={t('placeholders.email')}
              className={`w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border ${
                errors.email ? 'border-rose-500' : 'border-gray-100 dark:border-zinc-800'
              } rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white font-bold`}
            />
            {errors.email && <p className="text-xs text-rose-500 font-bold">{errors.email}</p>}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
              {t('fields.address')}
            </label>
            <input 
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder={t('placeholders.address')}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white font-bold"
            />
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
              {t('fields.description')}
            </label>
            <textarea 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder={t('placeholders.description')}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white font-medium resize-none"
            />
          </div>

        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-3xl text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Palette size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">{t('steps.branding.title')}</h3>
            <p className="text-sm opacity-90">{t('steps.branding.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8">
        
        {/* Logo & Colors */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          {/* Logo Upload */}
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-700 dark:text-zinc-300">{t('fields.logo')}</label>
            <div className="relative group">
              <div className="w-48 h-48 rounded-3xl border-2 border-dashed border-gray-200 dark:border-zinc-700 flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-800/50 hover:border-indigo-500 transition-all overflow-hidden shadow-inner cursor-pointer">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-6" />
                ) : (
                  <>
                    <Upload className="text-gray-300 group-hover:text-indigo-500 mb-3" size={40} />
                    <span className="text-xs font-black text-gray-400 uppercase text-center px-4">
                      {t('upload.logoClick')}<br/>({t('upload.maxSize', { size: '2MB' })})
                    </span>
                  </>
                )}
              </div>
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleLogoChange} />
              {logoPreview && (
                <button 
                  onClick={() => {
                    setLogoPreview(null);
                    setFormData({...formData, logo: null});
                  }}
                  className="absolute -top-2 -right-2 p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-lg"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Colors */}
          <div className="flex-1 space-y-6 w-full">
            <div className="space-y-3">
              <label className="text-sm font-black text-gray-700 dark:text-zinc-300 flex items-center gap-2">
                <Palette size={16} className="text-rose-500" />
                {t('fields.primaryColor')}
              </label>
              <div className="flex flex-wrap gap-3">
                {['#000000', '#6366f1', '#8b5cf6', '#10b981', '#f43f5e', '#f59e0b', '#06b6d4'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setFormData({...formData, primaryColor: color})}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      formData.primaryColor === color ? 'border-indigo-200 scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {formData.primaryColor === color && <Check size={18} className="text-white mx-auto" />}
                  </button>
                ))}
                <input 
                  type="color" 
                  value={formData.primaryColor}
                  className="w-12 h-12 rounded-full overflow-hidden border-none cursor-pointer hover:scale-110 transition-transform"
                  onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-gray-700 dark:text-zinc-300 flex items-center gap-2">
                <Palette size={16} className="text-purple-500" />
                {t('fields.secondaryColor')}
              </label>
              <div className="flex flex-wrap gap-3">
                {['#8b5cf6', '#ec4899', '#f59e0b', '#14b8a6', '#6366f1'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setFormData({...formData, secondaryColor: color})}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      formData.secondaryColor === color ? 'border-purple-200 scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {formData.secondaryColor === color && <Check size={18} className="text-white mx-auto" />}
                  </button>
                ))}
                <input 
                  type="color" 
                  value={formData.secondaryColor}
                  className="w-12 h-12 rounded-full overflow-hidden border-none cursor-pointer hover:scale-110 transition-transform"
                  onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Niche Selection */}
        <div className="space-y-4">
          <label className="text-sm font-black text-gray-700 dark:text-zinc-300 flex items-center gap-2">
            <LayoutGrid size={16} className="text-amber-500" />
            {t('fields.niche')} *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {niches.map((niche) => (
              <button
                key={niche.id}
                onClick={() => setFormData({...formData, niche: niche.id})}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-right ${
                  formData.niche === niche.id 
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 shadow-lg' 
                  : 'border-gray-100 dark:border-zinc-800 hover:border-indigo-200'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                  formData.niche === niche.id ? 'bg-indigo-600 text-white scale-110' : 'bg-gray-100 dark:bg-zinc-800 text-gray-400'
                }`}>
                  {niche.icon}
                </div>
                <div>
                  <p className="font-black text-gray-900 dark:text-white text-sm">{niche.label}</p>
                  <p className="text-xs text-gray-400 font-bold">{niche.description}</p>
                </div>
                {formData.niche === niche.id && (
                  <CheckCircle size={20} className="text-indigo-600 dark:text-indigo-400 ml-auto" />
                )}
              </button>
            ))}
          </div>
          {errors.niche && <p className="text-xs text-rose-500 font-bold">{errors.niche}</p>}
        </div>

      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-rose-500 to-orange-600 p-6 rounded-3xl text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <ImageIcon size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">{t('steps.hero.title')}</h3>
            <p className="text-sm opacity-90">{t('steps.hero.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Controls */}
          <div className="space-y-6">
            
            {/* Hero Texts */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Type size={14} /> {t('fields.heroTitle')} *
                </label>
                <input 
                  type="text" 
                  value={formData.heroTitle}
                  onChange={(e) => setFormData({...formData, heroTitle: e.target.value})}
                  placeholder={t('placeholders.heroTitle')}
                  className={`w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800 border ${
                    errors.heroTitle ? 'border-rose-500' : 'border-gray-100 dark:border-zinc-800'
                  } rounded-xl outline-none dark:text-white font-bold`}
                />
                {errors.heroTitle && <p className="text-xs text-rose-500 font-bold">{errors.heroTitle}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  {t('fields.heroSubtitle')}
                </label>
                <textarea 
                  rows={2}
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({...formData, heroSubtitle: e.target.value})}
                  placeholder={t('placeholders.heroSubtitle')}
                  className="w-full px-5 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-800 rounded-xl outline-none dark:text-white font-medium text-sm resize-none"
                />
              </div>
            </div>

            {/* TopBar Settings */}
            <div className="space-y-3 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
              <div className="flex items-center justify-between">
                <label className="text-sm font-black text-gray-700 dark:text-zinc-300 flex items-center gap-2">
                  <LayoutGrid size={16} className="text-indigo-500" />
                  {t('fields.topBar')}
                </label>
                <button
                  onClick={() => setFormData({...formData, showTopBar: !formData.showTopBar})}
                  className={`relative w-14 h-7 rounded-full transition-all ${
                    formData.showTopBar ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-zinc-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      formData.showTopBar ? (isRtl ? 'left-1' : 'right-1') : (isRtl ? 'right-1' : 'left-1')
                    }`}
                  />
                </button>
              </div>
              
              {formData.showTopBar && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <input 
                    type="text" 
                    value={formData.topBarText}
                    onChange={(e) => setFormData({...formData, topBarText: e.target.value})}
                    placeholder={t('placeholders.topBar')}
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-500/30 rounded-xl outline-none dark:text-white font-medium text-sm focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="relative group">
              <input type="file" accept="image/*" onChange={handleHeroImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <div className="py-10 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-3 group-hover:border-rose-400 transition-colors bg-gray-50/50 dark:bg-zinc-800/30">
                <div className="p-4 bg-rose-50 dark:bg-rose-500/10 rounded-2xl">
                  <Plus className="text-rose-500" size={24} />
                </div>
                <div className="text-center">
                  <span className="text-sm font-black text-gray-700 dark:text-zinc-300 block mb-1">{t('upload.heroImage')}</span>
                  <span className="text-xs text-gray-400">{t('upload.maxSize', { size: '5MB' })}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Live Preview */}
          <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-2xl">
            {heroImagePreview ? (
              <img src={heroImagePreview} className="w-full h-full object-cover" alt="Hero" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900">
                <ImageIcon size={64} className="text-zinc-400 opacity-20" />
              </div>
            )}
            
            {/* TopBar */}
            {formData.showTopBar && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 py-2.5 px-4 flex items-center justify-center z-20">
                <span className="text-white text-[9px] font-bold text-center tracking-wide">{formData.topBarText}</span>
              </div>
            )}

            {/* Hero Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-center text-center p-8">
              <h4 className="text-white text-2xl md:text-3xl font-black mb-3 drop-shadow-2xl">{formData.heroTitle}</h4>
              <p className="text-white/95 text-xs md:text-sm mb-8 max-w-[280px] font-medium leading-relaxed">
                {formData.heroSubtitle}
              </p>
              <button 
                className="px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider text-white transition-all hover:scale-105 shadow-2xl"
                style={{ backgroundColor: formData.primaryColor }}
              >
                {t('preview.shopNow')}
              </button>
            </div>

            {heroImagePreview && (
              <button 
                onClick={() => {
                  setHeroImagePreview(null);
                  setFormData({...formData, heroImage: null});
                }}
                className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-rose-500 transition-colors z-30 shadow-lg"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-3xl text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">{t('steps.business.title')}</h3>
            <p className="text-sm opacity-90">{t('steps.business.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Shipping Fee */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
              {t('fields.shippingFee')} ({t('currency.dzd')})
            </label>
            <input 
              type="number"
              min="0"
              value={formData.shippingFee}
              onChange={(e) => setFormData({...formData, shippingFee: parseFloat(e.target.value) || 0})}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all dark:text-white font-bold"
            />
          </div>

          {/* Free Shipping Threshold */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 dark:text-zinc-400 uppercase tracking-widest">
              {t('fields.freeShippingThreshold')} ({t('currency.dzd')})
            </label>
            <input 
              type="number"
              min="0"
              value={formData.freeShippingThreshold}
              onChange={(e) => setFormData({...formData, freeShippingThreshold: parseFloat(e.target.value) || 0})}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all dark:text-white font-bold"
            />
          </div>

          {/* Payment Methods */}
          <div className="md:col-span-2 space-y-4">
            <label className="text-sm font-black text-gray-700 dark:text-zinc-300">{t('fields.paymentMethods')}</label>
            
            <div className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl">
              <input 
                type="checkbox"
                checked={formData.cashOnDelivery}
                onChange={(e) => setFormData({...formData, cashOnDelivery: e.target.checked})}
                className="w-5 h-5 rounded accent-emerald-500"
              />
              <div>
                <p className="font-black text-gray-900 dark:text-white">{t('payment.cashOnDelivery')}</p>
                <p className="text-xs text-gray-500 dark:text-zinc-400">{t('payment.cashOnDeliveryDesc')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl">
              <input 
                type="checkbox"
                checked={formData.onlinePayment}
                onChange={(e) => setFormData({...formData, onlinePayment: e.target.checked})}
                className="w-5 h-5 rounded accent-indigo-500"
              />
              <div>
                <p className="font-black text-gray-900 dark:text-white">{t('payment.onlinePayment')}</p>
                <p className="text-xs text-gray-500 dark:text-zinc-400">{t('payment.onlinePaymentDesc')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/5 dark:to-purple-500/5 p-8 rounded-3xl border-2 border-indigo-200 dark:border-indigo-500/20">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-indigo-500 rounded-2xl">
            <Rocket size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">{t('summary.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-zinc-400 font-medium">
              {t('summary.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl">
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-bold mb-1">{t('summary.storeName')}</p>
            <p className="font-black text-gray-900 dark:text-white truncate">{formData.name || '-'}</p>
          </div>
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl">
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-bold mb-1">{t('summary.domain')}</p>
            <p className="font-black text-indigo-600 dark:text-indigo-400 truncate">{formData.domain || '-'}.mdstore.dz</p>
          </div>
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl">
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-bold mb-1">{t('summary.niche')}</p>
            <p className="font-black text-gray-900 dark:text-white">{niches.find(n => n.id === formData.niche)?.label || '-'}</p>
          </div>
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl">
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-bold mb-1">{t('summary.location')}</p>
            <p className="font-black text-gray-900 dark:text-white">{locations.find(l => l.value === formData.location)?.label || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 px-4">
      
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

      {/* Header */}
      <div className="flex items-center gap-4 pb-2">
        <button 
          onClick={() => navigate('/dashboard/stores')} 
          className="p-2.5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl hover:scale-105 transition-all shadow-sm"
        >
          <ArrowRight className={isRtl ? '' : 'rotate-180'} size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Rocket size={24} className="text-indigo-500" />
            {t('header.title')}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">{t('header.step', { current: currentStep, total: totalSteps })}</p>
        </div>
      </div>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Step Content */}
      <div className="min-h-[500px]">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl font-bold text-sm hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <ArrowRight className={isRtl ? '' : 'rotate-180'} size={18} />
          {t('buttons.previous')}
        </button>

        {currentStep < totalSteps ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg hover:scale-105"
          >
            {t('buttons.next')}
            <ArrowLeft className={isRtl ? '' : 'rotate-180'} size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-black text-sm hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {t('buttons.creating')}
              </>
            ) : (
              <>
                <Save size={18} />
                {t('buttons.createStore')}
              </>
            )}
          </button>
        )}
      </div>

    </div>
  );
};

export default CreateStore;