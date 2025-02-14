'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { locales } from '@/i18n';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        // Get the current path without the locale
        const currentPath = window.location.pathname.replace(`/${locale}`, '');
        router.push(`/${newLocale}${currentPath}`);
    };

    return (
        <select
            value={locale}
            onChange={handleChange}
            className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
            {locales.map((loc) => (
                <option key={loc} value={loc}>
                    {loc.toUpperCase()}
                </option>
            ))}
        </select>
    );
}
