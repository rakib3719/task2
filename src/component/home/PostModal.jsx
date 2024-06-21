import { useContext, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { imageUpload } from '../../utilits/photoUpload';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import toast from 'react-hot-toast';
import AuthLoading from '../loader/AuthLoading';

const PostModal = ({ isOpen, onClose, refetch }) => {
    const [postContent, setPostContent] = useState('');
    const [photo, setPhoto] = useState(null);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const axiosSecure = useAxiosSecure();

    const handlePost = async () => {
        setLoading(true);
       
        try {
            let image = null;
            if (photo) {
                const data = await imageUpload(photo);
                image = data;
            }
         
            const postData = {
                postContent,
                photo: image,
                email: user?.email,
                date: new Date(),
                userName: user?.displayName
            };

            const response = await axiosSecure.post('/createPost', postData);
            if (response.data.insertedId) {
                setPostContent(''); 
                setPhoto(null); 
                onClose();
                toast.success('Successfully posted');
                refetch();
                setLoading(false);
            }
        } catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
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
                    {loading ? <AuthLoading /> : 'Post'}
                </button>
            </div>
        </div>
    );
};

export default PostModal;
