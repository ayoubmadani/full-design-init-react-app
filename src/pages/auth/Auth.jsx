import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Shield, CheckCircle } from 'lucide-react';

const AuthSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [name, setName] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };



 

  

  

  const renderNewPassword = () => (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-4 shadow-lg shadow-indigo-500/50">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Create New Password
        </h1>
        <p className="text-gray-600">Your new password must be different from previously used passwords</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); alert('Password reset successful!'); setCurrentView('login'); }} className="space-y-5">
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New password"
            className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm new password"
            className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
            required
          />
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <p className="text-sm text-indigo-800 font-medium mb-2">Password requirements:</p>
          <ul className="space-y-1 text-sm text-indigo-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Minimum 8 characters
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              At least one uppercase letter
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              At least one number
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              At least one special character
            </li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
        >
          Reset Password
          <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main container */}
      <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md border border-white/20">
        {currentView === 'login' && renderLogin()}
        {currentView === 'register' && renderRegister()}
        {currentView === 'otp' && renderOTP()}
        {currentView === 'forgot' && renderForgotPassword()}
        {currentView === 'newPassword' && renderNewPassword()}
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AuthSystem;