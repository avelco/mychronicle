'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useState, useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    setIsOpen(false);
    
    startTransition(() => {
      // Replace the current locale in the pathname with the new locale
      const segments = pathname.split('/');
      segments[1] = newLocale; // Replace locale segment
      const newPath = segments.join('/');
      
      router.push(newPath);
      router.refresh();
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-slate-800"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-32 rounded-lg border border-slate-800 bg-slate-900 shadow-lg z-50">
            <button
              onClick={() => switchLocale('es')}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-800 transition-colors first:rounded-t-lg ${
                locale === 'es' ? 'text-violet-400 font-medium bg-slate-800/50' : 'text-slate-300'
              }`}
            >
              Español
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-800 transition-colors last:rounded-b-lg ${
                locale === 'en' ? 'text-violet-400 font-medium bg-slate-800/50' : 'text-slate-300'
              }`}
            >
              English
            </button>
          </div>
        </>
      )}
    </div>
  );
}
