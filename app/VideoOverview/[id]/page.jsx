"use client"

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import Loader from "@/components/Loader";

export default function VideoOverview({params}) {
    const router = useRouter();
    const { id } = params;
    const api_key = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const [videoData, setVideoData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${api_key}`, {
                    cache: "no-store",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch video data");
                }

                const data = await res.json();
                setVideoData(data.items[0]);
            } catch (error) {
                console.log(error);
                setError(error);
            }
        };

        fetchVideoData();
    }, [id, api_key]);

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center mt-3 sm:flex-row">
                <div className="text-center sm:w-1/2 sm:mr-10">
                    <div className="text-3xl md:text-4xl underline mb-5">Overview</div>
                    {videoData ? (
                        <>
                            <div className="flex justify-center">
                                <Image
                                    src={videoData.snippet.thumbnails.high.url}
                                    alt="Thumbnail"
                                    width={340}
                                    height={225}
                                    className="w-full max-w-[340px] rounded-xl shadow-image"
                                />
                            </div>
                            <div className="text-xl md:text-2xl font-bold mt-5 text-indigo-700 md:px-6 px-8">{videoData.snippet.title}</div>
                            <div className="flex flex-col md:flex-row justify-center mt-3">
                                <div className="p-2 font-medium text-lg mr-0 md:mr-16 sm:mr-8">
                                    Publisher : <span className="text-indigo-700 font-semibold">{videoData.snippet.channelTitle}</span>
                                </div>
                                <div className="p-2 font-medium text-lg ">
                                    Date : <span className="text-indigo-700 font-semibold">{videoData.snippet.publishedAt.slice(0,10)}</span>
                                </div>
                            </div>
                            <motion.button
                                className="bg-gradient-to-br from-indigo-500 to-indigo-800 text-white text-xl font-medium px-7 py-2 rounded-xl mt-6 md:mt-2"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => router.push(`/WatchVideo/${videoData.id}`)}
                            >
                                Watch
                            </motion.button>
                        </>
                    ) : (
                        <div className="min-h-screen">
                            <Loader/>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}


