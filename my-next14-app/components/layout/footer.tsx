import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <div className="mb-2">
                    <p>Contact Us:</p>
                    <p>Name: Your Company Name</p>
                    <p>Address: Your Address Here</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
                <div className="mb-2">
                    <p>Hours:</p>
                    <p>Monday - Friday: 9 AM - 5 PM</p>
                    <p>Saturday: 10 AM - 4 PM</p>
                    <p>Sunday: Closed</p>
                </div>
                <div>
                    <a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a> | 
                    <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;