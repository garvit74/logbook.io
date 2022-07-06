import React, { useEffect, useState } from 'react';
import { getcategory2 } from '../services';
import Link from 'next/link';




const NavBar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getcategory2()
            .then((newCategories) => setCategories(newCategories))
    }, []);

    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='border-b w-full inline-block border-blue-400 py-8'>
                <div className='md: float-left block'>
                    <Link href="/">
                        <span className='cursor-pointer transition duration-1000 transform hover:text-amber-800 font-bold text-4xl text-white'>
                            Logbook.io
                        </span>
                    </Link>
                </div>
                <div className=' hidden md:float-left md:contents'>
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className='md:float-right mt-2 align-middle text-white transition duration-1000 transform hover:text-amber-800 ml-4 font-semibold cursor-pointer'>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NavBar