"use client"
import {useState, useEffect, FormEvent} from "react";
import "./Navbar.css";
import Link from 'next/link';
import PopupImage from '@/public/popup-img.jpg';
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";

export default function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const getUsername = (): string => {
        return localStorage.getItem("username") || "LOG IN";
    }

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const handleOpenPopup = (): void => {
        setShowPopup(true);
    }

    const handleClosePopup = (): void => {
        setShowPopup(false);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("username", username);

        // Save both data in a same object
        localStorage.setItem('userData', JSON.stringify([email, password]) );

        setIsLoggedIn(true);
        handleClosePopup();
    }

    // Verifies if there's an already logged user
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setIsLoggedIn(true);
        }
    }, []);

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
                        <a
                           className="block lg:inline-block hover-effect">
                            OUR STORES
                        </a>
                    </div>
                </div>

                <div className="hidden lg:block w-1/4 text-right">
                    <span
                        className="text-sm text-black mx-8 flex items-center justify-end"
                        onClick={isLoggedIn ? undefined : handleOpenPopup}>
                        {isLoggedIn ? (
                            <>

                                <Link href="/Cart">
                                    <CiShoppingCart className="ml-2 text-xl cursor-pointer"/>
                                </Link>
                                <span className="mr-2"> {getUsername()}</span>
                            </>
                        ) : (
                            <span onClick={handleOpenPopup}>LOG IN</span>
                        )}
                    </span>
                </div>
            </nav>

            {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800">
                        <Image
                            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                            src={PopupImage}
                            alt="Coffee"
                        />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <button className="self-end text-xl" onClick={handleClosePopup}> x </button>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Register to order some tasty coffee
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <label className="block mb-2">
                                    Email
                                    <input
                                        type="email"
                                        value={email}
                                        required
                                        onChange={handleEmailChange}
                                        className="text-black w-full px-2 py-1 border rounded"
                                    />
                                </label>

                                <label className="block mb-2">
                                    Username
                                    <input
                                        type="name"
                                        value={username}
                                        required
                                        onChange={handleUsernameChange}
                                        className="text-black w-full px-2 py-1 border rounded"
                                    />
                                </label>

                                <label className="block mb-2">
                                    Password
                                    <input
                                        type="password"
                                        value={password}
                                        required
                                        onChange={handlePasswordChange}
                                        className="text-black w-full px-2 py-1 border rounded"
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};