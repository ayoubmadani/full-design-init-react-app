import React from 'react';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product }) => {
    const { t } = useTranslation();

    return (
        <div className="group relative bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-2">
            {/* منطقة الصورة والأدوات السريعة */}
            <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-zinc-800">
                <img 
                    src={product?.image || "https://via.placeholder.com/400"} 
                    alt={product?.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* شارة الخصم أو الحالة */}
                {product?.discount && (
                    <div className="absolute top-4 right-4 bg-brand-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg z-10">
                        {product.discount}% {t('common.off', 'خصم')}
                    </div>
                )}

                {/* أدوات سريعة تظهر عند التحويم */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button className="w-10 h-10 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-xl flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                        <Eye className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                        <Heart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* تفاصيل المنتج */}
            <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2 py-1 rounded-md">
                        {product?.category || "Category"}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold text-gray-600 dark:text-zinc-400">{product?.rating || "4.8"}</span>
                    </div>
                </div>

                <h3 className="text-base font-black text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-brand-primary transition-colors">
                    {product?.name || "اسم المنتج يظهر هنا"}
                </h3>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-gray-900 dark:text-white">
                            ${product?.price || "199"}
                        </span>
                        {product?.oldPrice && (
                            <span className="text-xs text-gray-400 line-through font-bold">
                                ${product.oldPrice}
                            </span>
                        )}
                    </div>

                    <button className="p-3 bg-gray-900 dark:bg-brand-primary text-white rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-lg shadow-gray-200 dark:shadow-brand-primary/20">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;