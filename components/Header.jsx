import Link from 'next/link';
import React, {useContext} from 'react'

const Categories = [{name: 'React', slug:'react'}, {name:'Web Development', slug:'webdev'}]

const Header = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
        <div className="border-b w-full inline-block border-blue-400 py-8">
            <div className="md:float-left block">
                <Link href='/'>
                    <span className="cursor-pointer font-bold text-4xl text-white transition duration-1000 ease-in-out transform hover:text-blue-800 ">
                        
                        Logbook.io 
                    </span>
                </Link>
            </div>
            <div className="hidden md:float-left md:contents">
                {Categories.map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                        <span className="md:float-right mt-2 align-middle text-white ml-4 mr-4 font-semibold cursor-pointer transition duration-500 ease-in-out transform hover:scale-125 hover:text-blue-800">
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Header