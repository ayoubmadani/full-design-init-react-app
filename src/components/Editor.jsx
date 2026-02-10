import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function OneLineEditor({ newLine, height, placeholder, onChange, isRtl = false, darkMode }) {
  const [handleplaceholder, setHandlePlaceholder] = useState('');

  useEffect(() => {
    setHandlePlaceholder(placeholder ?? '');
  }, [placeholder]);

  return (
    <Editor
      apiKey="ley6ofa6cd6ekutl2u06s2maoppdsnd96x7iajch7ddjldj0"
      key={`${isRtl ? 'ar' : 'en'}-${darkMode ? 'dark' : 'light'}`} 
      init={{
        menubar: false,
        height,
        skin: darkMode ? "oxide-dark" : "oxide",
        content_css: darkMode ? "dark" : "default",
        placeholder: handleplaceholder,
        directionality: isRtl ? 'rtl' : 'ltr',
        language: isRtl ? 'ar' : 'en',
        content_style: `
          /* إعدادات الخلفية المتوافقة مع Zinc 950 و Zinc 50 */
          html {
            background-color: ${darkMode ? "#27272a" : "#fafafa"} !important;
          }
          
          body {
            background-color: transparent !important;
            color: ${darkMode ? "#e4e4e7" : "#27272a"}; /* نص رمادي فاتح للداكن وداكن للفاتح */
            overflow-x: ${!newLine ? "auto" : "hidden"};
            white-space: ${!newLine ? "nowrap" : "normal"};
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }

          /* تخصيص الروابط باللون الزمردي المتماشي مع تصميمك */
          a { color: ${darkMode ? "#34d399" : "#059669"}; text-decoration: none; }
          a:hover { text-decoration: underline; }

          /* تحسين مظهر نص الإرشاد (Placeholder) */
          .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
            color: ${darkMode ? "#52525b" : "#a1a1aa"} !important;
            font-style: normal;
            opacity: 0.7;
          }

          /* شريط تمرير (Scrollbar) عصري ونحيف جداً */
          ::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: ${darkMode ? "#4f5966" : "#e4e4e7"};
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #10b981; /* يتغير للأخضر عند التفاعل */
          }

          /* تنظيف شكل القوائم */
          ul, ol { padding-inline-start: 20px; margin: 8px 0; }
        `,
        forced_root_block: "",
        force_br_newlines: newLine,
        force_p_newlines: !newLine,
        setup: (editor) => {
          if (!newLine) {
            editor.on("keydown", (e) => {
              if (e.key === "Enter") e.preventDefault();
            });
          }
        },
        // شريط أدوات بسيط واحترافي
        toolbar: "undo redo | bold italic underline | bullist numlist | link | code",
        statusbar: false,
        branding: false // إخفاء شعار TinyMCE لزيادة نظافة التصميم
      }}
      onEditorChange={(value) => onChange(value)}
    />
  );
}