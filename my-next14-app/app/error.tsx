import React from 'react';

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-red-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
                <p className="mt-4 text-lg text-gray-700">We're sorry, but an error has occurred. Please try again later.</p>
            </div>
        </div>
    );
};

export default ErrorPage;