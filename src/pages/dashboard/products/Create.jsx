import React, { useState, Fragment, useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Info, Box, Settings2, ImageIcon,
  Check, ArrowRight, ArrowLeft, Plus,
  Trash2, Palette, Layers, X, Save, Tag,
  Bold, Italic, List, Upload, CheckCircle,
  AlertCircle, Loader2, Sparkles, Package,
  Rocket, Type, Grid3x3, Ruler, Type as TypeIcon
} from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ModelImages from '../../../components/ModelImages';
const OneLineEditor = lazy(() => import("../../../components/Editor"));

// أنواع الخصائص المدعومة
const ATTRIBUTE_TYPES = {
  COLOR: 'color',
  SIZE: 'size',
  TEXT: 'text'
};

// القيم الافتراضية للمقاسات
const DEFAULT_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

// --- Mini Text Editor Component ---
const TextEditor = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[150px] p-4 dark:text-white',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="w-full border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden bg-gray-50 dark:bg-zinc-950 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
      <div className="flex gap-1 p-2 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-zinc-800'}`}
        >
          <List size={16} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default function CreateProduct() {
  const { t: translate, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.dir() === 'rtl';

  const t = (key) => translate(`translation:products.${key}`);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    price: '',
    storeId: '',
    sku: '',
    stock: '',
    category: '',
    status: 'active'
  });

  const [attributes, setAttributes] = useState([]);
  const [variantDetails, setVariantDetails] = useState([]);
  const [offers, setOffers] = useState([]);
  const [images, setImages] = useState([]);
  const [isOpenModelImage, setIsOpenModelImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 3000);
  };

  // إضافة خاصية جديدة مع تحديد النوع
  const addAttribute = (type, name = '') => {
    // 1. التحقق مما إذا كان النوع (اللون أو المقاس) موجوداً بالفعل لمنع التكرار
    const isDuplicate = attributes.some(attr => attr.type === type);

    if (isDuplicate && (type === ATTRIBUTE_TYPES.COLOR || type === ATTRIBUTE_TYPES.SIZE)) {
      // إظهار تنبيه للمستخدم (اختياري)
      showNotification('error', t('Attribute.already.exists'));
      return; // التوقف هنا وعدم الإضافة
    }

    const baseAttr = {
      id: `att-${Date.now()}`,
      type: type,
      // إذا لم يتم تمرير اسم، نستخدم الاسم الافتراضي من ملف الترجمة بناءً على النوع
      name: name || (type === ATTRIBUTE_TYPES.COLOR ? t('Colors') : type === ATTRIBUTE_TYPES.SIZE ? t('Add.Size') : ''),
    };

    let newAttr;

    switch (type) {
      case ATTRIBUTE_TYPES.COLOR:
        newAttr = {
          ...baseAttr,
          displayMode: 'color',
          variants: []
        };
        break;

      case ATTRIBUTE_TYPES.SIZE:
        newAttr = {
          ...baseAttr,
          variants: DEFAULT_SIZES.map((size, index) => ({
            id: `var-${Date.now()}-${index}`,
            name: size,
            value: size
          }))
        };
        break;

      case ATTRIBUTE_TYPES.TEXT:
      default:
        newAttr = {
          ...baseAttr,
          variants: []
        };
        break;
    }

    setAttributes([...attributes, newAttr]);
    setVariantDetails([])
  };

  // إزالة خاصية
  const removeAttribute = (attrId) => {
    setAttributes(attributes.filter(attr => attr.id !== attrId));
  };

  // تحديث اسم الخاصية
  const updateAttributeName = (attrId, name) => {
    setAttributes(attributes.map(attr =>
      attr.id === attrId ? { ...attr, name } : attr
    ));
    setVariantDetails([])
  };

  // تحديث وضع عرض الألوان (فقط للون)
  const updateAttributeDisplayMode = (attrId, mode) => {
    setAttributes(attributes.map(attr =>
      attr.id === attrId && attr.type === ATTRIBUTE_TYPES.COLOR
        ? { ...attr, displayMode: mode, variants: [] }
        : attr
    ));
    setVariantDetails([])
  };

  // إضافة تباين للخاصية
  const addVariantToAttribute = (attrId) => {
    setAttributes(attributes.map(attr => {
      if (attr.id !== attrId) return attr;

      const newVariant = {
        id: `var-${Date.now()}`,
        name: '',
        value: ''
      };

      // للمقاسات، نضيف حقل نصي فارغ
      if (attr.type === ATTRIBUTE_TYPES.SIZE) {
        newVariant.name = '';
        newVariant.value = '';
      }
      setVariantDetails([])

      return {
        ...attr,
        variants: [...attr.variants, newVariant]
      };
    }));
  };

  // تحديث قيمة التباين
  const updateVariantValue = (attrId, variantId, value, id = null) => {
    setAttributes(attributes.map(attr => {
      if (attr.id !== attrId) return attr;
      setVariantDetails([])
      return {
        ...attr,
        variants: attr.variants.map(variant => {
          if (variant.id !== variantId) return variant;

          // للون في وضع الألوان
          if (attr.type === ATTRIBUTE_TYPES.COLOR && attr.displayMode === 'color') {
            return {
              ...variant,
              value,
              name: value // نستخدم قيمة اللون كاسم أيضاً
            };
          }

          // للون في وضع الصور
          if (attr.type === ATTRIBUTE_TYPES.COLOR && attr.displayMode === 'image') {
            return {
              ...variant,
              value,
              name: value,
              imageId: id || null
            };
          }

          // للمقاسات والنص
          return {
            ...variant,
            value,
            name: value
          };
        })
      };
    }));
  };

  // إزالة تباين
  const removeVariant = (attrId, variantId) => {
    setAttributes(attributes.map(attr => {
      if (attr.id !== attrId) return attr;
      setVariantDetails([])
      // للمقاسات، نسمح بإزالة جميع القيم حتى الافتراضية
      return {
        ...attr,
        variants: attr.variants.filter(variant => variant.id !== variantId)
      };
    }));
  };

  // تتبع اختيار الصورة
  const [selectingImageFor, setSelectingImageFor] = useState(null);

  const openImageSelectorForVariant = (attrId, variantId) => {
    setSelectingImageFor({ attrId, variantId });
    setIsOpenModelImage(true);
  };

  // توليد جميع التوليفات الممكنة
  const generateVariantCombinations = () => {
    if (attributes.length === 0) {
      showNotification('error', t('Add.attributes.first'));
      return;
    }

    const emptyAttributes = attributes.filter(attr => attr.variants.length === 0);
    if (emptyAttributes.length > 0) {
      showNotification('error', t('Some.attributes.have.no.variants'));
      return;
    }

    const combinations = [];

    const generateCombos = (currentCombo, attrIndex) => {
      if (attrIndex === attributes.length) {
        combinations.push({ ...currentCombo });
        return;
      }

      const currentAttr = attributes[attrIndex];
      currentAttr.variants.forEach(variant => {
        generateCombos(
          { ...currentCombo, [currentAttr.name]: variant.name },
          attrIndex + 1
        );
      });
    };

    generateCombos({}, 0);

    const newVariantDetails = combinations.map((combo, index) => ({
      id: `vd-${Date.now()}-${index}`,
      name: combo,
      price: formData.price || '',
      stock: ''
    }));

    setVariantDetails(newVariantDetails);
    showNotification('success', `${t('Generated')} ${newVariantDetails.length} ${t('combinations')}`);
  };

  // إضافة توليفة يدوياً
  const addVariantDetail = () => {
    const newDetail = {
      id: `vd-${Date.now()}`,
      name: {},
      price: formData.price || '',
      stock: ''
    };
    setVariantDetails([...variantDetails, newDetail]);
  };

  // إزالة توليفة
  const removeVariantDetail = (detailId) => {
    setVariantDetails(variantDetails.filter(detail => detail.id !== detailId));
  };

  // تحديث قيمة توليفة
  const updateVariantDetailValue = (detailId, attrName, value) => {
    setVariantDetails(variantDetails.map(detail => {
      if (detail.id !== detailId) return detail;
      return {
        ...detail,
        name: { ...detail.name, [attrName]: value }
      };
    }));
  };

  const updateVariantDetailPrice = (detailId, price) => {
    setVariantDetails(variantDetails.map(detail =>
      detail.id === detailId ? { ...detail, price } : detail
    ));
  };

  const updateVariantDetailStock = (detailId, stock) => {
    setVariantDetails(variantDetails.map(detail =>
      detail.id === detailId ? { ...detail, stock } : detail
    ));
  };

  // إدارة العروض
  const addOffer = () => {
    const newOffer = {
      id: `off-${Date.now()}`,
      name: '',
      quantity: '',
      price: ''
    };
    setOffers([...offers, newOffer]);
  };

  const removeOffer = (offerId) => {
    setOffers(offers.filter(offer => offer.id !== offerId));
  };

  const updateOffer = (offerId, field, value) => {
    setOffers(offers.map(offer =>
      offer.id === offerId ? { ...offer, [field]: value } : offer
    ));
  };

  // اختيار صورة
  const handleImageSelect = (imageData) => {
    if (selectingImageFor) {
      const { attrId, variantId } = selectingImageFor;
      updateVariantValue(attrId, variantId, imageData.url, imageData.id);
      setSelectingImageFor(null);
      showNotification('success', t('Image.added.successfully'));
    } else {
      setImages([...images, imageData.url]);
      showNotification('success', t('Image.added.successfully'));
    }
  };

  // التحقق من الصحة
  const validateStep = () => {
    let newErrors = {};

    if (currentStep === 1) {
      const hasText = /[a-zA-Z0-9\u0600-\u06FF]/.test(formData.name || "");
      if (!formData.name?.trim() || !hasText) {
        newErrors.name = t('Product.name.must.contain.text');
      }
      if (!formData.price || Number(formData.price) <= 0) {
        newErrors.price = t('Please.enter.a.valid.price');
      }
    }

    if (currentStep === 2) {
      attributes.forEach(attr => {
        if (!attr.name?.trim()) {
          newErrors[`attr_${attr.id}`] = t('Attribute.name.required');
        }
        if (attr.variants.length === 0) {
          newErrors[`attr_empty_${attr.id}`] = t('Add.at.least.one.variant');
        }
        attr.variants.forEach(variant => {
          if (!variant.name?.trim()) {
            newErrors[`variant_${variant.id}`] = t('Variant.value.required');
          }
        });
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      showNotification('error', t('Please.fix.errors.first'));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      showNotification('error', t('Please.fix.errors.first'));
      return;
    }

    setLoading(true);

    try {
      const data = {
        id: `product-${Date.now()}`,
        name: formData.name,
        price: Number(formData.price),
        desc: formData.desc,
        storeId: formData.storeId,
        attributes: attributes,
        variantDetails: variantDetails,
        offers: offers,
        images: images
      };

      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Product Data:', JSON.stringify(data, null, 2));

      showNotification('success', t('Product.created.successfully!'));
    } catch (error) {
      console.error(error);
      showNotification('error', t('Error.creating.product'));
    } finally {
      setLoading(false);
    }
  };

  // مؤشر الخطوات
  const renderStepIndicator = () => {
    const steps = [
      { num: 1, icon: Info, label: t('Basic.Info') },
      { num: 2, icon: Palette, label: t('Attributes') },
      { num: 3, icon: Grid3x3, label: t('Variant.Details') },
      { num: 4, icon: Tag, label: t('Offers') },
      { num: 5, icon: ImageIcon, label: t('Images') }
    ];

    return (
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <Fragment key={step.num}>
                <div className="flex flex-col items-center gap-3 flex-1">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all font-black text-sm shadow-lg ${isActive
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white scale-110 shadow-indigo-500/30'
                      : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 dark:bg-zinc-800 text-gray-400'
                      }`}
                  >
                    {isCompleted ? <Check size={24} /> : <Icon size={24} />}
                  </div>
                  <p
                    className={`text-xs font-bold text-center ${isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : isCompleted
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-400'
                      }`}
                  >
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500 w-full' : 'bg-gray-200 dark:bg-zinc-700 w-0'
                        }`}
                    />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  const marketingEmojis = [
    "🔥", "⭐", "✨", "⚡", "💎", "🚀", "🎯", "🛍️",
    "💥", "👑", "🌟", "🎁", "💖", "🏆"
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Header */}
      <div dir={isRtl ? 'rtl' : 'ltr'} className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-3xl shadow-xl">
        <div className={`flex items-center gap-4 `}>
          <div className="p-3 bg-white/20 rounded-2xl">
            <Info size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">{t('Basic.Information')}</h3>
            <p className="text-sm opacity-90">{t('Enter.basic.product.details')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8">

        {/* Product Name */}
        <div className={isRtl ? 'text-right' : 'text-left'}>
          <label className="block mb-3 text-sm font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
            {t('Product.Name')} *
          </label>

          {/* Emoji Bar - تحسين اتجاه التمرير */}
          <div
            className="flex gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {marketingEmojis.map((emoji, i) => (
              <label
                key={i}
                type="button"
                htmlFor='name'
                onClick={() =>
                  setFormData(prev => ({
                    ...prev,
                    name: (prev.name || "") + emoji
                  }))
                }
                className="min-w-[40px] h-10 rounded-xl text-lg bg-gray-100 dark:bg-zinc-800 flex justify-center items-center
              hover:scale-110 hover:bg-indigo-500 hover:text-white transition-all duration-200 shadow-sm"
              >
                {emoji}
              </label>
            ))}
          </div>

          <input
            type="text"
            id='name'
            dir={isRtl ? "rtl" : "ltr"}
            value={formData.name}
            onChange={(e) => {
              const value = e.target.value;
              setFormData(prev => ({ ...prev, name: value }));
              if (errors.name) {
                const hasText = /[a-zA-Z0-9\u0600-\u06FF]/.test(value);
                if (value.trim() && hasText) {
                  setErrors(prev => ({ ...prev, name: null }));
                }
              }
            }}
            placeholder={t('e.g.Cotton.T.Shirt')}
            className={`w-full px-6 py-4 rounded-2xl border-2 bg-gray-50 dark:bg-zinc-950 
          outline-none transition-all font-medium text-lg
          ${errors.name
                ? 'border-rose-500 focus:ring-rose-500/10'
                : 'border-gray-100 dark:border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/10'
              }`}
          />

          {errors.name && (
            <p className={`text-xs text-rose-500 font-bold mt-2 flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <AlertCircle size={14} /> <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Description */}
        <div className={isRtl ? 'text-right' : 'text-left'}>
          <label className="block mb-3 text-sm font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
            {t('Product.Description')}
          </label>
          <div dir={isRtl ? 'rtl' : 'ltr'}>
            <TextEditor
              value={formData.desc}
              onChange={(value) => setFormData(prev => ({ ...prev, desc: value }))}
              placeholder={t('Write.a.detailed.description...')}
            />
          </div>
        </div>

        {/* Pricing Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sale Price */}
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <label className="block mb-3 text-sm font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
              {t('Sale.Price')} *
            </label>
            <div className="relative">
              <input
                type="number"
                dir="ltr"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
                className={`w-full py-4 rounded-2xl border-2 font-bold text-xl bg-gray-50 dark:bg-zinc-950 outline-none transition-all
              ${isRtl ? 'pl-14 pr-6' : 'pr-14 pl-6'}
              ${errors.price ? 'border-rose-500' : 'border-gray-100 dark:border-zinc-800 focus:border-indigo-500'}`}
              />
              <span className={`absolute top-1/2 -translate-y-1/2 text-gray-400 font-bold ${isRtl ? 'left-4' : 'right-4'}`}>
                {isRtl ? 'د.ج' : 'DZD'}
              </span>
            </div>
            {errors.price && (
              <p className={`text-xs text-rose-500 font-bold mt-2 flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <AlertCircle size={14} /> <span>{errors.price}</span>
              </p>
            )}
          </div>

          {/* Original Price */}
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <label className="block mb-3 text-sm font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
              {t('Original.Price')}
            </label>
            <div className="relative">
              <input
                type="number"
                dir="ltr"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                placeholder="0.00"
                className={`w-full py-4 rounded-2xl border-2 bg-gray-50 dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 focus:border-indigo-500 outline-none transition-all
              ${isRtl ? 'pl-14 pr-6' : 'pr-14 pl-6'}`}
              />
              <span className={`absolute top-1/2 -translate-y-1/2 text-gray-400 font-bold ${isRtl ? 'left-4' : 'right-4'}`}>
                {isRtl ? 'د.ج' : 'DZD'}
              </span>
            </div>
          </div>
        </div>

        {/* Store ID */}
        <div className={isRtl ? 'text-right' : 'text-left'}>
          <label className="block mb-3 text-sm font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
            {t('Store.ID')}
          </label>
          <input
            type="text"
            dir="ltr" // الـ ID غالباً إنجليزي دائماً
            value={formData.storeId}
            onChange={(e) => setFormData(prev => ({ ...prev, storeId: e.target.value }))}
            placeholder={t('e.g.store-uuid-001')}
            className="w-full px-6 py-4 rounded-2xl border-2 bg-gray-50 dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 focus:border-indigo-500 outline-none transition-all font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );

  // الخطوة 2: الخصائص المحسنة
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Palette size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">{t('Product.Attributes')}</h3>
            <p className="text-sm opacity-90">{t('Add.attributes.like.Color.and.Size')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6">
        {attributes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-3xl mx-auto mb-4 flex items-center justify-center">
              <Palette size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-zinc-400 font-medium mb-4">
              {t('No.attributes.added.yet')}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {attributes.map((attr, attrIndex) => (
              <div
                key={attr.id}
                className="border-2 border-gray-100 dark:border-zinc-800 rounded-2xl p-6 space-y-4 bg-gray-50 dark:bg-zinc-950"
              >
                {/* رأس الخاصية */}
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${attr.type === ATTRIBUTE_TYPES.COLOR ? 'bg-purple-100 text-purple-600 dark:bg-purple-500/20' :
                    attr.type === ATTRIBUTE_TYPES.SIZE ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/20' :
                      'bg-gray-100 text-gray-600 dark:bg-zinc-800'
                    }`}>
                    {attr.type === ATTRIBUTE_TYPES.COLOR ? <Palette size={20} /> :
                      attr.type === ATTRIBUTE_TYPES.SIZE ? <Ruler size={20} /> :
                        <TypeIcon size={20} />}
                  </div>
                  <input
                    type="text"
                    value={attr.name}
                    onChange={(e) => updateAttributeName(attr.id, e.target.value)}
                    placeholder={
                      attr.type === ATTRIBUTE_TYPES.COLOR ? t('e.g.Color') :
                        attr.type === ATTRIBUTE_TYPES.SIZE ? t('e.g.Size') :
                          t('Attribute.name')
                    }
                    className={`flex-1 px-4 py-3 bg-white dark:bg-zinc-900 border-2 rounded-xl font-bold ${errors[`attr_${attr.id}`] ? 'border-rose-500' : 'border-gray-200 dark:border-zinc-800 focus:border-indigo-500'
                      } outline-none transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => removeAttribute(attr.id)}
                    className="p-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* وضع العرض للألوان فقط */}
                {attr.type === ATTRIBUTE_TYPES.COLOR && (
                  <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-2 rounded-xl border-2 border-gray-200 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={() => updateAttributeDisplayMode(attr.id, 'color')}
                      className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${attr.displayMode === 'color'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-700'
                        }`}
                    >
                      <Palette size={16} className="inline mr-1" />
                      {t('Colors')}
                    </button>
                    <button
                      type="button"
                      onClick={() => updateAttributeDisplayMode(attr.id, 'image')}
                      className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${attr.displayMode === 'image'
                        ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-700'
                        }`}
                    >
                      <ImageIcon size={16} className="inline mr-1" />
                      {t('Images')}
                    </button>
                  </div>
                )}

                {/* التباينات */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      {t('Variants')}
                    </label>
                    {attr.type === ATTRIBUTE_TYPES.SIZE && (
                      <span className="text-xs text-blue-500 font-medium">
                        {t('Default.sizes.can.be.edited')}
                      </span>
                    )}
                  </div>

                  {attr.variants.map((variant, varIndex) => (
                    <div key={variant.id} className="flex items-center gap-2">
                      {attr.type === ATTRIBUTE_TYPES.COLOR && attr.displayMode === 'color' ? (
                        <>
                          <input
                            type="color"
                            value={variant.value || '#000000'}
                            onChange={(e) => updateVariantValue(attr.id, variant.id, e.target.value)}
                            className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-zinc-700"
                          />
                          <input
                            type="text"
                            value={variant.value}
                            onChange={(e) => updateVariantValue(attr.id, variant.id, e.target.value)}
                            placeholder="#FF0000"
                            className={`flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 rounded-xl ${errors[`variant_${variant.id}`] ? 'border-rose-500' : 'border-gray-200 dark:border-zinc-800 focus:border-purple-500'
                              } outline-none transition-all font-medium`}
                          />
                        </>
                      ) : attr.type === ATTRIBUTE_TYPES.COLOR && attr.displayMode === 'image' ? (
                        variant.value ? (
                          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 rounded-xl">
                            <img
                              src={variant.value}
                              alt="Variant"
                              className="w-12 h-12 object-cover rounded-lg border-2 border-gray-200 dark:border-zinc-700"
                            />
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate flex-1">
                              {t('Image.selected')}
                            </span>
                            <button
                              type="button"
                              onClick={() => openImageSelectorForVariant(attr.id, variant.id)}
                              className="text-xs font-bold text-indigo-500 hover:text-indigo-600"
                            >
                              {t('Change')}
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openImageSelectorForVariant(attr.id, variant.id)}
                            className={`flex-1 px-4 py-3 border-2 border-dashed rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${errors[`variant_${variant.id}`]
                              ? 'border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-500/5'
                              : 'border-gray-300 dark:border-zinc-700 text-gray-500 hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/5'
                              }`}
                          >
                            <ImageIcon size={18} />
                            {t('Select.Image')}
                          </button>
                        )
                      ) : (
                        <input
                          type="text"
                          value={variant.name}
                          onChange={(e) => updateVariantValue(attr.id, variant.id, e.target.value)}
                          placeholder={
                            attr.type === ATTRIBUTE_TYPES.SIZE ? t('e.g.XL') : t('Value')
                          }
                          className={`flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 rounded-xl ${errors[`variant_${variant.id}`] ? 'border-rose-500' : 'border-gray-200 dark:border-zinc-800 focus:border-indigo-500'
                            } outline-none transition-all font-medium`}
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => removeVariant(attr.id, variant.id)}
                        className="p-3 bg-rose-100 dark:bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-500/20 transition-all shrink-0"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addVariantToAttribute(attr.id)}
                    className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-gray-400 hover:text-indigo-500 hover:border-indigo-500 transition-all"
                  >
                    <Plus size={16} className="inline mr-1" />
                    {attr.type === ATTRIBUTE_TYPES.COLOR && attr.displayMode === 'color' ? t('Add.Color') :
                      attr.type === ATTRIBUTE_TYPES.COLOR && attr.displayMode === 'image' ? t('Add.Image') :
                        attr.type === ATTRIBUTE_TYPES.SIZE ? t('Add.Size') :
                          t('Add.Value')}
                  </button>
                </div>

                {errors[`attr_empty_${attr.id}`] && (
                  <p className="text-xs text-rose-500 font-bold flex items-center gap-1">
                    <AlertCircle size={12} />
                    {t('Add.at.least.one.variant')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* أزرار الإضافة السريعة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => addAttribute(ATTRIBUTE_TYPES.COLOR, t('Color'))}
            className="py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Palette size={18} />
            {t('Add.Color.Attribute')}
          </button>
          <button
            type="button"
            onClick={() => addAttribute(ATTRIBUTE_TYPES.SIZE, t('Size'))}
            className="py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Ruler size={18} />
            {t('Add.Size.Attribute')}
          </button>
          <button
            type="button"
            onClick={() => addAttribute(ATTRIBUTE_TYPES.TEXT, '')}
            className="py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl font-bold hover:from-gray-700 hover:to-gray-900 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <TypeIcon size={18} />
            {t('Add.Custom.Attribute')}
          </button>
        </div>
      </div>
    </div>
  );

  // الخطوة 3: تفاصيل التباينات
  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-6 rounded-3xl shadow-2xl">
        <div className={`flex items-center gap-3 mb-2 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Grid3x3 size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">{t('Variant.Details')}</h3>
            <p className="text-sm opacity-90">{t('Define.available.combinations')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6">
        {attributes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-3xl mx-auto mb-4 flex items-center justify-center">
              <Grid3x3 size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-zinc-400 font-medium mb-4">
              {t('Add.attributes.first')}
            </p>
          </div>
        ) : (
          <>
            {/* Auto Generate Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/5 dark:to-pink-500/5 border-2 border-purple-200 dark:border-purple-500/20 p-6 rounded-2xl">
              <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-lg shrink-0">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-purple-900 dark:text-purple-400 mb-1">
                      {t('Auto.Generate')}
                    </h4>
                    <p className="text-xs text-purple-700/70 dark:text-purple-400/60 leading-relaxed font-medium">
                      {t('All.possible.combinations.will.be.generated.automatically')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={generateVariantCombinations}
                  className={`flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:scale-105 whitespace-nowrap ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <Rocket size={18} className={isRtl ? 'ml-2' : 'mr-2'} />
                  {t('Generate.Now')}
                </button>
              </div>
            </div>

            {/* Bulk Update Section */}
            {variantDetails.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/5 dark:to-indigo-500/5 border-2 border-blue-200 dark:border-blue-500/20 p-6 rounded-2xl">
                <h4 className={`text-sm font-black text-blue-900 dark:text-blue-400 mb-4 flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <Settings2 size={18} />
                  {t('Bulk.Update')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Price', 'Stock'].map((field) => (
                    <div key={field} className={isRtl ? 'text-right' : ''}>
                      <label className="block mb-2 text-xs font-bold text-blue-800 dark:text-blue-400">
                        {t(`Apply.Same.${field}.to.All`)}
                      </label>
                      <div className={`flex gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <input
                          type="number"
                          id={`bulk${field}`}
                          placeholder={field === 'Price' ? "0.00" : t('e.g.100')}
                          className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-blue-200 dark:border-blue-500/20 rounded-xl focus:border-blue-500 outline-none transition-all font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const val = document.getElementById(`bulk${field}`).value;
                            if (val) {
                              setVariantDetails(variantDetails.map(d => ({ ...d, [field.toLowerCase()]: val })));
                              showNotification('success', t(`${field}s.updated`));
                            }
                          }}
                          className="px-4 py-2.5 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all"
                        >
                          {t('Apply')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Variants List */}
            {variantDetails.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-3xl mx-auto mb-4 flex items-center justify-center">
                  <Grid3x3 size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-zinc-400 font-medium">{t('No.variant.details.added.yet')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`flex items-center justify-between mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    {`${t('Total.Combinations')}: ${variantDetails.length}`}
                  </span>
                  <button type="button" onClick={() => setVariantDetails([])} className="text-xs font-bold text-rose-500 hover:text-rose-600">
                    {t('Clear.All')}
                  </button>
                </div>

                {variantDetails.map((detail, index) => (
                  <div key={detail.id} className="border-2 border-gray-100 dark:border-zinc-800 rounded-2xl p-6 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 dark:from-teal-500/5 dark:to-cyan-500/5">
                    <div className={`flex items-center justify-between mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className="px-3 py-1.5 bg-teal-500 text-white text-xs font-black rounded-full">#{index + 1}</span>
                        <span className="text-xs font-black text-gray-400 uppercase">{t('Combination')}</span>
                      </div>
                      <button onClick={() => removeVariantDetail(detail.id)} className="p-2 bg-rose-100 dark:bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-200">
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Attributes Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      {attributes.map(attr => (
                        <div key={attr.id} className={isRtl ? 'text-right' : ''}>
                          <label className="block mb-2 text-xs font-bold text-gray-600 dark:text-gray-400">
                            {attr.name || t('Attribute')}
                          </label>
                          <div className="relative">
                            {(attr.displayMode && attr.displayMode === 'image')
                              ? <div className='w-10 h-10 rounded-lg bg-gray-400 bg-cover' style={{ backgroundImage: `url(${detail.name[attr.name]})` }}></div>
                              : (
                                <input
                                  type="text"
                                  readOnly
                                  value={detail.name[attr.name] || ''}
                                  onChange={(e) => updateVariantDetailValue(detail.id, attr.name, e.target.value)}
                                  placeholder={t('Value')}
                                  className={`w-full px-4 py-2.5 bg-white dark:bg-zinc-900 rounded-xl outline-none transition-all font-medium cursor-auto ${isRtl ? 'text-right' : ''}`}
                                />
                              )
                            }

                            {detail.name[attr.name]?.startsWith('#') && (
                              <div
                                className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg border-2 border-gray-200 ${isRtl ? 'left-3' : 'right-3'}`}
                                style={{ backgroundColor: detail.name[attr.name] }}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pricing & Stock Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-gray-200 dark:border-zinc-800">
                      <div className={isRtl ? 'text-right' : ''}>
                        <label className={`block mb-2 text-xs font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <Tag size={14} /> {t('Price')} *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            dir="ltr"
                            value={detail.price}
                            onChange={(e) => updateVariantDetailPrice(detail.id, e.target.value)}
                            className={`w-full py-3 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 rounded-xl focus:border-teal-500 outline-none font-bold ${isRtl ? 'pl-12 pr-4' : 'pr-12 pl-4'}`}
                          />
                          <div className={`absolute top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 ${isRtl ? 'left-4' : 'right-4'}`}>
                            {isRtl ? 'د.ج' : 'DZD'}
                          </div>
                        </div>
                      </div>

                      <div className={isRtl ? 'text-right' : ''}>
                        <label className={`block mb-2 text-xs font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <Package size={14} /> {t('Stock.Quantity')}
                        </label>
                        <input
                          type="number"
                          dir="ltr"
                          value={detail.stock}
                          onChange={(e) => updateVariantDetailStock(detail.id, e.target.value)}
                          placeholder={t('e.g.100')}
                          className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 rounded-xl focus:border-teal-500 outline-none font-medium"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  // الخطوة 4: العروض
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-rose-500 to-orange-600 text-white p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Tag size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">{t('Special.Offers')}</h3>
            <p className="text-sm opacity-90">{t('Add.offers.and.discounts')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6">
        {offers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-3xl mx-auto mb-4 flex items-center justify-center">
              <Tag size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-zinc-400 font-medium mb-4">
              {t('No.offers.added.yet')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                className="border-2 border-gray-100 dark:border-zinc-800 rounded-2xl p-6 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-500/5 dark:to-orange-500/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase">
                    {`${t('Offer')} ${index + 1}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeOffer(offer.id)}
                    className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-2 text-xs font-bold text-gray-600 dark:text-gray-400">
                      {t('Offer.Name')}
                    </label>
                    <input
                      type="text"
                      value={offer.name}
                      onChange={(e) => updateOffer(offer.id, 'name', e.target.value)}
                      placeholder={t('e.g.Summer.Sale')}
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 rounded-xl focus:border-rose-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-xs font-bold text-gray-600 dark:text-gray-400">
                      {t('Quantity')}
                    </label>
                    <input
                      type="text"
                      value={offer.quantity}
                      onChange={(e) => updateOffer(offer.id, 'quantity', e.target.value)}
                      placeholder={t('e.g.10.pcs')}
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 rounded-xl focus:border-rose-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-xs font-bold text-gray-600 dark:text-gray-400">
                      {t('Price')}
                    </label>
                    <input
                      type="number"
                      value={offer.price}
                      onChange={(e) => updateOffer(offer.id, 'price', e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 rounded-xl focus:border-rose-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addOffer}
          className="w-full py-4 bg-gradient-to-r from-rose-500 to-orange-600 text-white rounded-xl font-bold hover:from-rose-600 hover:to-orange-700 transition-all shadow-lg"
        >
          <Plus size={18} className="inline mr-2" />
          {t('Add.New.Offer')}
        </button>
      </div>
    </div>
  );

  // الخطوة 5: الصور
  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <ImageIcon size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">{t('Product.Images')}</h3>
            <p className="text-sm opacity-90">{t('Add.high-quality.product.images')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <button
            type="button"
            onClick={() => setIsOpenModelImage(true)}
            className="aspect-square flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:scale-110 transition-all">
              <Plus size={28} />
            </div>
            <span className="text-[10px] font-black text-gray-400 group-hover:text-blue-500 uppercase tracking-widest text-center px-2">
              {t('Add.Photo')}
            </span>
          </button>

          {images.map((img, index) => (
            <div
              key={index}
              className="group aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 relative shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={img || "/placeholder.svg"}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                  className="p-2.5 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors shadow-xl"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} px-3 py-1.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-full text-[10px] font-black shadow-lg border border-gray-100 dark:border-zinc-800`}>
                {index === 0 ? (
                  <span className="text-blue-500">{t('Primary')}</span>
                ) : (
                  <span className="text-gray-600 dark:text-gray-400">{index + 1}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/5 dark:to-indigo-500/5 border border-blue-100 dark:border-blue-500/20 p-6 rounded-2xl flex gap-4 items-start">
          <div className="p-3 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 shrink-0">
            <Sparkles size={20} />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-black text-blue-900 dark:text-blue-400">
              {t('Photography.Tip')}
            </h4>
            <p className="text-xs text-blue-700/70 dark:text-blue-400/60 leading-relaxed font-medium">
              {t('Use.images.with.white.or.solid.backgrounds.and.high.resolution')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 px-4">
      <ModelImages
        isOpen={isOpenModelImage}
        close={() => {
          setIsOpenModelImage(false);
          setSelectingImageFor(null);
        }}
        onSelectImage={handleImageSelect}
      />

      {notification.show && (
        <div className={`fixed top-4 ${isRtl ? 'left-4' : 'right-4'} z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300 ${notification.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
          }`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold text-sm">{notification.message}</span>
        </div>
      )}

      <div className="flex items-center gap-4 pb-2">
        <button
          onClick={() => navigate('/dashboard/products')}
          className="p-2.5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl hover:scale-105 transition-all shadow-sm"
        >
          <ArrowRight className={isRtl ? '' : 'rotate-180'} size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <Package size={24} className="text-indigo-500" />
            {t('Create.New.Product')}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">
            {`${t('Step')} ${currentStep} of ${totalSteps}`}
          </p>
        </div>
      </div>

      {renderStepIndicator()}

      <div className="min-h-[500px]">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </div>

      <div className="flex items-center justify-between gap-4 pt-6">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl font-bold text-sm hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <ArrowRight className={isRtl ? '' : 'rotate-180'} size={18} />
          {t('Previous')}
        </button>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg hover:scale-105"
          >
            {t('Next')}
            <ArrowLeft className={isRtl ? '' : 'rotate-180'} size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-black text-sm hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {t('Creating...')}
              </>
            ) : (
              <>
                <Save size={18} />
                {t('Save.Product')}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}