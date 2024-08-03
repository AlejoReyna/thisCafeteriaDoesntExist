"use client"
import {useState} from "react";
import "./Navbar.css";
import Link from 'next/link';

export default function Navbar() {

    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleClosePopup = (): void => {
        setShowPopup(false);
    }

    return (
        <>
            <nav className="navbar navbar-container flex items-center justify-between flex-wrap">
                <div className="navbar-brand-container w-1/4 flex items-center flex-shrink-0 text-black py-4">
                    <a className="hover-effect navbar-brand text-black tracking-widest mx-6" href="/">
                        THIS CAFETERIA IS NOT REAL
                    </a>
                </div>

                {/** For smol screen **/}
                <div className="block lg:hidden">
                    <button className="flex items-center px-8 py-2 rounded text-black">
                        <svg className="fill-current h-5 w-5" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                        </svg>
                    </button>
                </div>

                <div className="nav-elements hidden w-1/2 lg:flex lg:items-center lg:justify-center">
                    <div className="text-sm text-black lg:flex lg:justify-center lg:items-center">
                        <a className="block lg:inline-block mr-4 hover-effect">
                            ABOUT US
                        </a>
                        <Link href="/Products"
                           className="block lg:inline-block mr-4 hover-effect">
                            OUR PRODUCTS
                        </Link>
                        <a href="#responsive-header"
                           className="block lg:inline-block hover-effect">
                            OUR STORES
                        </a>
                    </div>
                </div>

                <div className="hidden lg:block w-1/4 text-right">
                    {/**
                    <button className="bg-black hover:bg-gray-700 text-white rounded-xl px-2 mx-8 py-1">
                        <span className="text-sm"> SUPPORT </span>
                    </button>
                     **/}
                    <span className="text-sm text-black mx-8"> LOG IN </span>
                </div>
            </nav>
        </>
    );
};