import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Lock, User, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

const Register = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    return (
        <div className="w-full max-w-[400px] mx-auto transition-colors duration-300">
            {/* الأيقونة العلوية - متدرجة الألوان */}
            <div className="flex justify-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-tr from-brand-primary to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/20 group hover:rotate-6 transition-transform">
                    <Sparkles className="w-7 h-7 text-white" />
                </div>
            </div>

            <h1 className="text-2xl font-black text-gray-900 dark:text-white text-center mb-1">
                {t('auth.register_title', 'إنشاء حساب')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-8">
                {t('auth.register_desc', 'ابدأ رحلتك معنا اليوم')}
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {/* الحقل: الاسم الكامل */}
                <div className="relative group">
                    <div className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 flex items-center pointer-events-none`}>
                        <User className="w-4 h-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder={t('auth.name_placeholder', 'الاسم الكامل')}
                        className={`w-full ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl focus:border-brand-primary focus:bg-white dark:focus:bg-zinc-950 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all text-sm text-gray-900 dark:text-white`}
                        required
                    />
                </div>

                {/* الحقل: البريد الإلكتروني */}
                <div className="relative group">
                    <div className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 flex items-center pointer-events-none`}>
                        <Mail className="w-4 h-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
                    </div>
                    <input
                        type="email"
                        placeholder={t('auth.email_placeholder', 'البريد الإلكتروني')}
                        className={`w-full ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl focus:border-brand-primary focus:bg-white dark:focus:bg-zinc-950 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all text-sm text-gray-900 dark:text-white`}
                        required
                    />
                </div>

                {/* الحقل: كلمة المرور */}
                <div className="relative group">
                    <div className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 flex items-center pointer-events-none`}>
                        <Lock className="w-4 h-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
                    </div>
                    <input
                        type="password"
                        placeholder={t('auth.password_placeholder', 'كلمة المرور')}
                        className={`w-full ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl focus:border-brand-primary focus:bg-white dark:focus:bg-zinc-950 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all text-sm text-gray-900 dark:text-white`}
                        required
                    />
                </div>

                {/* زر التسجيل */}
                <button className="w-full py-3.5 bg-brand-primary text-white rounded-xl font-black hover:bg-brand-primary/90 shadow-xl shadow-brand-primary/10 transition-all flex items-center justify-center gap-2 text-sm mt-2 group active:scale-[0.98]">
                    <span>{t('auth.register_btn_submit', 'إنشاء الحساب')}</span>
                    {isRtl ? 
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    }
                </button>

                {/* الفاصل */}
                <div className="relative flex items-center gap-4 py-2">
                    <div className="flex-1 h-px bg-gray-100 dark:bg-zinc-800"></div>
                    <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-black uppercase tracking-widest">
                        {t('common.or', 'أو عبر')}
                    </span>
                    <div className="flex-1 h-px bg-gray-100 dark:bg-zinc-800"></div>
                </div>

                {/* زر جوجل */}
                <button type="button" 
                        className="w-full py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all text-sm font-bold text-gray-700 dark:text-gray-200 shadow-sm active:scale-[0.98]">
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="google" />
                    <span>{t('common.google_login', 'جوجل')}</span>
                </button>
            </form>

            {/* التحويل لتسجيل الدخول */}
            <p className="text-center mt-8 text-xs text-gray-500 dark:text-zinc-500">
                {t('auth.have_account', 'لديك حساب؟')}{' '}
                <Link to="/auth" className="text-brand-primary hover:underline font-black transition-colors">
                    {t('auth.login_btn', 'تسجيل الدخول')}
                </Link>
            </p>
        </div>
    );
};

export default Register;