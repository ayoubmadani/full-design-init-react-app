import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// استيراد المكونات
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
import CreateStore from './pages/dashboard/stores/Create'; // <-- استيراد صفحة الإنشاء الجديدة
import Shipping from './pages/dashboard/shipping/Shipping';
import Update from './pages/dashboard/stores/update';
import Show from './pages/dashboard/stores/Show';
import CreateProduct from './pages/dashboard/products/Create';
import FakeProductDetails from './pages/site/FakeProductDetails';

const App = () => {
  const { i18n } = useTranslation();

  // 1. منطق إدارة الوضع الليلي
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
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

        <Route path="fake-product" element={<FakeProductDetails />} />

        {/* 2. قسم لوحة التحكم */}
        <Route path="/dashboard" element={<LayoutDashboard />}>
          <Route index element={<DashboardHome />} />

          {/* مسارات المتاجر */}
          <Route path="stores">
            <Route index element={<Stores />} />
            <Route path="create" element={<CreateStore />} /> {/* <-- المسار: /dashboard/stores/create */}
            <Route path="update/:id" element={<Update />} /> {/* <-- المسار: /dashboard/stores/update/:id */}
            <Route path="show/:id" element={<Show />} /> {/* <-- المسار: /dashboard/stores/show/:id */}
          </Route>

          <Route path="category" element={<Categories />} />


          <Route path="products">
            <Route index element={<Products />} />
            <Route path="create" element={<CreateProduct />} /> {/* <-- المسار: /dashboard/products/create */}

          </Route>


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