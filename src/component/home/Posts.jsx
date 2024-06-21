import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash, FaThumbsUp, FaComment } from 'react-icons/fa';
import useAxiosSecure from '../../hook/useAxiosSecure';
import SinglePost from './SinglePost';
import { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import PostModal from './PostModal';
import { ColorRing } from 'react-loader-spinner';

const Posts = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: postData = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['getPost'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/getPost`);
            return response.data;
        }
    });

    const handleTextareaClick = () => {
        if (!user) {
            navigate('/login');
        } else {
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    if (isLoading) {
        return <div className="text-center mt-8">
            
          <div className='flex justify-center mt-28'>
          <ColorRing
  height="80"
  width="80"
  ariaLabel="fidget-spinner-loading"
  wrapperStyle={{}}
  wrapperClass="fidget-spinner-wrapper"
  /> 
          </div>
        </div>;
    }

    if (isError) {
        return <div className="text-center mt-8 text-red-500">Error fetching posts.Please Reload The page</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Social Media Posts</h2>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <textarea 
                    readOnly
                        className="w-full border rounded-lg p-3 focus:outline-none"
                        placeholder="What's on your mind?"
                        onClick={handleTextareaClick}
                    ></textarea>
                </div>

                {postData.length > 0 ? (
                    postData.map(data => (
                        <SinglePost 
                            key={data._id}
                            data={data}
                            refetch={refetch}
                        />
                    ))
                ) : (
                    <div className="text-center mt-8">No posts available.</div>
                )}

                <PostModal 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    refetch={refetch} 
                />
            </div>
        </div>
    );
};

export default Posts;
