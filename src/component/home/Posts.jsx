// src/components/Posts.jsx

import { FaEdit, FaTrash, FaThumbsUp, FaComment } from 'react-icons/fa';

const Posts = ({ openModal }) => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Social Media Posts</h2>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <textarea 
                        className="w-full border rounded-lg p-3 focus:outline-none"
                        placeholder="What's on your mind?"
                        onClick={openModal}
                    ></textarea>
                  
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold">User Name</h3>
                            <p className="text-gray-600">Post content goes here...</p>
                        </div>
                        <div className="flex space-x-2">
                            <FaEdit className="text-blue-500 cursor-pointer" />
                            <FaTrash className="text-red-500 cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                            <FaThumbsUp className="text-blue-500 cursor-pointer" />
                            <span>Like</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaComment className="text-blue-500 cursor-pointer" />
                            <span>Comment</span>
                        </div>
                    </div>
                </div>
                {/* Additional posts can be added here */}
            </div>
        </div>
    );
};

export default Posts;
