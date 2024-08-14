"use client"
import {useState, useEffect, FormEvent} from "react";
import "./Navbar.css";
import Link from 'next/link';
import PopupImage from '@/public/coffee-bags.webp';
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";


export default function Navbar() {

    // Username functions
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const getUsername = (): string => {
        return localStorage.getItem("username") || "LOG IN";
    }

    // UserImage functions
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setProfileImage(base64String);
                localStorage.setItem('profileImage', base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);


    const [showDropdown, setShowDropdown] = useState<Boolean>(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const [changeForm, setChangeForm] = useState(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const handleOpenPopup = (): void => {
        setShowPopup(true);
        setChangeForm(false);
    }

    const handleClosePopup = (): void => {
        setShowPopup(false);
        setChangeForm(false);
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

    const handleChangeForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        setChangeForm(true);
        setShowPopup(false);
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
                    <a className="hover-effect navbar-brand text-black tracking-widest mx-6 sm:text-2xl md:text-3xl lg:text-4xl" href="/">
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
                        className="text-sm text-black mx-8 flex items-center justify-end cursor-pointer"
                        onClick={isLoggedIn ? toggleDropdown : handleOpenPopup}>
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

            {/* Menú desplegable vertical (HAY QUE DOCUMENTAR ESTA PARTE) */}
            {showDropdown && (
                <div className="fixed top-0 right-0 h-full w-64 bg-black bg-opacity-90 shadow-lg z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
                    <div className="p-4">
                        <button onClick={toggleDropdown} className="float-right text-2xl">&times;</button>
                        <div className="flex flex-col items-center mb-4">
                            <label htmlFor="profile-pic" className="cursor-pointer">
                                <div
                                    className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={profileImage || "/default-avatar.png"}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </label>
                            <input
                                type="file"
                                id="profile-pic"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <h2 className="text-xl font-bold mb-4">Menu</h2>
                        <ul>
                            <li className="mb-2">
                                <span>
                                    {getUsername()}
                                </span>
                            </li>
                            <li className="mb-2">
                                <Link href="" className="block p-2 hover:bg-gray-100">
                                    Orders
                                </Link>
                            </li>
                            <li className="mb-2">
                                <button
                                    onClick={() => {
                                        // Lógica para cerrar sesión
                                        localStorage.clear();
                                        setIsLoggedIn(false);
                                        setShowDropdown(false);
                                        setProfileImage(null);

                                    }}
                                    className="block w-full text-left p-2 hover:bg-gray-100"
                                >
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div
                        className="flex border border-gray-200 rounded-lg shadow dark:border-gray-700 bg-black bg-opacity-75 w-full max-w-4xl h-3/4">
                        <div className="w-2/3 h-full">
                            <Image
                                className="object-cover w-full h-full rounded-l-lg"
                                src={PopupImage}
                                alt="Coffee"
                            />
                        </div>
                        <div className="w-1/3 flex flex-col justify-between p-4 leading-normal h-full">
                            <button className="self-end text-xl" onClick={handleClosePopup}> x</button>
                            <h1 className="navbar-brand mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                THE COFFEE YOU LOVE, AT A FORM OF DISTANCE.
                            </h1>
                            <form onSubmit={handleSubmit} className="flex-grow">
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
                                    className="w-full mt-4 px-4 py-2 bg-amber-900 text-white rounded hover:bg-amber-800"
                                >
                                    Submit
                                </button>
                                <button onClick={handleChangeForm}> Already have an account? </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {changeForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div
                        className="flex border border-gray-200 rounded-lg shadow dark:border-gray-700 bg-black bg-opacity-75 w-full max-w-4xl h-3/4">
                        <div className="w-2/3 h-full">
                            <Image
                                className="object-cover w-full h-full rounded-l-lg"
                                src={PopupImage}
                                alt="Coffee"
                            />
                        </div>
                        <div className="w-1/3 flex flex-col justify-between p-4 leading-normal h-full">
                            <button className="self-end text-xl" onClick={handleClosePopup}> x</button>
                            <h1 className="navbar-brand mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                THE COFFEE YOU LOVE, AT A FORM OF DISTANCE.
                            </h1>
                            <form onSubmit={handleSubmit} className="flex-grow">
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
                                    className="w-full mt-4 px-4 py-2 bg-amber-900 text-white rounded hover:bg-amber-800"
                                >
                                    Submit
                                </button>
                                <button onClick={handleOpenPopup}> Don't have an account?</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};