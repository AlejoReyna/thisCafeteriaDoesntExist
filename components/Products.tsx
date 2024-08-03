"use client"
import './Products.css'
import Image from 'next/image';
import coffee1 from '@/public/coffe-1.jpg';
import coffee2 from '@/public/coffe-2.jpg';
import coffee3 from '@/public/coffe-3.jpg';

export default function ProductsComponent() {
    return(
        <div className="min-h-screen cute-bg flex justify-center items-center w-full p-4">
            <div className="flex flex-wrap justify-center gap-4">
                {[coffee1, coffee2, coffee3].map((coffee, index) => (
                    <div key={index} className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded overflow-hidden shadow-lg bg-white">
                        <Image className="w-full" src={coffee} alt="Coffee image"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-black">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base">
                                A good coffee
                            </p>

                            <button type="button" className="bg-pink-400">
                                Add to cart
                            </button>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}