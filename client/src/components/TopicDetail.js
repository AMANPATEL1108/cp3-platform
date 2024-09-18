import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// GitHub API URL for the JSON file
const GITHUB_FILE_URL =
  "https://raw.githubusercontent.com/AMANPATEL1108/AceDsaJson/main/topics.json";

const TopicDetail = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch topic details from GitHub file
    const fetchTopicData = async () => {
      try {
        const response = await fetch(GITHUB_FILE_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Find the topic by topicId
        const selectedTopic = data.find((topic) => topic._id === topicId);
        if (!selectedTopic) {
          throw new Error("Topic not found");
        }

        setTopic(selectedTopic);
      } catch (error) {
        setError(error.message);
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
        {topic ? (
          <>
            <h2 className="text-4xl font-bold mb-6 text-green-400">
              {topic.name}
            </h2>
            <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
              <div
                className="text-gray-300 mb-6 space-y-4"
                dangerouslySetInnerHTML={{ __html: topic.content }} // Using content field from JSON
              />
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105">
                Start learning {topic.name} now »
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-400">Topic not found!</p>
        )}
      </main>
    </div>
  );
};

export default TopicDetail;
