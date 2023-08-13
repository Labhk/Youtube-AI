import React, { useState, useEffect } from "react";
import Loader from "./Loader";

export default function Quiz({ transcript }) {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const baseUrl = `${url.protocol}//${url.host}/api/quiz`;
    const apiKey = sessionStorage.getItem('apikey');

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `provide a mcq quiz with five questions based on the text key values without answers  ${transcript}`,
        apiKey: apiKey
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }
        return response.json();
      })
      .then(data => {
        if (data.text) {
          setQuiz(data.text.split('Q').join(' ').split('\n').map(element => element.trim()).filter(Boolean).slice(0));
        } else {
          console.error("Quiz data is missing or invalid.");
        }
      })
      .catch(error => {
        console.error("An error occurred:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [transcript]);

  return (
    <main className="flex flex-col px-16">
      <div className="text-justify">
        {loading ? (
          <Loader />
        ) : (
          <div>
            {quiz.length > 0 ? (
              quiz.map((question, index) => (
                <div key={index}>
                  {index === 0 && <h2 className="text-3xl font-semibold pb-3">Solve the Quiz:</h2>}
                  {index % 5 === 0 && <hr className="pb-4 border-none" />}
                  <p className={`text-xl ${index % 5 === 0 ? 'font-bold' : ''}`}>{question}</p>
                </div>
              ))
            ) : (
              <p className="italic text-xl ">API key is invalid or Error in fetching; try refreshing</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
