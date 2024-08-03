"use client"

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start px-4">
                <div className="mb-6 sm:mb-0">
                    <h2 className="text-2xl font-bold mb-2">This cafeteria doesn&#39;t exist</h2>
                    <hr className="border-gray-600 w-full mb-2"/>
                    <p className="text-sm text-gray-400">And that is awesome</p>
                </div>
                <div className="flex space-x-6 mt-4 sm:mt-0">
                <a href="#" className="text-3xl hover:text-gray-400 transition-colors duration-300"><FaFacebook /></a>
                    <a href="#" className="text-3xl hover:text-gray-400 transition-colors duration-300"><FaTwitter /></a>
                    <a href="#" className="text-3xl hover:text-gray-400 transition-colors duration-300"><FaInstagram /></a>
                </div>
            </div>
        </footer>
    );
}