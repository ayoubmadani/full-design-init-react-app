import React from 'react';

export default function ModelImages({ isOpen, close, onSelectImage }) {
  const images = [
    { id: 1, url: "https://m.media-amazon.com/images/I/51R1ZvqV24L._AC_UF350,350_QL50_.jpg" },
    { id: 2, url: "https://propclub.co/cdn/shop/products/white-geometric-photography-prop-sets-stairsarchesshapes-prop-club-716035.jpg?v=1631620500" },
    { id: 3, url: "https://assets.crowdspring.com/marketing/landing-page/crowdspring-product-design-phase1-1120.jpg" },
    { id: 4, url: "https://img.freepik.com/free-vector/beautiful-cosmetic-ad_23-2148471068.jpg?semt=ais_hybrid&w=740&q=80" },
    { id: 5, url: "https://spectrum-brand.com/cdn/shop/products/4-piece-geometric-foam-styling-prop-set-for-photography-calypso-blue-H0004-17.jpg?v=1701770866&width=1001" },
    { id: 6, url: "https://rukminim2.flixcart.com/image/480/480/jobsbrk0/speaker/mobile-tablet-speaker/d/a/e/b-logo-mini-music-spicker-320-original-imafasfzrqxg68bm.jpeg?q=90" },
    { id: 7, url: "https://rukminim2.flixcart.com/image/300/300/jmthle80-1/speaker/mobile-tablet-speaker/7/c/v/voltegic-dc-5v-mini-s10-portable-wireless-bluetooth-speaker-for-original-imaexu9tfhtpzskh.jpeg" },
    { id: 8, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HbGEcOEYmeKiyWStGoZECNzDzf22miqcYw&s" },
    { id: 9, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd-K7LlteJFRTDlL_vyqjNg_Adj_V3BY9tlA&s" },
    { id: 10, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1QT2Jmeq2ob9EmiGsY3c0LxWc2HwQwCW4cQ&s" },
  ];

  const handleImageSelect = (image) => {
    if (onSelectImage) {
      onSelectImage(image);
    }
    close();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4'>
      {/* Container الرئيسي للـ Modal */}
      <div className='relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col'>
        
        {/* Header */}
        <div className='p-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50 dark:bg-zinc-950'>
          <h3 className='text-xl font-bold text-gray-800 dark:text-white'>معرض الصور المميزة</h3>
          <button 
            onClick={close}
            className='p-2 hover:bg-red-100 dark:hover:bg-red-500/10 text-gray-500 hover:text-red-600 dark:hover:text-red-500 rounded-full transition-colors'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Grid Images */}
        <div className='p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {images.map((img) => (
            <div 
              key={img.id} 
              className='group relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800 cursor-pointer border border-gray-200 dark:border-zinc-700 shadow-sm hover:shadow-xl transition-all'
              onClick={() => handleImageSelect(img)}
            >
              <img 
                src={img.url} 
                alt={`Product ${img.id}`} 
                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
              />
              {/* Overlay عند تمرير الماوس */}
              <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                <span className='bg-white/90 dark:bg-zinc-900/90 text-black dark:text-white px-3 py-1 rounded-full text-xs font-medium'>اختيار</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className='p-4 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 flex justify-end'>
          <button 
            onClick={close}
            className='px-6 py-2 bg-gray-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-zinc-600 transition-colors'
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}