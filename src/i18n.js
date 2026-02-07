import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // استيراد المكتشف
import translationEN from './locales/en.json';
import translationAR from './locales/ar.json';
import translationFR from './locales/fr.json';

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
  fr: { translation: translationFR }
};

i18n
  .use(LanguageDetector) // تفعيل اكتشاف اللغة تلقائياً
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar', // اللغة الاحتياطية
    
    // إعدادات المكتشف
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'], // الترتيب: يبحث أولاً في localStorage
      caches: ['localStorage', 'cookie'], // أين يحفظ اللغة المختارة؟
    },

    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;