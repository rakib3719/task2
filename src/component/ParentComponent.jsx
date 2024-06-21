// src/components/ParentComponent.jsx


import { useState } from 'react';
import Posts from './home/Posts';
import PostModal from './home/PostModal';
import { Toaster } from 'react-hot-toast';

const ParentComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
   

    return (
        <div>
            <Toaster></Toaster>
            <Posts openModal={openModal} />
            <PostModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default ParentComponent;
