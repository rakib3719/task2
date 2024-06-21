import { useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosSecure from '../../hook/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';

const UpdateModal = ({ onClose, _id, initialContent,refetch }) => {
    const [newContent, setNewContent] = useState(initialContent);
    const axiosSecure = useAxiosSecure();

    const handleUpdatePost = async () => {
        const updateData = {
            postContent: newContent,
        };

        try {
            const data= await axiosSecure.put(`/updatePost/${_id}`, updateData);
          
            console.log(!data?.data?.modifiedCount > 0);
            console.log(data);

if(data?.data?.modifiedCount > 0){

    toast.success('Post updated successfully!');
    refetch()
    onClose();
}

            
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <Toaster />
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <div className="text-right">
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h2 className="text-xl font-bold mb-4">Update Post</h2>
                <textarea
                    className="w-full rounded-lg border-gray-200 p-2"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
                    onClick={handleUpdatePost}
                >
                    Update Post
                </button>
            </div>
        </div>
    );
};

UpdateModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    initialContent: PropTypes.string.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default UpdateModal;
