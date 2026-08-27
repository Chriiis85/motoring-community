'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ usernameOrEmail?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined, general: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { usernameOrEmail?: string; password?: string } = {};
    const sanitizedUser = formData.usernameOrEmail.trim();

    if (!sanitizedUser) {
      newErrors.usernameOrEmail = 'Please enter your username or email address.';
    } else if (sanitizedUser.length < 3) {
      newErrors.usernameOrEmail = 'Username or email must be at least 3 characters.';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate safe client validation & processing
    setTimeout(() => {
      setIsSubmitting(false);
      setLoginSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col font-['F1Regular']">
      <main className="flex-grow flex items-center justify-center relative overflow-hidden bg-[#f3f3f3] dark:bg-[#121212] min-h-[100vh] py-[8vh] px-4">
        <div 
          className="absolute inset-0 z-0 opacity-80"
          style={{
            '--s': '200px',
            '--c1': '#222222',
            '--c2': '#4e4f51',
            '--c3': '#3c3c3c',
            background: `repeating-conic-gradient(from 30deg, #0000 0 120deg, var(--c3) 0 180deg) calc(0.5 * var(--s)) calc(0.5 * var(--s) * 0.577), repeating-conic-gradient(from 30deg, var(--c1) 0 60deg, var(--c2) 0 120deg, var(--c3) 0 180deg)`,
            backgroundSize: 'var(--s) calc(var(--s) * 0.577)'
          } as React.CSSProperties}
        />
        
        <section className="relative z-10 w-full max-w-4xl min-h-[620px] flex flex-row bg-white dark:bg-[#1a1a1a] border-2 border-black dark:border-gray-700 rounded-[15px] shadow-[0_15px_35px_rgba(0,0,0,0.4)] overflow-hidden transition-colors duration-300">
          
          {/* Form Side Image */}
          <article className="hidden md:block relative w-[42%] min-h-full border-r-2 border-black dark:border-gray-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10" />
            <Image
              src="/images/Login-img.jpg"
              alt="Motoring Community Login"
              fill
              className="object-cover z-0"
              priority
            />
          </article>

          {/* Form Content */}
          <article className="w-full md:w-[58%] p-6 sm:p-10 flex flex-col justify-center">
            <form 
              onSubmit={handleLogin} 
              noValidate
              className="w-full flex flex-col items-center justify-center gap-3"
            >
              {/* Notice Banner */}
              <div className="w-full bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 text-amber-900 dark:text-amber-300 p-3 rounded text-xs sm:text-sm text-center shadow-sm" role="alert">
                <p className="font-bold">⚠️ Aviso / Preview Demo</p>
                <p>Módulo de autenticación con validaciones seguras para preparación futura.</p>
              </div>

              {loginSuccess && (
                <div className="w-full bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-500 text-emerald-900 dark:text-emerald-300 p-3 rounded text-sm text-center animate-in fade-in" role="status">
                  <p className="font-bold">✓ Login validado con éxito</p>
                  <p>Redirigiendo a la página principal...</p>
                </div>
              )}

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mt-2 mb-3 tracking-wide uppercase font-['F1Title'] text-black dark:text-white">
                Account Login
              </h1>

              {/* Username / Email Input */}
              <div className="w-full max-w-[380px] flex flex-col gap-1">
                <label 
                  htmlFor="usernameOrEmail" 
                  className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Username or Email
                </label>
                <input 
                  id="usernameOrEmail" 
                  name="usernameOrEmail" 
                  type="text" 
                  autoComplete="username"
                  maxLength={100}
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                  placeholder="e.g. racefan or user@example.com"
                  required 
                  className={`w-full h-[42px] px-3.5 outline-none rounded-[5px] bg-[#f1f1f1] dark:bg-[#2c2c30] text-[#111] dark:text-white text-sm font-medium transition-all border ${
                    errors.usernameOrEmail 
                      ? 'border-red-500 shadow-[0_0_0_1px_#ef4444]' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-[#00b9ff] focus:shadow-[0_0_0_2px_#00b9ff]'
                  }`}
                />
                {errors.usernameOrEmail && (
                  <span className="text-xs text-red-500 dark:text-red-400 font-semibold mt-0.5">
                    {errors.usernameOrEmail}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className="w-full max-w-[380px] flex flex-col gap-1">
                <label 
                  htmlFor="password" 
                  className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative w-full">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    name="password" 
                    id="password" 
                    autoComplete="current-password"
                    maxLength={128}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required 
                    className={`w-full h-[42px] px-3.5 pr-11 outline-none rounded-[5px] bg-[#f1f1f1] dark:bg-[#2c2c30] text-[#111] dark:text-white text-sm font-medium transition-all border ${
                      errors.password 
                        ? 'border-red-500 shadow-[0_0_0_1px_#ef4444]' 
                        : 'border-gray-300 dark:border-gray-700 focus:border-[#00b9ff] focus:shadow-[0_0_0_2px_#00b9ff]'
                    }`}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-500 dark:text-gray-400 hover:text-[#00b9ff] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      )}
                    </svg>
                  </button>
                </div>
                {errors.password && (
                  <span className="text-xs text-red-500 dark:text-red-400 font-semibold mt-0.5">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Navigation link */}
              <div className="w-full max-w-[380px] flex justify-end mt-1 mb-2">
                <Link 
                  href="/register"
                  className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:underline hover:text-[#00b9ff] transition-colors"
                >
                  Don&apos;t have an account? <span className="font-bold text-[#00b9ff]">Register here</span>.
                </Link>
              </div>

              {/* Submit Buttons */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full max-w-[380px] h-[44px] bg-[#222] dark:bg-[#00b9ff] text-white dark:text-black font-bold font-['F1RegularBold'] rounded-[4px] border-none cursor-pointer text-sm sm:text-base hover:opacity-90 hover:shadow-[0_0_12px_rgba(0,185,255,0.4)] transition-all flex items-center justify-center disabled:opacity-50"
              >
                {isSubmitting ? 'Validating...' : 'Log In'}
              </button>
              
              <Link href="/" className="w-full max-w-[380px]">
                <button 
                  type="button" 
                  className="w-full h-[40px] bg-transparent border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white rounded-[4px] cursor-pointer font-semibold text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  Go Back Home
                </button>
              </Link>
            </form>
          </article>
        </section>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
