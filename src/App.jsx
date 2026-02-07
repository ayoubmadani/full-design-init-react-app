import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// استيراد المكونات (نفس استيراداتك بدون تغيير)
import { Otp, Register, NewPassword, Login, ForgotPassword } from './pages/auth/imports';
import LayoutAuth from './layouts/LayoutAuth';
import LayoutSite from './layouts/LayoutSite';
import HomeSite from './pages/site/home';
import About from './pages/site/about';
import Contact from './pages/site/contact';
import Privacy from './pages/site/Privacy';
import Terms from './pages/site/Terms';
import Cookies from './pages/site/Cookies';
import LayoutDashboard from './layouts/LayoutDashboard';
import DashboardHome from './pages/dashboard/dashboard/DashboardHome';
import Categories from './pages/dashboard/categories/Categories';
import Products from './pages/dashboard/products/Products';
import Orders from './pages/dashboard/orders/Orders';
import Settings from './pages/dashboard/settings/Settings';
import Analytics from './pages/dashboard/analytics/Analytics';
import LandingPages from './pages/dashboard/landing-pages/LandingPages';
import Stores from './pages/dashboard/stores/Stores';
import Shipping from './pages/dashboard/shipping/Shipping';

const App = () => {
  const { i18n } = useTranslation();
  
  // 1. منطق إدارة الوضع الليلي
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // تحديث كلاس html للوضع الليلي
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // تحديث اتجاه الصفحة واللغة
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <Routes>
        {/* 1. قسم الموقع العام */}
        <Route path="/" element={<LayoutSite />}>
          <Route index element={<HomeSite />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookies" element={<Cookies />} />
        </Route>

        {/* 2. قسم لوحة التحكم */}
        <Route path="/dashboard" element={<LayoutDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="stores" element={<Stores />} />
          <Route path="category" element={<Categories />} />
          <Route path="product" element={<Products />} />
          <Route path="landing-pages" element={<LandingPages />} />
          <Route path="orders" element={<Orders />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="shipping" element={<Shipping />} />
        </Route>

        {/* 3. قسم التوثيق */}
        <Route path="/auth" element={<LayoutAuth />} >
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="new-password" element={<NewPassword />} />
          <Route path="otp" element={<Otp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;