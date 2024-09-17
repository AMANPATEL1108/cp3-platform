import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const navigate = useNavigate();

  const staticTopics = [
    {
      _id: "1",
      name: "Array",
      content:
        "<p>Arrays are a collection of items stored at contiguous memory locations. They are the simplest data structures that store items of the same type.</p>",
    },
    {
      _id: "2",
      name: "LinkedList",
      content:
        "<p>Linked List is a linear data structure, in which the elements are not stored at contiguous memory locations. The elements in a linked list are linked using pointers.</p>",
    },
    {
      _id: "3",
      name: "Tree",
      content:
        "<p>A tree is a non-linear data structure, where a node contains data and a reference (or link) to other nodes, which are called children. Common types of trees include binary trees, binary search trees, AVL trees, and more.</p>",
    },
  ];

  useEffect(() => {
    // Mimic API fetching or use static topics
    setTopics(staticTopics);
  }, []);

  const toggleTopic = (topicId) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  const redirectToTopicDetail = (topicId) => {
    navigate(`/topic/${topicId}`);
  };

  return (
    <div className="bg-gray-900 text-gray-100 font-mono min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-green-400">DSA Topics</h2>
        <ul className="space-y-4">
          {topics.map((topic) => (
            <li
              key={topic._id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-700 transition duration-300"
                onClick={() => toggleTopic(topic._id)}
              >
                <h3 className="text-xl font-semibold text-green-400">
                  {topic.name}
                </h3>
                {expandedTopic === topic._id ? (
                  <FaChevronUp className="text-green-400" />
                ) : (
                  <FaChevronDown className="text-green-400" />
                )}
              </div>
              {expandedTopic === topic._id && (
                <div
                  className="p-4 bg-gray-700"
                  dangerouslySetInnerHTML={{ __html: topic.content }}
                />
              )}
              <button
                onClick={() => redirectToTopicDetail(topic._id)}
                className="w-full bg-green-500 text-gray-900 mt-2 py-2 hover:bg-green-600 transition duration-300"
              >
                Read More
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Topics;
