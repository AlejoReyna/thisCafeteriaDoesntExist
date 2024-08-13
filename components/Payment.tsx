"use client"
import './Payment.css';
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import PopupImage from "@/public/popup-img.jpg";

export default function PaymentComponent() {

    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleOpenPopup = (): void => {
        setShowPopup(true);
    }

    const handleClosePopup = (): void => {
        setShowPopup(false);
    }


    const [cardNumber, setCardNumber] = useState<string>('');
    const [cardType, setCardType] = useState<string>('');
    const [cardHolder, setCardHolder] = useState<string>('');
    const [cardValid, setCardValid] = useState<string>('');
    const [cardCCV, setCardCCV] = useState<string>('');

    const detectCardType = (number: string): string => {
        const visaPattern = /^4/;
        const mastercardPattern = /^5[1-5]/;
        const amexPattern = /^3[47]/;
        const discoverPattern = /^6(?:011|5)/;

        if (visaPattern.test(number)) return 'visa';
        if (mastercardPattern.test(number)) return 'mastercard';
        if (amexPattern.test(number)) return 'amex';
        if (discoverPattern.test(number)) return 'discover';
        return 'unknown';
    };

    const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const number = e.target.value.replace(/\s/g, '');
        const formattedNumber = number.replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(formattedNumber);
        setCardType(detectCardType(number));
    }

    const handleCardHolderChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setCardHolder(e.target.value.toUpperCase());
    }

    const handleCardValidChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setCardValid(e.target.value);
    }

    const handleCardCCVChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setCardCCV(e.target.value);
    }

    return (
        <div className="flex min-h-screen navbar-container justify-center items-center">
            <div className="max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Set your card
                </h5>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="Card number"
                    className="mb-3 p-2 w-full border rounded text-black"
                    maxLength={19}
                />
                <input
                    type="text"
                    value={cardHolder}
                    onChange={handleCardHolderChange}
                    placeholder="Card holder"
                    className="mb-3 p-2 w-full border rounded text-black"
                />
                <input
                    type="text"
                    value={cardValid}
                    onChange={handleCardValidChange}
                    placeholder="MM/YY"
                    className="mb-3 p-2 w-full border rounded text-black"
                    maxLength={5}
                />
                <input
                    type="text"
                    value={cardCCV}
                    onChange={handleCardCCVChange}
                    placeholder="CCV"
                    className="mb-3 p-2 w-full border rounded text-black"
                    maxLength={3}
                />

                {(cardType === 'visa' || cardType === 'mastercard') && (
                    <div className={`card ${cardType}`}>
                        <div className="card-inner">
                            <div className="card-front">
                                <div className="card-bg"></div>
                                <div className="card-glow"></div>
                                {cardType === 'visa' ? (
                                    <svg width="72" height="24" viewBox="0 0 72 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" className="logo">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M52.3973 1.01093L51.5588 5.99054C49.0448 4.56717 43.3231 4.23041 43.3231 6.85138C43.3231 7.89285 44.6177 8.60913 46.178 9.47241C48.5444 10.7817 51.5221 12.4291 51.5221 16.062C51.5221 21.8665 45.4731 24 41.4645 24C37.4558 24 34.8325 22.6901 34.8325 22.6901L35.7065 17.4848C38.1115 19.4688 45.4001 20.032 45.4001 16.8863C45.4001 15.5645 43.9656 14.785 42.3019 13.8811C40.0061 12.6336 37.2742 11.1491 37.2742 7.67563C37.2742 1.30988 44.1978 0 47.1132 0C49.8102 0 52.3973 1.01093 52.3973 1.01093ZM66.6055 23.6006H72L67.2966 0.414276H62.5732C60.3923 0.414276 59.8612 2.14215 59.8612 2.14215L51.0996 23.6006H57.2234L58.4481 20.1566H65.9167L66.6055 23.6006ZM60.1406 15.399L63.2275 6.72235L64.9642 15.399H60.1406ZM14.7942 16.3622L20.3951 0.414917H26.7181L17.371 23.6012H11.2498L6.14551 3.45825C2.83215 1.41281 0 0.807495 0 0.807495L0.108643 0.414917H9.36816C11.9161 0.414917 12.1552 2.50314 12.1552 2.50314L14.1313 12.9281L14.132 12.9294L14.7942 16.3622ZM25.3376 23.6006H31.2126L34.8851 0.414917H29.0095L25.3376 23.6006Z"
                                              fill="white"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="24" viewBox="0 0 72 24"
                                         className="logo">
                                        <path d="M15.6 21.9H9.6V2.1H15.6V21.9Z" fill="#FF5F00"/>
                                        <path
                                            d="M10.2 12C10.2 8.2 12 4.8 14.7 2.1C13.1 0.8 11.1 0 9 0C4 0 0 5.4 0 12C0 18.6 4 24 9 24C11.1 24 13.1 23.2 14.7 21.9C12 19.2 10.2 15.8 10.2 12Z"
                                            fill="#EB001B"/>
                                        <path
                                            d="M25.2 12C25.2 18.6 21.2 24 16.2 24C14.1 24 12.1 23.2 10.5 21.9C13.3 19.2 15 15.8 15 12C15 8.2 13.2 4.8 10.5 2.1C12.1 0.8 14.1 0 16.2 0C21.2 0 25.2 5.4 25.2 12Z"
                                            fill="#F79E1B"/>
                                    </svg>
                                )}
                                <div className="card-contactless">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56">
                                        <path fill="none" stroke="#f9f9f9" strokeWidth="6" strokeLinecap="round"
                                              d="m35,3a50,50 0 0,1 0,50M24,8.5a39,39 0 0,1 0,39M13.5,13.55a28.2,28.5 0 0,1 0,28.5M3,19a18,17 0 0,1 0,18"/>
                                    </svg>
                                </div>
                                <div className="card-chip"></div>
                                <div className="card-holder">{cardHolder}</div>
                                <div className="card-number">{cardNumber}</div>
                                <div className="card-valid">{cardValid}</div>
                            </div>
                            <div className="card-back">
                                <div className="card-signature"></div>
                                <div className="card-seccode">{cardCCV}</div>
                            </div>
                        </div>
                    </div>
                )}
                <p className="mt-3 font-normal text-gray-700 dark:text-gray-400">
                    Card: {cardType}
                </p>
                <button type="submit" onClick={"handleOpenPopup"}>
                    Pay
                </button>
            </div>
        </div>

    {showPopup && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800">

                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <button className="self-end text-xl" onClick={handleClosePopup}> x</button>
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
        )};
}