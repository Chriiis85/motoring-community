import { dictionaries, Language } from './dictionaries';
import { cookies } from 'next/headers';

export async function getTranslations() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as Language;
  const dictionary = dictionaries[lang] || dictionaries['en'];
  
  return {
    t: (key: keyof typeof dictionaries['en']) => dictionary[key] || dictionaries['en'][key]
  };
}
