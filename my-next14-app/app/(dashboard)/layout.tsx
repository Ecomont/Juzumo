import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};

export default DashboardLayout;