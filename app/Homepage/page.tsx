"use client"

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Home from '@/components/Home';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

export default function Homepage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Navbar />
                    <Home />
                    <Footer/>
                </>
            )}
        </>
    );
}