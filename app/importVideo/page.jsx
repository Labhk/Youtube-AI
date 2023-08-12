"use client"

import Header from "@/components/Header";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import queryString from 'query-string';

export default function ImportVideo() {
    const buttonVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const [selectedButton, setSelectedButton] = useState(null);
    const [inputValue, setInputValue] = useState('https://www.youtube.com/watch?v=DeFY5F3pWPs&list=PLZlA0Gpn_vH_GPX-SNhGK0crEtlXtC2uF');

    const router = useRouter();

    const handleButtonClick = (button) => {
        if (selectedButton === button) {
          setSelectedButton(null);
        } else {
          setSelectedButton(button);
        }
      };
    
      const handleConfirmClick = () => {
        sessionStorage.setItem('type', selectedButton || '');
        
        if (selectedButton === "single"){
            const videoUrl = queryString.parseUrl(inputValue);
            const videoId = videoUrl.query.v;
            router.push(`/VideoOverview/${videoId}`);
        }

        if (selectedButton === "playlist"){
            const playlistUrl = queryString.parseUrl(inputValue);
            const playlistId = playlistUrl.query.list;
            router.push(`/PlaylistOverview/${playlistId}`);
        }

      };


    return(
        <>
            <Header/>
            <div className=' flex justify-center'>
                <motion.div
                className={`text-center mt-10 ${selectedButton ? 'hidden' : ''}`}
                initial='visible'
                animate={selectedButton ? 'hidden' : 'visible'}
                variants={buttonVariants}
                transition={{ duration: 0.4 }}
                >
                <div className='text-3xl font-medium'>Select YouTube URL Type</div>
                <div className='flex justify-center mt-14'>
                    <div className='mr-20'>
                    <motion.button
                        className='bg-gradient-to-br from-indigo-500 to-indigo-800 text-white text-2xl font-semibold uppercase w-64 h-60 rounded-3xl'
                        onClick={() => handleButtonClick('single')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Single Video
                    </motion.button>
                    </div>
                    <div>
                    <motion.button
                        className='bg-gradient-to-br from-indigo-500 to-indigo-800 text-white text-2xl font-semibold uppercase w-64 h-60 rounded-3xl'
                        onClick={() => handleButtonClick('playlist')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Video Playlist
                    </motion.button>
                    </div>
                </div>
                </motion.div>

                <motion.div
                className={`text-center mt-10 ${selectedButton ? '' : 'hidden'}`}
                initial='hidden'
                animate={selectedButton ? 'visible' : 'hidden'}
                variants={buttonVariants}
                transition={{ duration: 0.4 }}
                >
                <div className='text-3xl '>Enter the YouTube URL</div>
                <div className='flex justify-center mt-10'>
                    <div className=''>
                    <motion.input
                        className='shadow-custom w-[42rem] py-3 px-6 text-xl rounded-xl border-2 text-gray-700 border-indigo-700'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    </div>
                </div>
                <div className='flex justify-center mt-12'>
                    <motion.button
                    className='bg-gradient-to-br from-indigo-500 to-indigo-800 text-white text-xl font-medium px-7 py-2 rounded-xl'
                    variants={buttonVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleConfirmClick}
                    >
                    🚀 Confirm
                    </motion.button>
                    <motion.button
                    className='border-2 ml-3 border-indigo-700 bg-transparent text-indigo-700 font-medium px-2 py-2 rounded-xl text-3xl'
                    variants={buttonVariants}
                    initial='hidden'
                    animate='visible'
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleButtonClick(selectedButton || '')}
                    >
                    <AiOutlineArrowLeft />
                    </motion.button>
                </div>
                </motion.div>
            </div>
        </>
    )
}