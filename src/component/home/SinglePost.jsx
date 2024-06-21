import { FaComment, FaEdit, FaThumbsUp, FaTrash } from "react-icons/fa";
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import CommentModal from './CommentModal'; 
import UpdateModal from './UpdateModal'; 
import { AuthContext } from "../../provider/AuthProvider";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SinglePost = ({ data, refetch }) => {
    const { date, _id, email, photo, postContent, userName, likes = [], comments = [] } = data;
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showFullText, setShowFullText] = useState(false); 
    const [localLikes, setLocalLikes] = useState(likes); // Local state for likes
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // get comment count
    const { data: commentCount = 0, refetch: countRefetch } = useQuery({
        queryKey: ['commentCount', _id],
        queryFn: async () => {
            const res = axiosSecure.get(`/getCommentCount/${_id}`);
            return res;
        }
    });
    const totalCount = commentCount?.data?.commentCount;

    const toggleCommentModal = () => {
        setShowCommentModal(!showCommentModal);
    };

    const toggleUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
    };

    const handleLikeClick = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            const endpoint = localLikes.includes(user.email) ? `/unlikePost/${_id}` : `/likePost/${_id}`;
            await axiosSecure.put(endpoint);
            const updatedLikes = localLikes.includes(user.email)
                ? localLikes.filter(like => like !== user.email)
                : [...localLikes, user.email];
            setLocalLikes(updatedLikes); // Update local likes immediately
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axiosSecure.delete(`/deletePost/${id}`);
            if (data.deletedCount > 0) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your post has been deleted.",
                    icon: "success"
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });
        }
    };

    const confirmDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id);
            }
        });
    };

    const handleCommentClick = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        toggleCommentModal();
    };

    const handleEditClick = () => {
        if (user?.email !== email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Only the author can update this post!",
            });
            return;
        }
        toggleUpdateModal();
    };

    const formattedDate = new Date(date).toLocaleString();

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-xl font-bold">{userName}</h3>
                    <p className="text-gray-500 text-xs">{formattedDate}</p>
                </div>
                {user && user.email === email && (
                    <div className="flex space-x-2">
                        <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700" onClick={handleEditClick} />
                        <FaTrash onClick={() => confirmDelete(_id)} className="text-red-500 cursor-pointer hover:text-red-700" />
                    </div>
                )}
            </div>
            <div className="mb-4">
                {photo && (
                    <img src={photo} alt="Post" className="w-full h-[300px] rounded-lg mb-4" />
                )}
                <p className="text-gray-800">
                    {showFullText || postContent.length <= 40 ? postContent : `${postContent.substring(0, 300)}...`}
                    {postContent.length > 40 && (
                        <button onClick={() => setShowFullText(!showFullText)} className="text-blue-500 hover:underline ml-2">
                            {showFullText ? "Show less" : "Show more"}
                        </button>
                    )}
                </p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-center space-x-2" onClick={handleLikeClick}>
                    <FaThumbsUp className={`cursor-pointer ${localLikes.includes(user?.email) ? 'text-blue-700' : 'text-gray-500'} hover:text-blue-700`} />
                    <span className="text-gray-600">{localLikes.length} Like{localLikes.length !== 1 && 's'}</span>
                </div>
                <div onClick={handleCommentClick} className="flex items-center cursor-pointer space-x-2">
                    <FaComment className="text-blue-500 cursor-pointer hover:text-blue-700" />
                    <span className="text-gray-600">{totalCount} Comment{totalCount !== 1 && 's'}</span>
                </div>
            </div>

            {showCommentModal && (
                <CommentModal
                    onClose={toggleCommentModal}
                    _id={_id}
                    countRefetch={countRefetch}
                />
            )}

            {showUpdateModal && (
                <UpdateModal
                    onClose={toggleUpdateModal}
                    _id={_id}
                    initialContent={postContent}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

SinglePost.propTypes = {
    data: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default SinglePost;
