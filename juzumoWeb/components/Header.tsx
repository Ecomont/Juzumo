import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = () => {
    const router = useRouter();

    return (
        <header className="sticky top-0 bg-white backdrop-blur-sm shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold">Frutas DS</h1>
                <nav className="flex space-x-4">
                    <Link href="/" className={`text-gray-700 ${router.pathname === '/' ? 'font-semibold' : ''}`}>
                        Home
                    </Link>
                    <Link href="/fruta" className={`text-gray-700 ${router.pathname === '/fruta' ? 'font-semibold' : ''}`}>
                        Frutas
                    </Link>
                </nav>
                <a href="https://wa.me/1234567890" className="bg-brand-orange-600 text-white px-4 py-2 rounded-md">
                    Contactar por WhatsApp
                </a>
            </div>
        </header>
    );
};

export default Header;