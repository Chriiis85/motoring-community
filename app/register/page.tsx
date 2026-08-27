'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';

interface FormErrors {
  username?: string;
  email?: string;
  name?: string;
  surname?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const sanitizedUsername = formData.username.trim();
    const sanitizedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Username validation
    if (!sanitizedUsername) {
      newErrors.username = 'Username is required.';
    } else if (sanitizedUsername.length < 3 || sanitizedUsername.length > 20) {
      newErrors.username = 'Username must be between 3 and 20 characters.';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(sanitizedUsername)) {
      newErrors.username = 'Only letters, numbers, hyphens and underscores allowed.';
    }

    // Email validation
    if (!sanitizedEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(sanitizedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'First name is required.';
    }

    // Surname validation
    if (!formData.surname.trim()) {
      newErrors.surname = 'Last name is required.';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password should contain at least 1 uppercase letter and 1 number.';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate safe registration & validation
    setTimeout(() => {
      setIsSubmitting(false);
      setRegisterSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col font-['F1Regular']">
      <main className="flex-grow flex items-center justify-center relative overflow-hidden bg-[#f3f3f3] dark:bg-[#121212] min-h-[100vh] py-[6vh] px-4">
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
        
        <section className="relative z-10 w-full max-w-5xl min-h-[700px] flex flex-row bg-white dark:bg-[#1a1a1a] border-2 border-black dark:border-gray-700 rounded-[15px] shadow-[0_15px_35px_rgba(0,0,0,0.4)] overflow-hidden transition-colors duration-300">
          
          {/* Form Side Image */}
          <article className="hidden lg:block relative w-[38%] min-h-full border-r-2 border-black dark:border-gray-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10" />
            <Image
              src="/images/Register-img.jpg"
              alt="Motoring Community Register"
              fill
              className="object-cover z-0"
              priority
            />
          </article>

          {/* Form Content */}
          <article className="w-full lg:w-[62%] p-6 sm:p-10 flex flex-col justify-center">
            <form 
              onSubmit={handleRegister} 
              noValidate
              className="w-full flex flex-col items-center justify-center gap-3"
            >
              {/* Notice Banner */}
              <div className="w-full bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 text-amber-900 dark:text-amber-300 p-3 rounded text-xs sm:text-sm text-center shadow-sm" role="alert">
                <p className="font-bold">⚠️ Aviso / Preview Demo</p>
                <p>Módulo de registro con tipado y validación de seguridad completa.</p>
              </div>

              {registerSuccess && (
                <div className="w-full bg-emerald-50 dark:bg-emerald-950/40 border-l-4 border-emerald-500 text-emerald-900 dark:text-emerald-300 p-3 rounded text-sm text-center animate-in fade-in" role="status">
                  <p className="font-bold">✓ Registro validado con éxito</p>
                  <p>Redirigiendo a la pantalla de Login...</p>
                </div>
              )}

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mt-1 mb-2 tracking-wide uppercase font-['F1Title'] text-black dark:text-white">
                Create Account
              </h1>

              {/* Username Input */}
              <div className="w-full max-w-[440px] flex flex-col gap-1">
                <label htmlFor="username" className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <input 
                  id="username" 
                  name="username" 
                  type="text" 
                  autoComplete="username"
                  maxLength={20}
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. max_verstappen1"
                  required 
                  className={`w-full h-[40px] px-3.5 outline-none rounded-[5px] bg-[#f1f1f1] dark:bg-[#2c2c30] text-[#111] dark:text-white text-sm font-medium transition-all border ${
                    errors.username 
                      ? 'border-red-500 shadow-[0_0_0_1px_#ef4444]' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-[#00b9ff] focus:shadow-[0_0_0_2px_#00b9ff]'
                  }`}
                />
                {errors.username && <span className="text-xs text-red-500 dark:text-red-400 font-semibold">{errors.username}</span>}
              </div>

              {/* Email Input */}
              <div className="w-full max-w-[440px] flex flex-col gap-1">
                <label htmlFor="email" className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  autoComplete="email"
                  maxLength={100}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. driver@formula1.com"
                  required 
                  className={`w-full h-[40px] px-3.5 outline-none rounded-[5px] bg-[#f1f1f1] dark:bg-[#2c2c30] text-[#111] dark:text-white text-sm font-medium transition-all border ${
                    errors.email 
                      ? 'border-red-500 shadow-[0_0_0_1px_#ef4444]' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-[#00b9ff] focus:shadow-[0_0_0_2px_#00b9ff]'
                  }`}
                />
                {errors.email && <span className="text-xs text-red-500 dark:text-red-400 font-semibold">{errors.email}</span>}
              </div>

              {/* Name & Surname grid */}
              <div className="w-full max-w-[440px] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    autoComplete="given-name"
                    maxLength={50}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Fernando"
                    required 
                    className={`w-full h-[40px] px-3.5 outline-none rounded-[5px] bg-[#f1f1f1] dark:bg-[#2c2c30] text-[#111] dark:text-white text-sm font-medium transition-all border ${
                      errors.name 
                        ? 'border-red-500 shadow-[0_0_0_1px_#ef4444]' 
                        : 'border-gray-300 dark:border-gray-700 focus:border-[#00b9ff] focus:shadow-[0_0_0_2px_#00b9ff]'
                    }`}
                  />
                  {errors.name && <span className="text-xs text-red-500 dark:text-red-400 font-semibold">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="surname" className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input 
                    id="surname" 
                    name="surname" 
                    type="text" 
                    autoComplete="family-name"
                    maxLength={50}
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Alonso"
                    required 
                    className={`w-full h-[40px] px-3.5 outline-none rounded-[5px] bg-[#f1f1f1] dark:bg-[#2c2c30] text-[#111] dark:text-white text-sm font-medium transition-all border ${
                      errors.surname 
                        ? 'border-red-500 shadow-[0_0_0_1px_#ef4444]' 
                        : 'border-gray-300 dark:border-gray-700 focus:border-[#00b9ff] focus:shadow-[0_0_0_2px_#00b9ff]'
                    }`}
                  />
                  {errors.surname && <span className="text-xs text-red-500 dark:text-red-400 font-semibold">{errors.surname}</span>}
                </div>
              </div>

              {/* Password Input */}
              <div className="w-full max-w-[440px] flex flex-col gap-1">
                <label htmlFor="password" className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Password (min. 8 chars, 1 uppercase, 1 number)
                </label>
                <div className="relative w-full">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    name="password" 
                    id="password" 
                    autoComplete="new-password"
                    maxLength={128}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required 
                    className={`w-full h-[40px] px-3.5 pr-11 outline-none rounded-[5px] bg-[#f1f1f1] dark:bg-[#2c2c30] text-[#111] dark:text-white text-sm font-medium transition-all border ${
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
                {errors.password && <span className="text-xs text-red-500 dark:text-red-400 font-semibold">{errors.password}</span>}
              </div>

              {/* Confirm Password Input */}
              <div className="w-full max-w-[440px] flex flex-col gap-1">
                <label htmlFor="confirmPassword" className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="relative w-full">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    autoComplete="new-password"
                    maxLength={128}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required 
                    className={`w-full h-[40px] px-3.5 pr-11 outline-none rounded-[5px] bg-[#f1f1f1] dark:bg-[#2c2c30] text-[#111] dark:text-white text-sm font-medium transition-all border ${
                      errors.confirmPassword 
                        ? 'border-red-500 shadow-[0_0_0_1px_#ef4444]' 
                        : 'border-gray-300 dark:border-gray-700 focus:border-[#00b9ff] focus:shadow-[0_0_0_2px_#00b9ff]'
                    }`}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-500 dark:text-gray-400 hover:text-[#00b9ff] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      {showConfirmPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      )}
                    </svg>
                  </button>
                </div>
                {errors.confirmPassword && <span className="text-xs text-red-500 dark:text-red-400 font-semibold">{errors.confirmPassword}</span>}
              </div>

              {/* Navigation link */}
              <div className="w-full max-w-[440px] flex justify-end mt-1 mb-2">
                <Link 
                  href="/login"
                  className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:underline hover:text-[#00b9ff] transition-colors"
                >
                  Already have an account? <span className="font-bold text-[#00b9ff]">Login here</span>.
                </Link>
              </div>

              {/* Submit Buttons */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full max-w-[440px] h-[44px] bg-[#222] dark:bg-[#00b9ff] text-white dark:text-black font-bold font-['F1RegularBold'] rounded-[4px] border-none cursor-pointer text-sm sm:text-base hover:opacity-90 hover:shadow-[0_0_12px_rgba(0,185,255,0.4)] transition-all flex items-center justify-center disabled:opacity-50"
              >
                {isSubmitting ? 'Validating Account...' : 'Register Account'}
              </button>
              
              <Link href="/" className="w-full max-w-[440px]">
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
