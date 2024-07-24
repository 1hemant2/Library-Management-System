import React, { useState } from 'react';
import Modal from '../../component/Modal';
import Card2 from '../../component/Card2';
import Card3 from '../../component/Card3';

const Operation: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState({
        card2: false,
        card3: false
    });

    const toggleModal = (card: 'card2' | 'card3') => {
        setIsModalOpen((prevState) => ({
            ...prevState,
            [card]: !prevState[card],
        }));
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
            <div className="flex flex-col items-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-gray-700 mb-4">
                    <path d="M3 18.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22H6.5C4.567 22 3 20.433 3 18.5ZM19 20V17H6.5C5.67157 17 5 17.6716 5 18.5C5 19.3284 5.67157 20 6.5 20H19ZM5 15.3368C5.45463 15.1208 5.9632 15 6.5 15H19V4H6C5.44772 4 5 4.44772 5 5V15.3368Z"></path>
                </svg>
                {isModalOpen.card2 && (
                    <Modal onClose={() => toggleModal('card2')}>
                        <Card2 />
                    </Modal>
                )}
                {isModalOpen.card3 && (
                    <Modal onClose={() => toggleModal('card3')}>
                        <Card3 />
                    </Modal>
                )}

                <div className="text-2xl font-semibold text-gray-700 mb-2">Book Name</div>
                <div className="text-lg font-medium text-gray-600 mb-2">Book Author</div>
                <div className="text-lg font-medium text-gray-600 mb-4">Book Availability</div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button onClick={() => toggleModal('card2')} className='bg-gray-700 text-white px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105'>
                    Issue Book
                </button>
                <button onClick={() => toggleModal('card2')} className='bg-gray-700 text-white px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105'>
                    Return Book
                </button>
                <button onClick={() => toggleModal('card3')} className='bg-gray-700 text-white px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105'>
                    Change Availability
                </button>
                <button className='bg-gray-700 text-white px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105'>
                    Delete Book
                </button>
            </div>
        </div>
    );
};

export default Operation;
