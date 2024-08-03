"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import firstPic from "@/public/barizm.webp";
import beanHeart from "@/public/coffe-heart.png";

import './Home.css';

export default function Home() {
    const [isImageVisible, setIsImageVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsImageVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="home-container min-h-screen flex justify-center">
                <div className={`image-container mx-7 ${isImageVisible ? 'fade-in' : ''}`}>
                    <Image src={firstPic} className="rounded-lg" alt="People drinking coffee"/>
                </div>
            </div>

        </>
    );
}