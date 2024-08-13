"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import firstPic from "@/public/barizm.webp";
import secondPic from "@/public/first_page_second_image.jpg";
import thirdPic from "@/public/first_page_third_image.jpg";
import fourthPic from "@/public/first_page_fourth_image.jpg";

import './Home.css';

export default function Home() {
    const images = [firstPic, secondPic, thirdPic, fourthPic];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isImageVisible, setIsImageVisible] = useState(true);

    useEffect(() => {
        const imageToggleInterval = setInterval(() => {
            setIsImageVisible(false);

            setTimeout(() => {
                setCurrentImageIndex(prevIndex =>
                    (prevIndex + 1) % images.length
                );
                setIsImageVisible(true);
            }, 1000); // Espera 1 segundo para cambiar la imagen
        }, 10000); // Cambia cada 10 segundos

        return () => clearInterval(imageToggleInterval);
    }, []);

    return (
        <>
            <div className="home-container min-h-screen flex justify-center">
                <div className={`image-container  mx-7 ${isImageVisible ? 'fade-in' : 'fade-out'}`}>
                    <Image src={images[currentImageIndex]}
                           className="px-5 pb-5 "
                           alt="Coffe images changing"
                           layout="fill"
                           objectFit="cover"
                           quality={100}
                    />
                </div>
            </div>
        </>
    );
}