import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert(t('contact.success_msg', 'شكرًا لتواصلك معنا! سنرد عليك قريبًا.'));
  };

  return (
    <div className="bg-white dark:bg-brand-dark min-h-screen py-16 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* العناوين الرئيسية */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            {t('contact.title', 'تواصل معنا')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
            {t('contact.subtitle', 'لديك استفسار حول MdStore؟ فريقنا جاهز للرد على أسئلتك ومساعدتك.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* الجانب الأيسر: معلومات التواصل وساعات العمل */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* بطاقة معلومات التواصل */}
            <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-zinc-800 space-y-8">
              <ContactInfoItem 
                icon={<MapPin size={20} />} 
                title={t('contact.address_label', 'العنوان')}
                content={t('contact.address_val', 'الجزائر العاصمة، الجزائر')}
                color="text-brand-primary"
                bgColor="bg-brand-primary/10"
              />
              <ContactInfoItem 
                icon={<Phone size={20} />} 
                title={t('contact.phone_label', 'الهاتف')}
                content="+213 555 00 00 00"
                color="text-brand-success"
                bgColor="bg-brand-success/10"
                isLtr={true}
              />
              <ContactInfoItem 
                icon={<Mail size={20} />} 
                title={t('contact.email_label', 'البريد الإلكتروني')}
                content="support@mdstore.dz"
                color="text-purple-600 dark:text-purple-400"
                bgColor="bg-purple-50 dark:bg-purple-500/10"
              />
            </div>

            {/* بطاقة ساعات العمل - تصميم جذاب */}
            <div className="bg-brand-primary p-8 rounded-[2rem] shadow-xl shadow-brand-primary/20 text-white relative overflow-hidden group">
              <Clock className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:rotate-12 transition-transform duration-500" />
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Clock size={20} />
                {t('contact.hours_title', 'ساعات العمل')}
              </h3>
              <ul className="space-y-3 opacity-90 text-sm">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>{t('contact.days_work', 'الأحد - الخميس')}</span>
                  <span className="font-bold" dir="ltr">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>{t('contact.days_off', 'الجمعة - السبت')}</span>
                  <span className="font-bold">{t('contact.closed', 'مغلق')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* الجانب الأيمن: نموذج المراسلة */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-zinc-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mx-1">{t('contact.name_label', 'الاسم الكامل')}</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-zinc-950 focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary outline-none transition-all"
                    placeholder={t('contact.name_placeholder', 'أدخل اسمك الكامل')}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mx-1">{t('contact.email_label', 'البريد الإلكتروني')}</label>
                  <input
                    type="email"
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-zinc-950 focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary outline-none transition-all"
                    placeholder="example@mail.com"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mx-1">{t('contact.subject_label', 'الموضوع')}</label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-zinc-950 focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary outline-none transition-all"
                  placeholder={t('contact.subject_placeholder', 'كيف يمكننا مساعدتك؟')}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mx-1">{t('contact.message_label', 'الرسالة')}</label>
                <textarea
                  rows="5"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-zinc-950 focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary outline-none transition-all resize-none"
                  placeholder={t('contact.message_placeholder', 'اكتب رسالتك هنا...')}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full md:w-max px-12 py-4 bg-brand-primary text-white font-black rounded-2xl hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 group active:scale-95"
              >
                <span>{t('contact.send_btn', 'إرسال الرسالة')}</span>
                <Send size={18} className={`${isRtl ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfoItem = ({ icon, title, content, color, bgColor, isLtr }) => (
  <div className="flex items-start gap-5">
    <div className={`w-12 h-12 ${bgColor} ${color} rounded-2xl flex items-center justify-center shrink-0 shadow-sm`}>
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className={`text-gray-500 dark:text-gray-400 text-sm leading-relaxed ${isLtr ? 'font-sans' : ''}`} dir={isLtr ? 'ltr' : 'auto'}>
        {content}
      </p>
    </div>
  </div>
);

export default Contact;