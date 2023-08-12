"use client"

import React, { useState } from 'react';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import { motion } from "framer-motion";

export default function WatchVideo({ params }) {
  const { id } = params;
  const [showAssist, setShowAssist] = useState(true);
  const [showApiKeyPopup, setShowApiKeyPopup] = useState(true);
  const [apiKey, setApiKey] = useState('')
  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleButtonClick = () => {
    setShowAssist(false)
  }
  const confirmKey = () => {
    sessionStorage.setItem('apikey',apiKey)
    toggleApiKeyPopup();
  };
  const toggleApiKeyPopup = () => {
    setShowApiKeyPopup(!showApiKeyPopup);
  };


  return (
    <>
      <Header />
      <div className="w-full ">
      <div className="w-full p-3">
                <iframe
                    width="100%"
                    height="420px"
                    src={`https://www.youtube.com/embed/${id}`}
                    className="rounded-3xl px-56"
                    title="YouTube video player"
                    samesite="none"
                />
            </div>

        </div>
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
            {!showAssist && <Tabs id={id} />}
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
    </>
  );
}
