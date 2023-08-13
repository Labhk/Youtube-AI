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
    const [inputValue, setInputValue] = useState('');

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
                className={`text-center mt-16 ${selectedButton ? 'hidden' : ''}`}
                initial='visible'
                animate={selectedButton ? 'hidden' : 'visible'}
                variants={buttonVariants}
                transition={{ duration: 0.4 }}
                >
                <div className="md:text-3xl text-xl font-medium text-center mb-6 sm:mb-10">
                    Select YouTube URL Type
                </div>
                <div className="flex flex-col items-center sm:flex-row justify-center sm:justify-between mt-6 sm:mt-14">
                    <motion.button
                        className="bg-gradient-to-br from-indigo-500 to-indigo-800 text-white text-lg sm:text-2xl font-semibold uppercase w-44 sm:w-64 h-44 sm:h-60 rounded-3xl mb-4 sm:mb-0"
                        onClick={() => handleButtonClick('single')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Single Video
                    </motion.button>
                    <motion.button
                        className="bg-gradient-to-br from-indigo-500 to-indigo-800 text-white text-lg sm:text-2xl font-semibold uppercase w-44 sm:w-64 h-44 sm:h-60 rounded-3xl md:ml-8"
                        onClick={() => handleButtonClick('playlist')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Video Playlist
                    </motion.button>
                </div>

                </motion.div>

                <motion.div
                className={`text-center mt-24 md:mt-16 ${selectedButton ? '' : 'hidden'}`}
                initial='hidden'
                animate={selectedButton ? 'visible' : 'hidden'}
                variants={buttonVariants}
                transition={{ duration: 0.4 }}
                >
                <div className="md:text-3xl text-xl text-center mb-6 sm:mb-10">
                    Enter the YouTube URL
                </div>
                <div className="flex flex-col items-center sm:flex-row justify-center sm:justify-between mt-6 sm:mt-10">
                <motion.input
                    className="shadow-custom md:w-full py-3 px-6 text-lg md:text-xl rounded-xl border-2 text-gray-700 border-indigo-700 mb-4 sm:mb-0"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                        selectedButton === 'single'
                            ? 'Enter video URL'
                            : selectedButton === 'playlist'
                            ? 'Enter playlist URL'
                            : 'Enter'
                    }
                />

                </div>
                <div className="text-gray-400 text-xs px-10 md:text-sm mt-3">* For the AI Assist feature, the maximum video length should be up to 12-13 minutes. </div>
                <div className="text-gray-400 text-xs px-10 md:text-sm mt-1">* YouTube videos should have English captions </div>
                <div className="flex items-center justify-center mt-6 ">
                    <motion.button
                        className="bg-gradient-to-br from-indigo-500 to-indigo-800 text-white text-md md:text-lg font-medium px-6 py-2 rounded-xl"
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleConfirmClick}
                    >
                        🚀 Confirm
                    </motion.button>
                    <motion.button
                        className="border-2 border-indigo-700 bg-transparent text-indigo-700 font-medium px-2 py-[0.6rem] rounded-xl text-lg md:text-xl ml-3"
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
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