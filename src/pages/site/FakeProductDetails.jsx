import React, { useState } from 'react';

const FakeProductDetails = () => {
    const productData = {
        "id": "product-1770836312937",
        "name": "عطر Emo - الفخامة المظلمة",
        "price": 1200,
        "desc": "<p><strong>عطر لا يهمس، بل يترك أثراً لا يُنسى.</strong></p><p><strong>مستوحى من الروح الحرة والعمق العاطفي، يأتي عطر Emo في زجاجة أيقونية على شكل جمجمة كريستالية تعكس القوة والجرأة. صُمم هذا العطر للرجل الذي يجرؤ على أن يكون مختلفاً، حيث يمزج بين النوتات الخشبية العميقة ولمسات من البخور الغامض ليخلق هالة من الفخامة المظلمة.</strong></p><ul><li><p><strong>الطابع العطري: شرقي - خشبي - فواح.</strong></p></li><li><p><strong>الثبات: قوة ثبات استثنائية تدوم طويلاً، تناسب الأجواء الباردة والمناسبات المسائية.</strong></p></li><li><p><strong>التصميم: زجاجة فنية تعبر عن الشخصية الفريدة، محاطة بهالة من الدخان والبرق لتجسد القوة الطبيعية.</strong></p></li></ul><p><strong>الخيار الأمثل لمن يبحث عن عطر يعبر عن كاريزما طاغية وحضور غامض.</strong></p>",
        "attributes": [
            {
                "id": "att-1",
                "type": "color",
                "name": "اللون",
                "variants": [
                    { "id": "var-1", "name": "أزرق", "value": "https://spectrum-brand.com/cdn/shop/products/4-piece-geometric-foam-styling-prop-set-for-photography-calypso-blue-H0004-17.jpg" },
                    { "id": "var-2", "name": "أبيض", "value": "https://rukminim2.flixcart.com/image/300/300/jmthle80-1/speaker/mobile-tablet-speaker/7/c/v/voltegic-dc-5v-mini-s10-portable-wireless-bluetooth-speaker-for-original-imaexu9tfhtpzskh.jpeg" }
                ]
            },
            {
                "id": "att-2",
                "name": "المقاس",
                "variants": [{ "name": "S" }, { "name": "M" }, { "name": "L" }, { "name": "XL" }]
            }
        ],
        "offers": [
            { "id": "off-1", "price": "1200", "label": "قطعة واحدة" },
            { "id": "off-2", "price": "2100", "label": "قطعتين (توفير)", "popular": true },
            { "id": "off-3", "price": "2999", "label": "3 قطع (أفضل قيمة)" }
        ]
    };

    const [selectedImage, setSelectedImage] = useState(productData.attributes[0].variants[0].value);
    const [selectedOffer, setSelectedOffer] = useState(productData.offers[1].id);
    const [selectedSize, setSelectedSize] = useState('L');

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pb-12 font-sans">
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* الجانب الأيمن: معرض الصور */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="sticky top-8">
                            <div className="aspect-[4/5] bg-gray-50 dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-sm">
                                <img src={selectedImage} alt="product" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                            </div>
                            <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                                {productData.attributes[0].variants.map((v) => (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelectedImage(v.value)}
                                        className={`min-w-[100px] h-[120px] rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${selectedImage === v.value ? 'border-blue-600 ring-4 ring-blue-50' : 'border-transparent opacity-50'}`}
                                    >
                                        <img src={v.value} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>


                        </div>
                    </div>

                    {/* الجانب الأيسر: خيارات الشراء ونموذج الطلب */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white leading-tight">{productData.name}</h1>
                            <div className="flex items-center gap-4 bg-blue-50 dark:bg-blue-500/10 w-fit px-4 py-2 rounded-xl">
                                <span className="text-3xl font-black text-blue-600">1200 DA</span>
                                <span className="text-lg text-blue-300 line-through">1800 DA</span>
                            </div>
                        </div>

                        {/* العروض */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-gray-500">العروض المتاحة</h3>
                            <div className="grid gap-3">
                                {productData.offers.map((offer) => (
                                    <label
                                        key={offer.id}
                                        className={`relative p-5 rounded-2xl cursor-pointer border-2 transition-all flex items-center justify-between ${selectedOffer === offer.id ? 'border-blue-600 bg-blue-50/30' : 'border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-900'}`}
                                    >
                                        <input type="radio" name="offer" className="hidden" onChange={() => setSelectedOffer(offer.id)} checked={selectedOffer === offer.id} />
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedOffer === offer.id ? 'border-blue-600' : 'border-gray-300'}`}>
                                                {selectedOffer === offer.id && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                                            </div>
                                            <span className="font-bold text-gray-800 dark:text-zinc-200">{offer.label}</span>
                                        </div>
                                        <span className="text-xl font-black">{offer.price} DA</span>
                                        {offer.popular && (
                                            <span className="absolute -top-3 left-4 bg-orange-500 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-lg shadow-orange-500/30">توفير عالي</span>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* نموذج الطلب */}
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 border border-gray-100 dark:border-zinc-800 space-y-6">
                            <div className="text-center">
                                <div className="inline-block p-3 bg-green-50 dark:bg-green-500/10 rounded-2xl mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white italic">أطلب الآن والدفع عند الاستلام</h2>
                            </div>

                            <div className="space-y-4">
                                <input type="text" placeholder="الاسم الكامل" className="w-full p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all" />
                                <input type="tel" placeholder="رقم الهاتف" className="w-full p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all text-left" />
                                <div className="grid grid-cols-2 gap-4">
                                    <select className="w-full p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl outline-none cursor-pointer appearance-none">
                                        <option>اختر الولاية</option>
                                    </select>
                                    <select className="w-full p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl outline-none cursor-pointer appearance-none">
                                        <option>اختر البلدية</option>
                                    </select>
                                </div>
                            </div>

                            <button className="w-full py-6 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black text-2xl shadow-xl shadow-green-500/40 transition-all active:scale-95 flex items-center justify-center gap-3 animate-bounce-subtle">
                                إضغط هنا لطلب العطر
                            </button>
                            <p className="text-center text-xs text-gray-400 font-medium">ضمان استرجاع لمدة 7 أيام في حال عدم الرضا</p>
                        </div>


                    </div>
                </div>
            </div>

            {/* الوصف في الأسفل (للشاشات الكبيرة) */}
            <div dir='rtl' className=" mt-12 p-8 bg-gray-50 dark:bg-zinc-900/50 rounded-3xl border border-gray-100 dark:border-zinc-800">
                <h3 className="text-xl font-black mb-6 border-r-4 border-blue-600 pr-4">تفاصيل المنتج</h3>
                <div 
                    className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-zinc-400 leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{ __html: productData.desc }} // لعرض الـ HTML بشكل صحيح
                />
            </div>

            <footer className="mt-20 py-8 text-center border-t border-gray-100 dark:border-zinc-900">
                <p className="text-gray-400 font-bold tracking-widest uppercase">name store &copy; 2026</p>
            </footer>
        </div>
    );
};

export default FakeProductDetails;