import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales: string[] = ['en', 'es', 'bn'];
export const defaultLocale: string = 'en';

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
    if (!locale || !locales.includes(locale)) {
        notFound();
    }

    try {
        const messages = (await import(`./messages/${locale}.json`)).default;
        return { messages };
    } catch (error) {
        console.error(`Error loading messages for locale: ${locale}`, error);
        notFound(); // Handle missing locale files gracefully
    }
});
