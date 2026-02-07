import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const LayoutSite = () => {
  const { i18n } = useTranslation();

  // 1. إدارة اللغة والاتجاه
  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  // 2. إدارة الوضع الليلي
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className='min-h-screen flex flex-col bg-white dark:bg-brand-dark transition-colors duration-500'>
      
      {/* القائمة العلوية */}
      <NavBar />
      
      {/* المحتوى المتغير */}
      <main className='flex-grow w-full'>
        {/* أزلنا الأنيميشن المعقد واستبدلناه بكلاس بسيط يضمن الظهور */}
        <div className="transition-opacity duration-700 ease-in">
           <Outlet />
        </div>
      </main>

      {/* التذييل */}
      <Footer />
    </div>
  );
};

export default LayoutSite;