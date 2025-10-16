"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/site';

const NAV_LINKS = [
    { href: '/bares', label: 'Bares' },
    { href: '/fruta', label: 'Fruta' },
    { href: '/blog', label: 'Blog' },
    { href: '/contacto', label: 'Contacto' },
];

const Header = () => {
    const pathname = usePathname() || '/';

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname === href || pathname.startsWith(href + '/');
    };

    const headerRef = useRef<HTMLElement | null>(null);

    // Scroll behavior: hide on scroll down, show on scroll up; solid when not over hero
    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;

        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            const goingDown = y > lastY + 4; // small hysteresis
            const goingUp = y < lastY - 4;
            lastY = y;

            // Toggle hidden on scroll down
            if (goingDown && y > 24) {
                el.classList.add('nav--hidden');
            } else if (goingUp) {
                el.classList.remove('nav--hidden');
            }

            // Solid after passing hero height (approx first viewport)
            const hero = document.getElementById('hero');
            const threshold = hero?.getBoundingClientRect().bottom ?? 0;
            const isOverHero = threshold > 0; // bottom still visible in viewport
            if (!isOverHero || y > (hero ? hero.offsetHeight - 64 : 200)) {
                el.classList.add('nav--solid');
            } else {
                el.classList.remove('nav--solid');
            }
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header ref={headerRef} className="nav sticky top-0 z-50">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid h-16 grid-cols-3 items-center">
                    {/* Left: brand */}
                    <div className="justify-self-start">
                        <Link href="/" className="text-lg font-semibold text-gray-800">
                            {SITE.nombre}
                        </Link>
                    </div>

                    {/* Center: navbar */}
                    <nav className="justify-self-center">
                        <ul className="flex items-center gap-6 text-sm">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={
                                            'underline-slide transition-colors hover:text-gray-900 focus-visible:text-gray-900 ' +
                                            (isActive(link.href) ? 'font-semibold text-gray-900' : 'text-gray-700')
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right: WhatsApp CTA */}
                    <div className="justify-self-end">
                        <a
                            href={`https://wa.me/${SITE.whatsapp}`}
                            className="rounded-md bg-brand-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm duration-ui ease-motion hover:bg-brand-green-700"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;