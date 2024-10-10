import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import axios from "axios";

const GITHUB_FILE_URL =
  "https://raw.githubusercontent.com/AMANPATEL1108/AceDsaJson/main/";

const TopicDetail = () => {
  const { topicId } = useParams();
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        // Construct the URL based on the topicId
        const response = await axios.get(`${GITHUB_FILE_URL}${topicId}.md`);
        setMarkdown(response.data);
      } catch (error) {
        // Check the error response for more information
        if (error.response) {
          // The request was made, but the server responded with a status code
          setError(
            `Failed to fetch data: ${error.response.status} ${error.response.statusText}`
          );
        } else {
          // Something else happened while setting up the request
          setError("Failed to fetch data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [topicId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800 py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold text-green-400">DSA Tutorial</h1>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-5xl font-bold mb-6 text-green-400 text-center">
          {topicId.replace(/-/g, " ")} {/* Format the topic name */}
        </h2>
        <div className="markdown bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <ReactMarkdown remarkPlugins={[gfm]}>{markdown}</ReactMarkdown>
        </div>
      </main>
    </div>
  );
};

export default TopicDetail;
