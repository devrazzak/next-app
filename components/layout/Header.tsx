import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="font-bold text-xl text-blue-600">
                        Logo
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="#about"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            About
                        </Link>
                        <Link
                            href="#services"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            Services
                        </Link>
                        <Link
                            href="#testimonials"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            Testimonials
                        </Link>
                        <Link
                            href="#contact"
                            className="text-gray-600 hover:text-blue-600"
                        >
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <Button asChild variant="outline">
                            <Link href="/auth/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/register">Sign Up</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
