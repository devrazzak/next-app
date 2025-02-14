import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Company</h3>
                        <p className="text-gray-400 mb-4">
                            Building the future of digital solutions
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            {/* Add more social icons */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-400 hover:text-white"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/services/web"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Web Development
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/mobile"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Mobile Apps
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/consulting"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Consulting
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>contact@company.com</li>
                            <li>+1 (555) 123-4567</li>
                            <li>123 Business Street</li>
                            <li>City, State 12345</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} Company Name. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
