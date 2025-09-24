import Link from 'next/link';

const Header = () => {
    return (
        <header className="sticky top-0 bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link href="/">Juzumo</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/pricing">Pricing</Link>
                        </li>
                        <li>
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;