"use client";

import React from 'react';
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

    return (
        <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
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
                                            'transition-colors hover:text-gray-900 ' +
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
                            className="rounded-md bg-brand-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-green-700"
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