"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/site';

const NAV_LINKS_LEFT = [
    { href: '/bares', label: 'Bares' },
    { href: '/fruta', label: 'Fruta' },
    { href: '/blog', label: 'Blog' },
];

const NAV_LINKS_RIGHT = [
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
    
    // Activar nav--solid cuando se baja del hero
    if (y > 100) {
      el.classList.add('nav--solid');
    } else {
      el.classList.remove('nav--solid');
    }
  };
  
  onScroll(); // Ejecutar inmediatamente para estado inicial
  window.addEventListener('scroll', onScroll, { passive: true });

  // 2) Compactar nav cuando el sentinel sale del viewport
  const sentinel = document.getElementById('nav-sentinel');
  const io = new IntersectionObserver(
    ([entry]) => {
      const compact = !entry.isIntersecting;
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
                <div className="flex h-16 items-center justify-between gap-6">
                    {/* Left: Bares, Fruta, Blog */}
                    <nav className="flex-1">
                        <ul className="flex items-center gap-6 text-sm">
                            {NAV_LINKS_LEFT.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={
                                            'underline-slide transition-colors hover:text-gray-900 focus-visible:text-gray-900 ' +
                                            (isActive(link.href) ? 'font-semibold text-gray-900' : 'text-gray-700')
                                        }
                                        style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Center: Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="inline-flex items-center" aria-label={SITE.nombre}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/img/logo.svg"
                                alt={SITE.nombre}
                                className="logo-nav h-8 w-auto drop-shadow-md"
                                height={32}
                            />
                        </Link>
                    </div>

                    {/* Right: Contacto + WhatsApp */}
                    <div className="flex flex-1 items-center justify-end gap-6">
                        <nav>
                            <ul className="flex items-center gap-6 text-sm">
                                {NAV_LINKS_RIGHT.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={
                                                'underline-slide transition-colors hover:text-gray-900 focus-visible:text-gray-900 ' +
                                                (isActive(link.href) ? 'font-semibold text-gray-900' : 'text-gray-700')
                                            }
                                            style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <a
                            href={`https://wa.me/${SITE.whatsapp}`}
                            className="rounded-md bg-brand-green-600 px-4 py-2 text-sm font-medium text-white shadow-md duration-ui ease-motion hover:bg-brand-green-700"
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