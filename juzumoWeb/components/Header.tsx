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

    useEffect(() => {
  const el = headerRef.current;
  if (!el) return;

  // 1) Ocultar al hacer scroll hacia abajo, mostrar al subir
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    const goingDown = y > lastY + 6;
    const goingUp = y < lastY - 6;
    lastY = y;
    if (goingDown && y > 24) el.classList.add('nav--hidden');
    else if (goingUp) el.classList.remove('nav--hidden');
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // 2) Compactar nav cuando el sentinel sale del viewport
  const sentinel = document.getElementById('nav-sentinel');
  const io = new IntersectionObserver(
    ([entry]) => {
      const compact = !entry.isIntersecting;
      el.classList.toggle('nav--solid', compact);                // fondo/blurs del nav
      document.documentElement.classList.toggle('nav-compact', compact); // cruza logos
    },
    { rootMargin: '-64px 0px 0px 0px' } // ajusta al alto real del header si no es 64px
  );
  if (sentinel) io.observe(sentinel);

  return () => {
    window.removeEventListener('scroll', onScroll);
    io.disconnect();
  };
}, []);


    return (
        <header ref={headerRef} className="nav sticky top-0 z-50">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid h-16 grid-cols-3 items-center">
                    {/* Left: brand */}
                    <div className="justify-self-start">
                        <Link href="/" className="inline-flex items-center" aria-label={SITE.nombre}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/img/logo.svg"
                                alt={SITE.nombre}
                                className="logo-nav h-8 w-auto"
                                height={32}
                            />
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