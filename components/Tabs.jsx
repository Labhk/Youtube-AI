import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Api from 'youtube-browser-api';
import Summary from './Summary';
import Quiz from './Quiz';

export default function Tabs({ id}) {
  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  const [activeTab, setActiveTab] = useState('summary');
  const [transcript, setTranscript] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleGenerateSummary = () => {
    setShowSummary(true);
  };

  const handleGenerateQuiz = () => {
    setShowQuiz(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myTranscript = await Api.transcript({
          videoId: id,
        });
        console.log(myTranscript);
        setTranscript(myTranscript.videoId.map((segment) => segment.text).join(' '));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);


  return (
    <>
      <ul className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0 ">

        <li role="presentation" className={`flex-grow basis-0 text-center`}>
            <a
                href="#summary"
                onClick={() => handleTabClick('summary')}
                className={`my-2 block border border-indigo-700 text-indigo-700 px-7 pb-3.5 pt-4 text-md hover:bg-indigo-50 font-medium uppercase leading-tight ${
                    activeTab === 'summary' ? 'bg-gradient-to-br from-indigo-500 to-indigo-800 text-white' : ' hover:text-indigo-600'
                } focus:outline-none`}
                role="tab"
                aria-controls="summary"
                aria-selected={activeTab === 'summary' ? 'true' : 'false'}
            >
                Summary 
            </a>
        </li>


        <li role="presentation" className={`flex-grow basis-0 text-center`}>
            <a
                href="#quiz"
                onClick={() => handleTabClick('quiz')}
                className={`my-2 block border border-indigo-700 text-indigo-700  px-7 pb-3.5 pt-4 text-md hover:bg-indigo-50 font-medium uppercase leading-tight ${
                    activeTab === 'quiz' ? 'bg-gradient-to-br from-indigo-500 to-indigo-800 text-white' : ' hover:text-indigo-600'
                } focus:outline-none`}
                role="tab"
                aria-controls="quiz"
                aria-selected={activeTab === 'quiz' ? 'true' : 'false'}
            >
                Quiz
            </a>
        </li>
        </ul>

      <div className="mb-6">
        <div
          className={`${
            activeTab === 'summary'
              ? 'opacity-100 transition-opacity duration-150 ease-linear'
              : 'hidden opacity-0 transition-opacity duration-150 ease-linear'
          }`}
          id="summary"
          role="tabpanel"
        >
          <div className="text-center py-16">
            {showSummary ? (
              // Show the summary content
              <Summary transcript={transcript} />
            ) : (
              <>
                <div className="">
                  <motion.button
                    className=" bg-gradient-to-br from-indigo-500 to-indigo-800 text-white text-xl font-medium py-2 px-4 rounded-3xl"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleGenerateSummary}
                  >
                    Generate Summary
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className={`${
            activeTab === 'quiz'
              ? 'opacity-100 transition-opacity duration-150 ease-linear'
              : 'hidden opacity-0 transition-opacity duration-150 ease-linear'
          }`}
          id="quiz"
          role="tabpanel"
        >
          <div className="text-center py-16">
            {showQuiz ? (
              <Quiz transcript={transcript} />
            ) : (
              <>
                <div className="">
                  <motion.button
                    className="bg-gradient-to-br from-indigo-500 to-indigo-800 text-white text-xl font-medium py-2 px-4 rounded-3xl"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleGenerateQuiz}
                  >
                    Generate Quiz
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
