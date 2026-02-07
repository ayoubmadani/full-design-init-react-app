import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const NewPassword = () => {
    const { t, i18n } = useTranslation();
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const isRtl = i18n.language === 'ar';

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(t('auth.password_success', 'تم تغيير كلمة المرور بنجاح!'));
        navigate('/auth');
    };

    return (
        <div className="w-full max-w-[380px] mx-auto transition-colors duration-300">
            {/* أيقونة النجاح */}
            <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100 dark:border-emerald-500/20">
                    <ShieldCheck className="w-8 h-8" />
                </div>
            </div>

            <h1 className="text-2xl font-black text-gray-900 dark:text-white text-center mb-1">
                {t('auth.new_password_title', 'كلمة مرور جديدة')}
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm text-center mb-8 px-2 leading-relaxed">
                {t('auth.new_password_desc', 'أدخل كلمة المرور الجديدة والقوية لتأمين حسابك')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* كلمة المرور الجديدة */}
                <div className="relative group">
                    <div className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10`}>
                        <Lock className="w-4 h-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
                    </div>
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder={t('auth.new_password_placeholder', 'كلمة المرور الجديدة')}
                        /* تغيير bg-gray-50 إلى bg-white dark:bg-zinc-900 وتوضيح الحدود */
                        className={`w-full ${isRtl ? 'pr-11 pl-12' : 'pl-11 pr-12'} py-3.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl focus:border-brand-primary focus:bg-white dark:focus:bg-zinc-950 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all text-sm text-gray-900 dark:text-white`}
                        required
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className={`absolute ${isRtl ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary transition-colors z-10`}
                    >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>

                {/* تأكيد كلمة المرور */}
                <div className="relative group">
                    <div className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10`}>
                        <Lock className="w-4 h-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
                    </div>
                    <input
                        type="password"
                        placeholder={t('auth.confirm_password_placeholder', 'تأكيد كلمة المرور')}
                        className={`w-full ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-3.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl focus:border-brand-primary focus:bg-white dark:focus:bg-zinc-950 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all text-sm text-gray-900 dark:text-white`}
                        required
                    />
                </div>

                {/* متطلبات كلمة المرور */}
                <div className="bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t('auth.pass_req_1', 'يجب أن تحتوي على 8 أحرف على الأقل')}</span>
                    </div>
                </div>

                {/* زر التحديث */}
                <button 
                    type="submit"
                    className="w-full py-3.5 bg-brand-primary text-white rounded-xl font-black hover:bg-brand-primary/90 shadow-xl shadow-brand-primary/10 transition-all flex items-center justify-center gap-2 text-sm mt-2 group active:scale-[0.98]"
                >
                    <span>{t('auth.reset_password_btn', 'تحديث كلمة المرور')}</span>
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
            </form>
        </div>
    );
};

export default NewPassword;