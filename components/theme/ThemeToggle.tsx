'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`w-9 h-9 rounded-full bg-white/10 ${className}`} />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative p-2 rounded-full border border-white/20 hover:border-[#00b9ff] bg-black/40 hover:bg-black/80 text-white transition-all duration-300 flex items-center justify-center group ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 group-hover:rotate-90 transition-transform duration-500 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
      ) : (
        <Moon className="h-4 w-4 text-[#00b9ff] group-hover:-rotate-12 transition-transform duration-500 drop-shadow-[0_0_6px_rgba(0,185,255,0.6)]" />
      )}
    </button>
  );
}
