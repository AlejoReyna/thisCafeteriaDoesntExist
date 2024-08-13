"use client"

import { useState, useEffect } from "react";
import './Loader.css';

export default function Loader() {
    const [elementsOpacity, setElementsOpacity] = useState(1);
    const [hrWidth, setHrWidth] = useState(0);
    const [h1Height, setH1Height] = useState(0);
    const [h6Height, setH6Height] = useState(0);

    useEffect(() => {
        // Start the animations immediately
        setHrWidth(100);
        setH1Height(100);
        setH6Height(100);

        // Set a timer to fade out all elements after 2 seconds
        const timer = setTimeout(() => {
            setElementsOpacity(0);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="loader">
            <div className="loader-content">
                <h1 style={{
                    height: `${h1Height}%`,
                    opacity: elementsOpacity,
                    transition: 'height 1s ease-out, opacity 1s ease-out'
                }}>
                    THIS CAFETERIA IS NOT REAL
                </h1>
                <hr style={{
                    width: `${hrWidth}%`,
                    opacity: elementsOpacity,
                    transition: 'width 1s ease-out, opacity 1s ease-out'
                }}/>
                <h6 style={{
                    height: `${h6Height}%`,
                    opacity: elementsOpacity,
                    transition: 'height 1s ease-out, opacity 1s ease-out'
                }}>
                    AND THAT IS AWESOME
                </h6>
            </div>
        </div>
    )
}