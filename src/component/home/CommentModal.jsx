import { useContext, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "react-loader-spinner";

const CommentModal = ({ onClose, _id, countRefetch }) => {
    const [newComment, setNewComment] = useState('');
    const [displayedComments, setDisplayedComments] = useState(5);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: commentCollection = [], isLoading, refetch } = useQuery({
        queryKey: ['commentGet', _id],
        queryFn: async () => {
            const response = await axiosSecure.get(`/getComment/${_id}`);
            return response.data; // Ensure you return the data property
        }
    });

    const handleAddComment = async () => {
        const commentData = {
            commentorName: user?.displayName,
            comment: newComment,
            date: new Date(),
            id: _id
        };

        try {
            const response = await axiosSecure.post('/addComment', commentData);
            if (response.data.insertedId) {
                refetch();
                countRefetch()
                setNewComment(''); 
                toast.success('Comment added successfully!');
            }
        } catch (error) {
            toast.error('Failed to add comment');
        }
    };

    const handleShowMore = () => {
        setDisplayedComments(prev => prev + 5);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <Toaster />
            <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-lg max-h-full overflow-y-auto">
                <div className="text-right sticky top-0 bg-white p-2">
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h2 className="text-xl font-bold mb-4">Comment</h2>
              {
               isLoading ? <Comment
               visible={true}
               height="80"
               width="80"
               ariaLabel="comment-loading"
               wrapperStyle={{}}
               wrapperClass="comment-wrapper"
               color="#fff"
               backgroundColor="#F4442E"
               /> :   <div className="mb-4">
               {commentCollection.length === 0 ? (
                   <p className="text-gray-400">No comments yet.</p>
               ) : (
                   commentCollection.slice(0, displayedComments).map(comment => (
                       <div key={comment.id}>
                           <p className="font-bold">{comment.commentorName}</p>
                           <p className="border-b border-gray-200 pb-2 ml-8">{comment.comment}</p>
                       </div>
                   ))
               )}
               {displayedComments < commentCollection.length && (
                   <button 
                       className="text-blue-500 hover:underline mt-4" 
                       onClick={handleShowMore}
                   >
                       Show More
                   </button>
               )}
           </div>
              }
                <textarea
                    className="w-full rounded-lg border-gray-200 p-2"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
                    onClick={handleAddComment}
                >
                    Add Comment
                </button>
            </div>
        </div>
    );
};

export default CommentModal;
