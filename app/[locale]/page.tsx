'use client';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function LandingPage() {
    const t = useTranslations('LandingPage');

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Slider Section */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                className="relative h-[600px]"
            >
                {[1, 2, 3].map((slide) => (
                    <SwiperSlide key={slide}>
                        <div className="relative h-full bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                        {t('hero.title')} {slide}
                                    </h1>
                                    <p className="text-xl mb-8">
                                        {t('hero.subtitle')}
                                    </p>
                                    <Button
                                        size="lg"
                                        className="bg-white text-blue-600"
                                    >
                                        {t('hero.cta')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="swiper-button-next !text-white after:!text-2xl"></div>
                <div className="swiper-button-prev !text-white after:!text-2xl"></div>
                <div className="swiper-pagination !bottom-6"></div>
            </Swiper>

            {/* About Us Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">
                                {t('about.title')}
                            </h2>
                            <p className="text-gray-600 mb-8">
                                {t('about.description')}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-lg shadow-sm">
                                    <h3 className="font-bold mb-2">100+</h3>
                                    <p className="text-sm text-gray-600">
                                        Clients Worldwide
                                    </p>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow-sm">
                                    <h3 className="font-bold mb-2">95%</h3>
                                    <p className="text-sm text-gray-600">
                                        Client Satisfaction
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[400px]">
                            <Image
                                src="/about-image.jpg"
                                alt="About Us"
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Rest of the sections... */}
            {/* Card Section, Brand Section, Testimonials Section */}

            <Footer />
        </div>
    );
}
