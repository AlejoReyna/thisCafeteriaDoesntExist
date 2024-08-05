"use client"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PaymentComponent from '@/components/Payment';

export default function PaymentPage() {
    return(
        <>
            <Navbar/>
            <PaymentComponent/>
            <Footer/>
        </>
    );
}