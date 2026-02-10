import React, { useState, Fragment, useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Info, Box, Settings2, ImageIcon,
  Check, ArrowRight, ArrowLeft, Plus,
  Trash2, Palette, Layers, X, Save, Tag,
  Bold, Italic, List, Upload, CheckCircle,
  AlertCircle, Loader2, Sparkles, Package,
  Rocket, Type, Grid3x3
} from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ModelImages from '../../../components/ModelImages';
const OneLineEditor = lazy(() => import("../../../components/Editor"));

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
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'products' });
  const navigate = useNavigate();
  const isRtl = i18n.dir() === 'rtl';

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    price: '',
    storeId: '',
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

  // Add new attribute
  const addAttribute = (attributeName = '') => {
    const newAttr = {
      id: `att-${Date.now()}`,
      name: attributeName,
      displayMode: 'color', // 'color' or 'image' - applies to all variants
      variants: []
    };
    setAttributes([...attributes, newAttr]);
  };

  // Remove attribute
  const removeAttribute = (attrId) => {
    setAttributes(attributes.filter(attr => attr.id !== attrId));
  };

  // Update attribute name
  const updateAttributeName = (attrId, name) => {
    setAttributes(attributes.map(attr =>
      attr.id === attrId ? { ...attr, name } : attr
    ));
  };

  // Update attribute display mode
  const updateAttributeDisplayMode = (attrId, mode) => {
    setAttributes(attributes.map(attr =>
      attr.id === attrId ? { ...attr, displayMode: mode, variants: [] } : attr
    ));
  };

  // Add variant to attribute
  const addVariantToAttribute = (attrId) => {
    setAttributes(attributes.map(attr => {
      if (attr.id === attrId) {
        return {
          ...attr,
          variants: [
            ...attr.variants,
            {
              id: `var-${Date.now()}`,
              name: '',
              value: '' // Color hex or image URL
            }
          ]
        };
      }
      return attr;
    }));
  };

  // Update variant value (color or image)
  const updateVariantValue = (attrId, variantId, value,id=null) => {
    setAttributes(attributes.map(attr => {
      if (attr.id === attrId) {
        return {
          ...attr,
          variants: attr.variants.map(variant =>
            variant.id === variantId ? {
              ...variant, 
              value,
              name: value,
              imageId: id? id : null
            } : variant
          )
        };
      }
      return attr;
    }));
  };

  // Remove variant from attribute
  const removeVariant = (attrId, variantId) => {
    setAttributes(attributes.map(attr => {
      if (attr.id === attrId) {
        return {
          ...attr,
          variants: attr.variants.filter(variant => variant.id !== variantId)
        };
      }
      return attr;
    }));
  };

  // State for tracking which variant is selecting an image
  const [selectingImageFor, setSelectingImageFor] = useState(null);

  // Open image selector for variant
  const openImageSelectorForVariant = (attrId, variantId) => {
    setSelectingImageFor({ attrId, variantId });
    setIsOpenModelImage(true);
  };

  // Remove variant from attribute



  // Generate all possible combinations automatically
  const generateVariantCombinations = () => {
    if (attributes.length === 0) {
      showNotification(t('Add.attributes.first'));
      return;
    }

    // Check if all attributes have variants
    const emptyAttributes = attributes.filter(attr => attr.variants.length === 0);
    if (emptyAttributes.length > 0) {
      showNotification(t('Some.attributes.have.no.variants'));
      return;
    }

    // Generate all combinations
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

    // Convert to variant details format with price and stock
    const newVariantDetails = combinations.map((combo, index) => ({
      id: `vd-${Date.now()}-${index}`,
      name: combo,
      price: formData.price || '',
      stock: ''
    }));

    setVariantDetails(newVariantDetails);
    showNotification('success', (`${t('Generated')} ${newVariantDetails.length} ${t('Generacombinationsted')} `));
  };

  // Add new variant detail manually
  const addVariantDetail = () => {
    const newDetail = {
      id: `vd-${Date.now()}`,
      name: {},
      price: formData.price || '',
      stock: ''
    };
    setVariantDetails([...variantDetails, newDetail]);
  };

  // Remove variant detail
  const removeVariantDetail = (detailId) => {
    setVariantDetails(variantDetails.filter(detail => detail.id !== detailId));
  };

  // Update variant detail attribute value
  const updateVariantDetailValue = (detailId, attrName, value) => {
    setVariantDetails(variantDetails.map(detail => {
      if (detail.id === detailId) {
        return {
          ...detail,
          name: {
            ...detail.name,
            [attrName]: value
          }
        };
      }
      return detail;
    }));
  };

  // Update variant detail price
  const updateVariantDetailPrice = (detailId, price) => {
    setVariantDetails(variantDetails.map(detail =>
      detail.id === detailId ? { ...detail, price } : detail
    ));
  };

  // Update variant detail stock
  const updateVariantDetailStock = (detailId, stock) => {
    setVariantDetails(variantDetails.map(detail =>
      detail.id === detailId ? { ...detail, stock } : detail
    ));
  };

  // Add new offer
  const addOffer = () => {
    const newOffer = {
      id: `off-${Date.now()}`,
      name: '',
      quantity: '',
      price: ''
    };
    setOffers([...offers, newOffer]);
  };

  // Remove offer
  const removeOffer = (offerId) => {
    setOffers(offers.filter(offer => offer.id !== offerId));
  };

  // Update offer
  const updateOffer = (offerId, field, value) => {
    setOffers(offers.map(offer =>
      offer.id === offerId ? { ...offer, [field]: value } : offer
    ));
  };

  // Handle image selection from ModelImages
  const handleImageSelect = (imageData) => {
    // Check if we're selecting for a variant
    if (selectingImageFor) {
      const { attrId, variantId } = selectingImageFor;
      updateVariantValue(attrId, variantId, imageData.url,imageData.id);
      setSelectingImageFor(null);
      showNotification('success', t('Image.added.successfully'));
    } else {
      // Adding to product images
      setImages([...images, imageData.url]);
      showNotification('success',t('Image.added.successfully'));
    }
  };

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
          newErrors[`attr_${attr.id}`] = true;
        }
        if (attr.variants.length === 0) {
          newErrors[`attr_empty_${attr.id}`] = true;
        }
        attr.variants.forEach(variant => {
          if (!variant.name?.trim()) {
            newErrors[`variant_${variant.id}`] = true;
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
      showNotification('error',t('Please.fix.errors.first'));
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

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Product Data:', JSON.stringify(data, null, 2));

      showNotification('success', t('Product.created.successfully!'));

      setTimeout(() => {
        navigate('/dashboard/products');
      }, 1500);

    } catch (error) {
      console.error(error);
      showNotification(t('Error.creating.product'));
    } finally {
      setLoading(false);
    }
  };

  // Step Indicator
  const renderStepIndicator = () => {
    const steps = [
      { num: 1, icon: Info, label: t('Basic.Info') },
      { num: 2, icon: Palette, label: t('Attributes')},
      { num: 3, icon: Grid3x3, label: t('Variant.Details')},
      { num: 4, icon: Tag, label:t('Offers')},
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

  // Step 1: Basic Info
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Info size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">
              {t('Basic.Information')}
            </h3>
            <p className="text-sm opacity-90">
              {t('Enter.basic.product.details') }
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6">
        {/* Product Name */}
        <div>
          <label className="block mb-3 text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            {t('Product.Name')} *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t('e.g.Cotton.T-Shirt') }
            className={`w-full px-6 py-4 bg-gray-50 dark:bg-zinc-950 border-2 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium ${errors.name
              ? 'border-rose-500'
              : 'border-gray-100 dark:border-zinc-800 focus:border-indigo-500'
              }`}
          />
          {errors.name && (
            <p className="text-xs text-rose-500 font-bold mt-2 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.name}
            </p>
          )}
        </div>

        {/* Product Description */}
        <div>
          <label className="block mb-3 text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            {t('Product.Description')}
          </label>
          <TextEditor
            value={formData.desc}
            onChange={(value) => setFormData({ ...formData, desc: value })}
            placeholder={t('Write.a.detailed.description...')}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-3 text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            {t('Price')} *
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.00"
              className={`w-full px-6 py-4 bg-gray-50 dark:bg-zinc-950 border-2 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-lg ${errors.price
                ? 'border-rose-500'
                : 'border-gray-100 dark:border-zinc-800 focus:border-indigo-500'
                }`}
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 font-bold">
              {isRtl ? 'د.ج' : 'DZD'}
            </div>
          </div>
          {errors.price && (
            <p className="text-xs text-rose-500 font-bold mt-2 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.price}
            </p>
          )}
        </div>

        {/* Store ID (Optional) */}
        <div>
          <label className="block mb-3 text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            { 'Store ID'}
          </label>
          <input
            type="text"
            value={formData.storeId}
            onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
            placeholder={isRtl ? 'مثال: store-uuid-001' : 'e.g. store-uuid-001'}
            className="w-full px-6 py-4 bg-gray-50 dark:bg-zinc-950 border-2 border-gray-100 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
          />
        </div>
      </div>
    </div>
  );

  // Step 2: Attributes
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Palette size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">
              {t('Product.Attributes')}
            </h3>
            <p className="text-sm opacity-90">
              {t('Add.attributes.like.Color.and.Size')}
            </p>
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
                {/* Attribute Header */}
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={attr.name}
                    onChange={(e) => updateAttributeName(attr.id, e.target.value)}
                    placeholder={t('Attribute.name.(e.g.Color)')}
                    className={`flex-1 px-4 py-3 bg-white dark:bg-zinc-900 border-2 rounded-xl font-bold ${errors[`attr_${attr.id}`]
                      ? 'border-rose-500'
                      : 'border-gray-200 dark:border-zinc-800 focus:border-indigo-500'
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

                {/* Display Mode Selection */}
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

                {/* Variants */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    {t('Variants')}
                  </label>

                  {attr.variants.map((variant, varIndex) => (
                    <div key={variant.id} className="flex items-center gap-2">
                      {attr.displayMode === 'color' ? (
                        <>
                          {/* Color Picker */}
                          <div className="relative">
                            <input
                              type="color"
                              value={variant.value || '#000000'}
                              onChange={(e) => updateVariantValue(attr.id, variant.id, e.target.value)}
                              className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-zinc-700"
                            />
                          </div>
                          {/* Color Code Input */}
                          <input
                            type="text"
                            value={variant.value}
                            onChange={(e) => updateVariantValue(attr.id, variant.id, e.target.value)}
                            placeholder={'e.g.#FF0000'}
                            className={`flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 rounded-xl ${errors[`variant_${variant.id}`]
                                ? 'border-rose-500'
                                : 'border-gray-200 dark:border-zinc-800 focus:border-purple-500'
                              } outline-none transition-all font-medium`}
                          />
                        </>
                      ) : (
                        <>
                          {/* Image Variant */}
                          {variant.value ? (
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
                          )}
                        </>
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
                    {attr.displayMode === 'color'
                      ? (t('Add.Color'))
                      : (t('Add.Image'))
                    }
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

        {/* Quick Add Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => addAttribute('Color')}
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <Palette size={18} className="inline mr-2" />
            {t('Add.Color')}
          </button>
          <button
            type="button"
            onClick={() => addAttribute('Size')}
            className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <Layers size={18} className="inline mr-2" />
            {t('Add.Size')}
          </button>
          <button
            type="button"
            onClick={() => addAttribute('')}
            className="flex-1 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl font-bold hover:from-gray-800 hover:to-black transition-all shadow-lg"
          >
            <Plus size={18} className="inline mr-2" />
            {t('Custom')}
          </button>
        </div>
      </div>
    </div>
  );

  // Step 3: Variant Details
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Grid3x3 size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">
              {isRtl ? 'تفاصيل المتغيرات' : 'Variant Details'}
            </h3>
            <p className="text-sm opacity-90">
              {isRtl ? 'حدد التركيبات المتاحة من الخصائص' : 'Define available combinations'}
            </p>
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
              {isRtl ? 'يجب إضافة خصائص أولاً' : 'Add attributes first'}
            </p>
          </div>
        ) : (
          <>
            {/* Auto Generate Button */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/5 dark:to-pink-500/5 border-2 border-purple-200 dark:border-purple-500/20 p-6 rounded-2xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-lg">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-purple-900 dark:text-purple-400 mb-1">
                      {isRtl ? 'توليد تلقائي' : 'Auto Generate'}
                    </h4>
                    <p className="text-xs text-purple-700/70 dark:text-purple-400/60 leading-relaxed font-medium">
                      {isRtl
                        ? 'سيتم إنشاء جميع التركيبات الممكنة تلقائياً من الخصائص المضافة مع السعر الأساسي'
                        : 'All possible combinations will be generated automatically with base price'
                      }
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={generateVariantCombinations}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:scale-105 whitespace-nowrap"
                >
                  <Rocket size={18} className="inline mr-2" />
                  {isRtl ? 'توليد الآن' : 'Generate Now'}
                </button>
              </div>
            </div>

            {/* Bulk Actions */}
            {variantDetails.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/5 dark:to-indigo-500/5 border-2 border-blue-200 dark:border-blue-500/20 p-6 rounded-2xl">
                <h4 className="text-sm font-black text-blue-900 dark:text-blue-400 mb-4 flex items-center gap-2">
                  <Settings2 size={18} />
                  {isRtl ? 'تعديل جماعي' : 'Bulk Update'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-xs font-bold text-blue-800 dark:text-blue-400">
                      {isRtl ? 'تطبيق سعر موحد على الكل' : 'Apply Same Price to All'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        id="bulkPrice"
                        placeholder="0.00"
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-blue-200 dark:border-blue-500/20 rounded-xl focus:border-blue-500 outline-none transition-all font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const bulkPrice = document.getElementById('bulkPrice').value;
                          if (bulkPrice) {
                            setVariantDetails(variantDetails.map(detail => ({ ...detail, price: bulkPrice })));
                            showNotification('success', isRtl ? 'تم تحديث الأسعار' : 'Prices updated');
                          }
                        }}
                        className="px-4 py-2.5 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all"
                      >
                        {isRtl ? 'تطبيق' : 'Apply'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-xs font-bold text-blue-800 dark:text-blue-400">
                      {isRtl ? 'تطبيق كمية موحدة على الكل' : 'Apply Same Stock to All'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        id="bulkStock"
                        placeholder={isRtl ? 'مثال: 100' : 'e.g. 100'}
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-blue-200 dark:border-blue-500/20 rounded-xl focus:border-blue-500 outline-none transition-all font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const bulkStock = document.getElementById('bulkStock').value;
                          if (bulkStock) {
                            setVariantDetails(variantDetails.map(detail => ({ ...detail, stock: bulkStock })));
                            showNotification('success', isRtl ? 'تم تحديث الكميات' : 'Stocks updated');
                          }
                        }}
                        className="px-4 py-2.5 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all"
                      >
                        {isRtl ? 'تطبيق' : 'Apply'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {variantDetails.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-zinc-800 rounded-3xl mx-auto mb-4 flex items-center justify-center">
                  <Grid3x3 size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-zinc-400 font-medium mb-4">
                  {isRtl ? 'لم تضف أي تفاصيل متغيرات بعد' : 'No variant details added yet'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    {isRtl ? `إجمالي التركيبات: ${variantDetails.length}` : `Total Combinations: ${variantDetails.length}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setVariantDetails([])}
                    className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    {isRtl ? 'مسح الكل' : 'Clear All'}
                  </button>
                </div>

                {variantDetails.map((detail, index) => (
                  <div
                    key={detail.id}
                    className="border-2 border-gray-100 dark:border-zinc-800 rounded-2xl p-6 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 dark:from-teal-500/5 dark:to-cyan-500/5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1.5 bg-teal-500 text-white text-xs font-black rounded-full">
                          #{index + 1}
                        </span>
                        <span className="text-xs font-black text-gray-400 uppercase">
                          {isRtl ? 'التركيبة' : 'Combination'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVariantDetail(detail.id)}
                        className="p-2 bg-rose-100 dark:bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-500/20 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Attributes */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      {attributes.map(attr => (
                        <div key={attr.id}>
                          <label className="block mb-2 text-xs font-bold text-gray-600 dark:text-gray-400">
                            {attr.name || (isRtl ? 'خاصية' : 'Attribute')}
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={detail.name[attr.name] || ''}
                              onChange={(e) => updateVariantDetailValue(detail.id, attr.name, e.target.value)}
                              placeholder={isRtl ? 'القيمة' : 'Value'}
                              className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 rounded-xl focus:border-teal-500 outline-none transition-all font-medium"
                            />
                            {/* Color preview if hex */}
                            {detail.name[attr.name]?.startsWith('#') && (
                              <div
                                className="absolute top-1/2 -translate-y-1/2 right-3 w-6 h-6 rounded-lg border-2 border-gray-200 dark:border-zinc-700"
                                style={{ backgroundColor: detail.name[attr.name] }}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price and Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-gray-200 dark:border-zinc-800">
                      <div>
                        <label className="block mb-2 text-xs font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Tag size={14} />
                          {isRtl ? 'السعر' : 'Price'} *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={detail.price}
                            onChange={(e) => updateVariantDetailPrice(detail.id, e.target.value)}
                            placeholder="0.00"
                            className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 rounded-xl focus:border-teal-500 outline-none transition-all font-bold"
                          />
                          <div className="absolute top-1/2 -translate-y-1/2 right-4 text-xs font-bold text-gray-400">
                            {isRtl ? 'د.ج' : 'DZD'}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block mb-2 text-xs font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Package size={14} />
                          {isRtl ? 'الكمية المتوفرة' : 'Stock Quantity'}
                        </label>
                        <input
                          type="number"
                          value={detail.stock}
                          onChange={(e) => updateVariantDetailStock(detail.id, e.target.value)}
                          placeholder={isRtl ? 'مثال: 100' : 'e.g. 100'}
                          className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 rounded-xl focus:border-teal-500 outline-none transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={addVariantDetail}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-bold hover:from-teal-600 hover:to-cyan-700 transition-all shadow-lg"
            >
              <Plus size={18} className="inline mr-2" />
              {isRtl ? 'إضافة تركيبة يدوياً' : 'Add Manual Combination'}
            </button>
          </>
        )}
      </div>
    </div>
  );

  // Step 4: Offers
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-rose-500 to-orange-600 text-white p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Tag size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">
              {isRtl ? 'العروض الخاصة' : 'Special Offers'}
            </h3>
            <p className="text-sm opacity-90">
              {isRtl ? 'أضف عروض وخصومات للمنتج' : 'Add offers and discounts'}
            </p>
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
              {isRtl ? 'لم تضف أي عروض بعد' : 'No offers added yet'}
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
                    {isRtl ? `عرض ${index + 1}` : `Offer ${index + 1}`}
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
                      {isRtl ? 'اسم العرض' : 'Offer Name'}
                    </label>
                    <input
                      type="text"
                      value={offer.name}
                      onChange={(e) => updateOffer(offer.id, 'name', e.target.value)}
                      placeholder={isRtl ? 'مثال: تخفيض الصيف' : 'e.g. Summer Sale'}
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 rounded-xl focus:border-rose-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-xs font-bold text-gray-600 dark:text-gray-400">
                      {isRtl ? 'الكمية' : 'Quantity'}
                    </label>
                    <input
                      type="text"
                      value={offer.quantity}
                      onChange={(e) => updateOffer(offer.id, 'quantity', e.target.value)}
                      placeholder={isRtl ? 'مثال: 10 قطع' : 'e.g. 10 pcs'}
                      className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 rounded-xl focus:border-rose-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-xs font-bold text-gray-600 dark:text-gray-400">
                      {isRtl ? 'السعر' : 'Price'}
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
          {isRtl ? 'إضافة عرض جديد' : 'Add New Offer'}
        </button>
      </div>
    </div>
  );

  // Step 5: Images
  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <ImageIcon size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black">
              {isRtl ? 'صور المنتج' : 'Product Images'}
            </h3>
            <p className="text-sm opacity-90">
              {isRtl ? 'أضف صور عالية الجودة للمنتج' : 'Add high-quality product images'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Add Image Button */}
          <button
            type="button"
            onClick={() => setIsOpenModelImage(true)}
            className="aspect-square flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:scale-110 transition-all">
              <Plus size={28} />
            </div>
            <span className="text-[10px] font-black text-gray-400 group-hover:text-blue-500 uppercase tracking-widest text-center px-2">
              {isRtl ? 'إضافة صورة' : 'Add Photo'}
            </span>
          </button>

          {/* Images Grid */}
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
                  <span className="text-blue-500">
                    {isRtl ? 'الأساسية' : 'Primary'}
                  </span>
                ) : (
                  <span className="text-gray-600 dark:text-gray-400">
                    {index + 1}
                  </span>
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
              {isRtl ? 'نصيحة للمصورين' : 'Photography Tip'}
            </h4>
            <p className="text-xs text-blue-700/70 dark:text-blue-400/60 leading-relaxed font-medium">
              {isRtl
                ? 'يفضل استخدام صور بخلفية بيضاء أو موحدة وبدقة عالية (1000x1000 px) لضمان ظهور المنتج بشكل احترافي للعملاء.'
                : 'Use images with white or solid backgrounds and high resolution (1000x1000 px) to ensure professional product display for customers.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 px-4">
      {/* ModelImages Modal */}
      <ModelImages
        isOpen={isOpenModelImage}
        close={() => {
          setIsOpenModelImage(false);
          setSelectingImageFor(null);
        }}
        onSelectImage={handleImageSelect}
      />

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 ${isRtl ? 'left-4' : 'right-4'} z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300 ${notification.type === 'success'
          ? 'bg-emerald-500 text-white'
          : 'bg-rose-500 text-white'
          }`}>
          {notification.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="font-bold text-sm">{notification.message}</span>
        </div>
      )}

      {/* Header */}
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
            {isRtl ? 'إنشاء منتج جديد' : 'Create New Product'}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm font-medium">
            {isRtl ? `الخطوة ${currentStep} من ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`}
          </p>
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
        {currentStep === 5 && renderStep5()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-6">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl font-bold text-sm hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <ArrowRight className={isRtl ? '' : 'rotate-180'} size={18} />
          {isRtl ? 'السابق' : 'Previous'}
        </button>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg hover:scale-105"
          >
            {isRtl ? 'التالي' : 'Next'}
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
                {isRtl ? 'جاري الإنشاء...' : 'Creating...'}
              </>
            ) : (
              <>
                <Save size={18} />
                {isRtl ? 'حفظ المنتج' : 'Save Product'}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}