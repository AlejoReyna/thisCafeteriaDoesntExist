"use client"
import CartComponent from "@/components/Cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CartPage() {
    return(
        <>
            <Navbar/>
            <CartComponent />
            <Footer/>
        </>
    );
}