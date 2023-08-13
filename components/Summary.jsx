import React, { useState, useEffect } from "react";
import Loader from "./Loader";

export default function Summary({ transcript }) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const baseUrl = `${url.protocol}//${url.host}/api/summary`;
    const apiKey = sessionStorage.getItem('apikey');

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Summarize the content in 300 words  ${transcript}`,
        apiKey: apiKey
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch summary data");
        }
        return response.json();
      })
      .then(data => {
        setSummary(data.text);
      })
      .catch(error => {
        console.error("An error occurred:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [transcript]);

  return (
    <main className="flex flex-col px-16 ">
      <div className="text-left">
        {loading ? (
          <Loader />
        ) : (
          <div className=''>
            <h2 className="text-3xl font-semibold pb-3">Summary</h2>
            <p className=' text-xl '>
              {summary !== null ? (
                {summary}
              ) : (
              <p className="italic">API key is invalid or Error in fetching; try refreshing</p>
            )}</p>
          </div>
        )}
      </div>
    </main>
  );
}
