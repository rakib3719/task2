// src/components/PostModal.jsx

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { imageUpload } from '../../utilits/photoUpload';

const PostModal = ({ isOpen, onClose }) => {
    const [postContent, setPostContent] = useState('');
    const [photo, setPhoto] = useState(null);
 

    const handlePost = async () => {
        // Handle post submission logic
        console.log('Post content:', postContent);
        console.log('Photo:', photo);
        const data = await imageUpload(photo);
        console.log("photo",data);

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    <FaTimes />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center">Create Post</h2>
                <textarea
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                ></textarea>
                <input
                    type="file"
                    className="mb-4"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
                <button
                    onClick={handlePost}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default PostModal;
