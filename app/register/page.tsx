'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Registration successful!');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center relative overflow-hidden bg-[#f3f3f3] min-h-[100vh] py-[10vh]">
        <div 
          className="absolute inset-0 z-0"
          style={{
            '--s': '200px',
            '--c1': '#222222',
            '--c2': '#4e4f51',
            '--c3': '#3c3c3c',
            background: `repeating-conic-gradient(from 30deg, #0000 0 120deg, var(--c3) 0 180deg) calc(0.5 * var(--s)) calc(0.5 * var(--s) * 0.577), repeating-conic-gradient(from 30deg, var(--c1) 0 60deg, var(--c2) 0 120deg, var(--c3) 0 180deg)`,
            backgroundSize: 'var(--s) calc(var(--s) * 0.577)'
          } as React.CSSProperties}
        />
        
        <section className="relative z-10 w-[90%] md:w-[70%] min-h-[600px] flex flex-row bg-white border-2 border-black rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
          {/* FOTO DEL FORMULARIO */}
          <article className="hidden md:flex relative w-[40%] min-h-[600px] rounded-l-[11px] border-r-2 border-black overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/25 z-10" />
            <img
              src="/images/Register-img.jpg"
              alt="Register Image"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          </article>

          {/* FORMULARIO PARA EL REGISTRO */}
          <article className="w-full md:w-[60%] flex items-center justify-center py-8">
            <form 
              onSubmit={handleRegister} 
              className="w-full px-[5%] py-[2%] flex flex-col items-center justify-center gap-3"
            >
              <div className="w-[90%] md:w-[80%] bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mb-2 rounded shadow-sm text-sm md:text-base text-center" role="alert">
                <p className="font-bold">⚠️ Aviso / Warning</p>
                <p>Esta sección es solo una demostración visual y actualmente no tiene funcionalidad real.</p>
              </div>

              <h1 className="text-[2em] md:text-[2.5em] font-bold text-center mt-2 mb-4 tracking-wide uppercase font-['F1Title']">
                Motoring Community Register
              </h1>

              <div className="relative my-[8px] w-[200px] sm:w-[300px] md:w-[500px]">
                <input 
                  id="mail" 
                  name="mail" 
                  type="text" 
                  required 
                  className="peer w-full h-[40px] px-[15px] py-[10px] outline-none border-none rounded-[5px] bg-[#f1f1f1] text-[#333] text-[16px] font-semibold transition-all duration-300 shadow-[0_0_0_5px_transparent] focus:shadow-[0_0_0_2px_#333] hover:shadow-[0_0_0_2px_#333] box-content"
                />
                <span className="absolute left-0 top-0 py-[8px] px-[15px] text-[#333] text-[16px] font-semibold transition-all duration-300 pointer-events-none peer-focus:-translate-y-[32px] peer-focus:translate-x-[-5px] peer-focus:scale-95 peer-valid:-translate-y-[32px] peer-valid:translate-x-[-5px] peer-valid:scale-95"
                      style={{ textShadow: '-1px -1px 0 #f1f1f1, 1px -1px 0 #f1f1f1, -1px 1px 0 #f1f1f1, 1px 1px 0 #f1f1f1' }}>
                  Username
                </span>
              </div>

              <div className="relative my-[8px] w-[200px] sm:w-[300px] md:w-[500px]">
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  className="peer w-full h-[40px] px-[15px] py-[10px] outline-none border-none rounded-[5px] bg-[#f1f1f1] text-[#333] text-[16px] font-semibold transition-all duration-300 shadow-[0_0_0_5px_transparent] focus:shadow-[0_0_0_2px_#333] hover:shadow-[0_0_0_2px_#333] box-content"
                />
                <span className="absolute left-0 top-0 py-[8px] px-[15px] text-[#333] text-[16px] font-semibold transition-all duration-300 pointer-events-none peer-focus:-translate-y-[32px] peer-focus:translate-x-[-5px] peer-focus:scale-95 peer-valid:-translate-y-[32px] peer-valid:translate-x-[-5px] peer-valid:scale-95"
                      style={{ textShadow: '-1px -1px 0 #f1f1f1, 1px -1px 0 #f1f1f1, -1px 1px 0 #f1f1f1, 1px 1px 0 #f1f1f1' }}>
                  Name
                </span>
              </div>

              <div className="relative my-[8px] w-[200px] sm:w-[300px] md:w-[500px]">
                <input 
                  id="surname" 
                  name="surname" 
                  type="text" 
                  required 
                  className="peer w-full h-[40px] px-[15px] py-[10px] outline-none border-none rounded-[5px] bg-[#f1f1f1] text-[#333] text-[16px] font-semibold transition-all duration-300 shadow-[0_0_0_5px_transparent] focus:shadow-[0_0_0_2px_#333] hover:shadow-[0_0_0_2px_#333] box-content"
                />
                <span className="absolute left-0 top-0 py-[8px] px-[15px] text-[#333] text-[16px] font-semibold transition-all duration-300 pointer-events-none peer-focus:-translate-y-[32px] peer-focus:translate-x-[-5px] peer-focus:scale-95 peer-valid:-translate-y-[32px] peer-valid:translate-x-[-5px] peer-valid:scale-95"
                      style={{ textShadow: '-1px -1px 0 #f1f1f1, 1px -1px 0 #f1f1f1, -1px 1px 0 #f1f1f1, 1px 1px 0 #f1f1f1' }}>
                  Surname
                </span>
              </div>

              <div className="relative my-[8px] w-[200px] sm:w-[300px] md:w-[500px]">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="passwordRegister" 
                  id="passwordRegister" 
                  required 
                  className="peer w-full h-[40px] px-[15px] py-[10px] pr-[40px] outline-none border-none rounded-[5px] bg-[#f1f1f1] text-[#333] text-[16px] font-semibold transition-all duration-300 shadow-[0_0_0_5px_transparent] focus:shadow-[0_0_0_2px_#333] hover:shadow-[0_0_0_2px_#333] box-content"
                />
                <span className="absolute left-0 top-0 py-[8px] px-[15px] text-[#333] text-[16px] font-semibold transition-all duration-300 pointer-events-none peer-focus:-translate-y-[32px] peer-focus:translate-x-[-5px] peer-focus:scale-95 peer-valid:-translate-y-[32px] peer-valid:translate-x-[-5px] peer-valid:scale-95"
                      style={{ textShadow: '-1px -1px 0 #f1f1f1, 1px -1px 0 #f1f1f1, -1px 1px 0 #f1f1f1, 1px 1px 0 #f1f1f1' }}>
                  Password
                </span>
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[10px] top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[#333] w-[30px] flex justify-center mt-[10px]"
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

              <div className="w-[200px] sm:w-[300px] md:w-[500px] flex md:justify-end justify-center mb-2 md:-mt-2">
                <Link 
                  href="/login"
                  className="text-[0.9em] md:text-base hover:cursor-pointer hover:underline hover:decoration-[#00b9ff] hover:decoration-2"
                >
                  Have an account? Login here.
                </Link>
              </div>

              <button 
                type="submit" 
                className="mb-2 bg-[#222] rounded-[4px] border-none text-white cursor-pointer inline-block font-bold leading-[1.5] min-h-[44px] min-w-[10px] px-[20px] py-[8px] text-center w-[150px] md:w-[200px] hover:opacity-75 transition-opacity"
              >
                Register
              </button>
              
              <Link href="/">
                <button 
                  type="button" 
                  className="bg-[#222] rounded-[4px] border-none text-white cursor-pointer inline-block font-bold leading-[1.5] min-h-[44px] min-w-[10px] px-[20px] py-[8px] text-center w-[150px] md:w-[200px] hover:opacity-75 transition-opacity"
                >
                  Go Home
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
