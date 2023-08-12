"use client"

import React,{useState} from 'react'; 
import { useRouter } from 'next/navigation'
import { GiAbstract084 } from 'react-icons/gi';
import { AiOutlineMenu } from 'react-icons/ai';

export default function Header() {
    let [open, setOpen] = useState(false);
    const router = useRouter()

    return(
        <>
            <div className='shadow-sm  w-full top-0 left-0 z-50  right-0 bg-gradient-to-r from-bele2 to-bele1'>
            <div className='md:flex items-center justify-between py-3 md:px-10 px-7'>

            <div className='font-medium text-xl cursor-pointer flex items-center text-gray-800 ' onClick={() => router.push('/')}>
                <span className='text-3xl text-indigo-600 mr-1  '>
                <div ><GiAbstract084 className="h-10 w-10" /></div>
                </span>
                <span className=' text-black font-serif'>CourseVerse</span>
            </div>

            <div onClick={()=>setOpen(!open)}>
            <span className='text-3xl absolute text-black right-2 bottom-2 cursor-pointer md:hidden'>
                <AiOutlineMenu />
                </span>
            </div>
            </div>
        </div>
        </>
    )
};