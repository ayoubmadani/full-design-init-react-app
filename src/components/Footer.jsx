import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-white dark:bg-brand-dark border-t border-gray-100 dark:border-zinc-800 pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* العمود الأول: الشعار والوصف */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <span className="text-white font-bold text-xl font-sans">M</span>
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter italic">MdStore</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
              {t('footer.description', 'المنصة الرائدة لتمكين التجار من بناء مستقبلهم الرقمي بكل سهولة.')}
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">{t('footer.quick_links', 'روابط سريعة')}</h4>
            <ul className="space-y-4">
              <FooterLink to="/" label={t('nav.home', 'الرئيسية')} />
              <FooterLink to="/about" label={t('nav.about', 'من نحن')} />
              <FooterLink to="/contact" label={t('nav.contact', 'اتصل بنا')} />
              <FooterLink to="/auth/register" label={t('home.get_started', 'ابدأ الآن')} />
            </ul>
          </div>

          {/* العمود الثالث: الدعم القانوني */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">{t('footer.legal', 'القانونية')}</h4>
            <ul className="space-y-4">
              <FooterLink to="/privacy" label={t('footer.privacy', 'سياسة الخصوصية')} />
              <FooterLink to="/terms" label={t('footer.terms', 'شروط الاستخدام')} />
              <FooterLink to="/cookies" label={t('footer.cookies', 'سياسة الكوكيز')} />
            </ul>
          </div>

          {/* العمود الرابع: معلومات التواصل */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">{t('contact.title', 'تواصل معنا')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <MapPin size={18} className="text-brand-primary shrink-0" />
                <span>{t('contact.address_val', 'الجزائر العاصمة، الجزائر')}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <Phone size={18} className="text-brand-primary shrink-0" />
                <span dir="ltr">+213 500 00 00 00</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <Mail size={18} className="text-brand-primary shrink-0" />
                <span>support@mdstore.dz</span>
              </li>
            </ul>
          </div>

        </div>

        {/* الخط السفلي وحقوق النشر */}
        <div className="border-t border-gray-100 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} MdStore. {t('footer.rights', 'جميع الحقوق محفوظة.')}</p>
          <div className="flex gap-6">
            <span className="hover:text-brand-primary cursor-pointer transition-colors">Algeria 🇩🇿</span>
            <span className="hover:text-brand-primary cursor-pointer transition-colors">English</span>
            <span className="hover:text-brand-primary cursor-pointer transition-colors">Français</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// مكونات فرعية
const FooterLink = ({ to, label }) => (
  <li>
    <Link to={to} className="text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors text-sm font-medium">
      {label}
    </Link>
  </li>
);

const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    className="w-9 h-9 bg-gray-50 dark:bg-zinc-900 text-gray-400 dark:text-gray-500 rounded-lg flex items-center justify-center hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white transition-all shadow-sm"
  >
    {icon}
  </a>
);

export default Footer;