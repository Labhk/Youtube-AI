"use client"

import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'
import Loader from "./Loader";

export default function HomeBody() {

    const router = useRouter()
    const buttonVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      };

    return(
        
        <>
            <div className="flex items-center justify-center h-full">
            <div className="text-center w-2/3 mt-24">
                <h1 className="text-7xl font-bold uppercase text-indigo-700 bg-clip-text text-transparent bg-gradient-to-b from-indigo-500 to-indigo-700">
                Elevate Your Learning Journey
                </h1>
                <div className='mt-4 text-lg font-light italic'>
                Transforming Content into Engaging Learning Adventures with Summaries and Quizzes
                </div>
                <motion.button
                    className="mt-4 bg-gradient-to-br from-indigo-500 to-indigo-800 text-white text-xl font-medium py-2 px-4 rounded-3xl"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => router.push('/importVideo')}
                >
                    Get Started
                </motion.button>
            </div>
            
            </div>
        </>
    )
}