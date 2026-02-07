import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, CheckCircle2, AlertCircle, Scale, CreditCard, Ban } from 'lucide-react';

const Terms = () => {
  const { t } = useTranslation();

  return (
    <div className="py-16 bg-white dark:bg-brand-dark min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-3xl mb-6 shadow-sm">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            {t('terms.title', 'شروط الاستخدام')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('terms.subtitle', 'باستخدامك لمنصة MdStore، فإنك توافق على الالتزام بالشروط والقواعد التالية لضمان بيئة تجارية عادلة وآمنة للجميع.')}
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-6">
          <TermsSection 
            icon={<CheckCircle2 className="text-brand-success" />}
            title={t('terms.account_title', 'مسؤولية الحساب')}
            desc={t('terms.account_desc', 'أنت مسؤول عن الحفاظ على سرية بيانات حسابك وعن جميع الأنشطة التي تحدث تحته. يجب أن تكون المعلومات المقدمة دقيقة ومحدثة.')}
          />

          <TermsSection 
            icon={<CreditCard className="text-blue-500 dark:text-blue-400" />}
            title={t('terms.payments_title', 'الرسوم والاشتراكات')}
            desc={t('terms.payments_desc', 'تخضع خدماتنا لرسوم اشتراك دورية. جميع الرسوم واضحة ولا توجد تكاليف مخفية، ويتم تحصيلها وفقاً للخطة التي تختارها.')}
          />

          <TermsSection 
            icon={<Ban className="text-brand-danger" />}
            title={t('terms.content_title', 'المحتوى المحظور')}
            desc={t('terms.content_desc', 'يُمنع استخدام المنصة لبيع سلع غير قانونية أو انتهاك حقوق الملكية الفكرية. نحتفظ بالحق في إغلاق أي متجر يخالف هذه القوانين.')}
          />

          <TermsSection 
            icon={<Scale className="text-brand-primary" />}
            title={t('terms.legal_title', 'القانون المعمول به')}
            desc={t('terms.legal_desc', 'تخضع هذه الشروط وتفسر وفقاً للقوانين المحلية المعمول بها في الجزائر، وأي نزاع ينشأ يخضع للاختصاص القضائي للمحاكم المحلية.')}
          />
        </div>

        {/* Note Box */}
        <div className="mt-16 p-6 bg-amber-50 dark:bg-amber-500/10 rounded-3xl border border-amber-100 dark:border-amber-500/20 flex gap-4 transition-all">
          <AlertCircle className="text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
            {t('terms.important_note', 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. استمرار استخدامك للمنصة بعد التعديلات يعد موافقة منك على الشروط الجديدة.')}
          </p>
        </div>

      </div>
    </div>
  );
};

// مكون فرعي للأقسام
const TermsSection = ({ icon, title, desc }) => (
  <div className="p-8 bg-gray-50/50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2.5rem] hover:bg-white dark:hover:bg-zinc-800/50 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 group">
    <div className="flex gap-6 items-start">
      <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="space-y-2 text-right">
        <h3 className="text-xl font-black text-gray-900 dark:text-white transition-colors">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm md:text-base">{desc}</p>
      </div>
    </div>
  </div>
);

export default Terms;