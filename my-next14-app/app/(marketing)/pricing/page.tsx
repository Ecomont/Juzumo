import React from 'react';

const PricingPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Pricing</h1>
            <p className="mb-4">Choose a plan that fits your needs.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Basic Plan</h2>
                    <p className="text-lg">$10/month</p>
                    <ul className="list-disc pl-5">
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                    </ul>
                    <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Select</button>
                </div>
                <div className="border p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Pro Plan</h2>
                    <p className="text-lg">$20/month</p>
                    <ul className="list-disc pl-5">
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                        <li>Feature 4</li>
                    </ul>
                    <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Select</button>
                </div>
                <div className="border p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Enterprise Plan</h2>
                    <p className="text-lg">Contact us for pricing</p>
                    <ul className="list-disc pl-5">
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                        <li>Feature 4</li>
                        <li>Feature 5</li>
                    </ul>
                    <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Contact Us</button>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;