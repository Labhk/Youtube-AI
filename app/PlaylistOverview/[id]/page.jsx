"use client"

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PlaylistOverview({params}) {
    const router = useRouter();
    const { id } = params;
    const api_key = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const [playlistData, setPlaylistData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                const res = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${id}&key=${api_key}`, {
                    cache: "no-store",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch playlist data");
                }

                const data = await res.json();
                setPlaylistData(data.items);
            } catch (error) {
                console.log(error);
                setError(error);
            }
        };

        fetchPlaylistData();
    }, [id, api_key]);

    return (
        <>
            <Header />
            <div className="flex justify-center mt-3">
                <div className="text-center">
                    <div className="text-4xl underline mb-5">Overview</div>
                    {playlistData.length > 0 ? (
                        <>
                            <div className="flex justify-center">
                                <Image
                                    src={playlistData[0].snippet.thumbnails.high.url}
                                    alt="Thumbnail"
                                    width={340}
                                    height={225}
                                    className="w-full max-w-[340px] rounded-xl shadow-image"
                                />
                            </div>
                            <div className="text-2xl font-bold mt-5 text-indigo-700 px-28">{playlistData[0].snippet.title}</div>
                            <div className="flex justify-center mt-3">
                                <div className="p-2 font-medium text-lg mr-8">
                                    Publisher : <span className="text-indigo-700 font-semibold">{playlistData[0].snippet.channelTitle}</span>
                                </div>
                                <div className="p-2 font-medium text-lg">
                                    No. of videos : <span className="text-indigo-700 font-semibold">{playlistData.length}</span>
                                </div>
                            </div>
                            <motion.button
                                className="bg-gradient-to-br from-indigo-500 to-indigo-800 text-white text-xl font-medium px-7 py-2 rounded-xl mt-6"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => router.push(`/WatchPlaylist/${id}`)}
                            >
                                Start Course
                            </motion.button>
                        </>
                    ) : (
                        <div className="text-3xl font-semibold text-red-800">Failed to fetch ;-;</div>
                    )}
                </div>
            </div>
        </>
    );
}

