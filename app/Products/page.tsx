"use client"

import Navbar from '@/components/Navbar';
import ProductsComponent from "@/components/Products";
import Image from "next/image";
import './Products.css';
import beanHeart from "@/public/coffe-heart.png";

export default function ProductsPage() {
    return(
        <>
            <Navbar/>
            <div className="flex bg-green  items-center justify-center w-full">

                <div className="w-1/2">
                    <div className="productsTitle text-black tracking-widest mx-10">
                        <h1 className="text-4xl"> Every coffee bean has a bit of story. </h1>
                        <p className="text-base"> We&apos;d love to share a bit of them to you </p>
                    </div>
                </div>

                <div className="w-1/2">

                    <div className="image-container mx-20">
                        <Image src={beanHeart} className="w-60" alt="A hearth made of coffee beans"/>
                    </div>
                </div>
            </div>

            <ProductsComponent/>
        </>
    );
}