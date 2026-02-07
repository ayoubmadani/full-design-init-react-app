import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShieldCheck, ArrowRight, RefreshCcw } from 'lucide-react';

const Otp = () => {
    const { t } = useTranslation();
    const [otp, setOtp] = useState(new Array(5).fill(""));
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (inputRefs.current[0]) inputRefs.current[0].focus();
    }, []);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.value !== "" && index < 4) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const isComplete = otp.every(val => val !== "");

    return (
        <div className="w-full max-w-[380px] mx-auto transition-all duration-300">
            {/* الأيقونة العلوية */}
            <div className="flex justify-center mb-6">
                <div className="w-14 h-14 bg-indigo-50 dark:bg-zinc-900 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-zinc-800">
                    <ShieldCheck className="w-6 h-6" />
                </div>
            </div>

            <h1 className="text-2xl font-black text-gray-900 dark:text-white text-center mb-1">
                Code de Vérification
            </h1>
            <p className="text-gray-500 text-sm text-center mb-8">
                Entrez le code à 5 chiffres
            </p>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="flex justify-center gap-3" dir="ltr">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            inputMode="numeric"
                            ref={(el) => (inputRefs.current[index] = el)}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            // إجبار المربعات على اللون الأبيض الواضح bg-white
                            className="w-12 h-14 text-center text-2xl font-black bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-700 rounded-xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-gray-900 dark:text-white shadow-sm"
                        />
                    ))}
                </div>

                <button 
                    type="button"
                    disabled={!isComplete}
                    onClick={() => navigate('/auth/new-password')}
                    className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-lg
                        ${isComplete 
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
                >
                    <span>Vérifier le Code</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </form>

            <div className="text-center mt-10">
                <button className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-2 mx-auto">
                    <RefreshCcw size={16} /> Renvoyer le Code
                </button>
                <Link to="/auth" className="block mt-6 text-gray-400 text-xs font-bold hover:text-indigo-600">
                    Retour à la Connexion
                </Link>
            </div>
        </div>
    );
};

export default Otp;