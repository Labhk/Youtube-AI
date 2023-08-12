"use client"

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import { motion } from "framer-motion";
import Image from "next/image";

const getPlaylistData = async (id, key) => {
    try {
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${id}&key=${key}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch the topic");
        }

        const data = await res.json();
        return data.items;
    } catch (error) {
        console.log(error);
    }
}

export default function WatchPlaylist({params}) {
    const buttonVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      };
    const [mainVideoId, setMainVideoId] = useState('');
    const [sidebarVideoIds, setSidebarVideoIds] = useState([]);
    const [titles, setTitles] = useState([]);
    const [showAssist, setShowAssist] = useState(true);
    const { id } = params;
    const [showApiKeyPopup, setShowApiKeyPopup] = useState(true);
    const api_key = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const [apiKey, setApiKey] = useState('')

    const handleSideVideoClick = (videoId) => {
        setMainVideoId(videoId);
        setShowAssist(true)
    }
    const toggleApiKeyPopup = () => {
        setShowApiKeyPopup(!showApiKeyPopup);
    };
    

    const handleButtonClick = () => {
        setShowAssist(false)
    }

    const confirmKey = () => {
        sessionStorage.setItem('apikey',apiKey)
        toggleApiKeyPopup();
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const playlistData = await getPlaylistData(id, api_key);
                const videoIds = playlistData.map(item => item.contentDetails.videoId);
                const titles = playlistData.map(item => item.snippet.title);
                //console.log(videoIds, titles);

                setMainVideoId(videoIds[0]);
                setSidebarVideoIds(videoIds);
                setTitles(titles)

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id, api_key]);

    return (
        <>
            <Header />
            <div className="flex flex-wrap">
            <div className="w-full md:w-8/12 p-8 ">
            <iframe
                width="100%"
                height="400px"
                src={`https://www.youtube.com/embed/${mainVideoId}`}
                className='mb-3'
                title="YouTube video player"
                samesite="none"
            />
            {showAssist && (
                        <div className='text-3xl text-center p-5 '>
                            <motion.button
                            className="mt-4 bg-gradient-to-br from-indigo-500 to-indigo-800 text-white text-2xl font-medium py-2 px-6 rounded-3xl"
                            variants={buttonVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.4 }}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.9 }} 
                            onClick={handleButtonClick}
                             title="Click to activate AI Assist">AI Assist
                             </motion.button>
                        </div>
                    )}
            {!showAssist && <Tabs id={mainVideoId}/>}
            </div>
            <div className='w-full md:w-4/12 flex flex-col pl-2 '>
            <div className=" p-3  mt-8 mr-3 overflow-hidden   overflow-y-auto shadow-md border border-indigo-700 " style={{height: "450px", overflowY: "scroll"}} >
            {sidebarVideoIds.map((videoId) => (
                <div
                key={videoId}
                className="flex p-2 cursor-pointer hover:bg-gradient-to-br hover:text-white  text-gray-900 hover:from-indigo-500 hover:to-indigo-800 rounded-md"
                onClick={() => handleSideVideoClick(videoId)}
                >
                 <Image
                    src={`http://img.youtube.com/vi/${videoId}/0.jpg`}
                    alt={`Thumbnail for video ${videoId}`}
                    width={144}
                    height={81}
                    className="w-36 rounded-md"
                />
                <p className="text-sm ml-2 mt-auto pl-4 mb-auto font-medium ">{titles[sidebarVideoIds.indexOf(videoId)]}</p>
                </div>
            ))}
            
            </div>
            </div>
            {showApiKeyPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Enter OpenAI API Key</h2>
                        <input
                            type="password"
                            className="border rounded-md w-full p-2 mb-4"
                            placeholder="Enter your API key"
                            value={apiKey}
                            onInput={(e) => setApiKey(e.target.value)}
                        />

                        <div className="flex justify-end">
                            <button
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-2"
                                onClick={confirmKey}
                            >
                                Confirm
                            </button>
                            <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                                onClick={toggleApiKeyPopup}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
        </div>
        </>
    );
}
