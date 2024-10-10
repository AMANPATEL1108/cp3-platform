import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Topics = () => {
  const [topics] = useState([
    { name: "Array", _id: "Arrays" },
    { name: "Tree", _id: "Trees" },
    { name: "Linked List", _id: "Linked List" },
    { name: "Advanced Data Structures", _id: "Advanced Data Structures" },
    { name: "Backtracking", _id: "Backtracking" },
    { name: "Binary Search Tree", _id: "Binary Search Tree" },
    { name: "Bit Manipulation", _id: "Bit Manipulation" },
    { name: "Divide and Conquer", _id: "Divide and Conquer" },
    { name: "Dynamic Programming", _id: "Dynamic Programing" },
    { name: "Graphs", _id: "Graphs" },
    { name: "Greedy Algorithms", _id: "Greedy Algorithem" },
    { name: "Heap", _id: "Heap" },
    { name: "Mathematical Algorithms", _id: "Mathematical Algorithms" },
    { name: "Miscellaneous Algorithms", _id: "Miscellaneous Algorithms" },
    { name: "Queue", _id: "Queue" },
    { name: "Stacks", _id: "Stack" },
    { name: "String Algorithms", _id: "String Algorithm" },
  ]);

  const navigate = useNavigate();

  const handleTopicDetailRedirect = (topicId) => {
    navigate(`/topic/${topicId}`);
  };

  return (
    <div className="bg-gray-900 text-gray-100 font-mono min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-green-400 text-center">
          Topics
        </h2>
        <ul className="space-y-4">
          {topics.map((topic) => (
            <li
              key={topic._id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md p-4 flex justify-between items-center"
            >
              <h3 className="text-xl font-semibold text-green-400">
                {topic.name}
              </h3>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-400 transition"
                onClick={() => handleTopicDetailRedirect(topic._id)}
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
