import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TopicDetail = () => {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);

  // Static topics data for DSA with line-by-line explanations and code operations
  const staticTopics = [
    {
      _id: "1",
      name: "Array",
      content:
        "<p>Arrays are a collection of items stored at contiguous memory locations.</p>",
      detail: `
        <p><strong>Definition:</strong> An array is a data structure that can store a fixed-size collection of elements of the same type.</p>
        <p><strong>Common Operations:</strong></p>
        <ul>
          <li>Accessing an element at index i: O(1)</li>
          <li>Inserting an element: O(n) for shifting</li>
          <li>Deleting an element: O(n) for shifting</li>
        </ul>
        <p>Let's see how you can implement basic array operations in code:</p>
      `,
      code: `
        // Example of array initialization
        int[] arr = new int[5]; // array of size 5

        // Accessing an element
        int firstElement = arr[0]; // O(1) operation

        // Inserting an element (shifting required)
        for (int i = arr.length - 1; i > 2; i--) {
            arr[i] = arr[i-1]; // shift elements
        }
        arr[2] = 10; // Insert element at index 2

        // Deleting an element (shifting required)
        for (int i = 2; i < arr.length - 1; i++) {
            arr[i] = arr[i+1]; // shift elements
        }
      `,
      codeExplanation: `
        <p>Line-by-line explanation:</p>
        <ul>
          <li><strong>Line 1:</strong> We create an array of size 5.</li>
          <li><strong>Line 4:</strong> Accessing an element at index 0.</li>
          <li><strong>Line 7:</strong> Inserting an element requires shifting elements to the right.</li>
          <li><strong>Line 13:</strong> Deleting an element requires shifting elements to the left.</li>
        </ul>
      `,
      operations: [
        {
          name: "Insertion",
          description:
            "Inserting an element into an array requires shifting elements.",
        },
        {
          name: "Deletion",
          description:
            "Deleting an element requires shifting elements to fill the gap.",
        },
      ],
    },
    {
      _id: "2",
      name: "LinkedList",
      content:
        "<p>A linked list is a sequence of nodes where each node contains data and a reference to the next node.</p>",
      detail: `
        <p><strong>Definition:</strong> A linked list is a linear data structure, in which the elements are not stored at contiguous memory locations.</p>
        <p><strong>Common Operations:</strong></p>
        <ul>
          <li>Traversal: O(n)</li>
          <li>Insertion: O(1) if inserting at the head, O(n) otherwise</li>
          <li>Deletion: O(1) at the head, O(n) otherwise</li>
        </ul>
        <p>Let's see how you can implement a linked list in code:</p>
      `,
      code: `
        // Node structure
        class Node {
            int data;
            Node next;
            Node(int d) { data = d; next = null; }
        }

        // Linked List class
        class LinkedList {
            Node head;

            // Insert at the beginning
            public void insertAtHead(int newData) {
                Node newNode = new Node(newData);
                newNode.next = head;
                head = newNode;
            }

            // Delete the head node
            public void deleteHead() {
                if (head != null) {
                    head = head.next;
                }
            }
        }
      `,
      codeExplanation: `
        <p>Line-by-line explanation:</p>
        <ul>
          <li><strong>Line 2:</strong> Define the node structure with data and a next pointer.</li>
          <li><strong>Line 8:</strong> Insert a new node at the head of the list.</li>
          <li><strong>Line 15:</strong> Delete the head node by pointing head to the next node.</li>
        </ul>
      `,
      operations: [
        {
          name: "Traversal",
          description:
            "Traversal requires moving through the nodes one by one.",
        },
        {
          name: "Insertion",
          description:
            "Insertion at the head is O(1), while at other positions it's O(n).",
        },
      ],
    },
    {
      _id: "3",
      name: "Tree",
      content:
        "<p>A tree is a hierarchical data structure consisting of nodes connected by edges.</p>",
      detail: `
        <p><strong>Definition:</strong> A tree is a non-linear hierarchical data structure that consists of nodes connected by edges.</p>
        <p><strong>Common Operations:</strong></p>
        <ul>
          <li>Insertion: O(log n) for balanced trees</li>
          <li>Deletion: O(log n) for balanced trees</li>
          <li>Search: O(log n) for balanced trees</li>
          <li>Traversal: O(n) for visiting all nodes</li>
        </ul>
        <p>Let's see how you can implement a basic binary tree in code:</p>
      `,
      code: `
        class TreeNode {
            int data;
            TreeNode left, right;

            public TreeNode(int item) {
                data = item;
                left = right = null;
            }
        }

        class BinaryTree {
            TreeNode root;

            // Insert a node in the binary tree
            private TreeNode insertRec(TreeNode root, int data) {
                if (root == null) {
                    root = new TreeNode(data);
                    return root;
                }

                if (data < root.data)
                    root.left = insertRec(root.left, data);
                else if (data > root.data)
                    root.right = insertRec(root.right, data);

                return root;
            }

            public void insert(int data) {
                root = insertRec(root, data);
            }
        }
      `,
      codeExplanation: `
        <p>Line-by-line explanation:</p>
        <ul>
          <li><strong>Line 1-7:</strong> Define the TreeNode structure with data and left/right child pointers.</li>
          <li><strong>Line 9-13:</strong> Define the BinaryTree class with a root node.</li>
          <li><strong>Line 15-28:</strong> Implement the recursive insert method to add nodes to the tree.</li>
          <li><strong>Line 30-32:</strong> Public insert method that calls the recursive insert method.</li>
        </ul>
      `,
      operations: [
        {
          name: "Insertion",
          description:
            "Inserting a node requires traversing the tree to find the correct position.",
        },
        {
          name: "Traversal",
          description:
            "Tree traversal can be done in various orders: in-order, pre-order, or post-order.",
        },
      ],
    },
  ];

  useEffect(() => {
    const selectedTopic = staticTopics.find((topic) => topic._id === topicId);
    setTopic(selectedTopic);
  }, [topicId]);

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
                dangerouslySetInnerHTML={{ __html: topic.detail }}
              />
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105">
                Start learning {topic.name} now »
              </button>
            </div>

            <h3 className="text-3xl font-bold mb-4 text-green-400">
              Examples in Each Chapter
            </h3>
            <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
              <h4 className="text-2xl font-bold mb-4 text-green-400">
                Operations:
              </h4>
              <ul className="list-disc pl-5 mb-6 text-gray-300 space-y-2">
                {topic.operations.map((operation) => (
                  <li key={operation.name} className="mb-2">
                    <strong className="text-green-400">
                      {operation.name}:
                    </strong>{" "}
                    {operation.description}
                  </li>
                ))}
              </ul>
              <h4 className="text-2xl font-bold mb-4 text-green-400">Code:</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto shadow-inner">
                <code>{topic.code}</code>
              </pre>
            </div>
            <div
              className="text-gray-300 space-y-4"
              dangerouslySetInnerHTML={{ __html: topic.codeExplanation }}
            />
          </>
        ) : (
          <p className="text-gray-400">Topic not found!</p>
        )}
      </main>
    </div>
  );
};

export default TopicDetail;
