import React, { useEffect, useState } from 'react';
import Modal from '../../component/Modal';
import Card2 from '../../component/Card2';
import Card3 from '../../component/Card3';
import { bookDetailApi, deleteBookApi } from '../../api/bookApi';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Operation: React.FC = () => {
    const param = useParams();
    const navigate = useNavigate();
    const name: string = param.name as string;
    const [data, setData] = useState<any>({});
    const [transactionType, setTransactionType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState({
        card2: false,
        card3: false
    });

    const bookDetails = async () => {
        try {
            const res = await bookDetailApi(name);
            if (res.success) {
                setData(res.data);
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: "top-center",
            });
        }
    }


    const toggleModal = (card: 'card2' | 'card3') => {
        setIsModalOpen((prevState) => ({
            ...prevState,
            [card]: !prevState[card],
        }));
    };
    const handleTransactionType = (val: string) => {
        setTransactionType(val);
        toggleModal('card2')
    }
    const handleDelete = async () => {
        try {
            const res = await deleteBookApi(name);
            if (res.success) {
                toast.success(res.message, {
                    position: "top-center",
                });
                setTimeout(() => {
                    navigate('/admin');
                }, 1000);
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: "top-center",
            });
        }
    }
    useEffect(() => {
        bookDetails();
    }, [])
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
            <ToastContainer></ToastContainer>
            <div className='fixed inset-0'>
                <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700 m-5' onClick={() => navigate('/admin/')}>Home</button>
            </div>
            <div className="flex flex-col items-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-gray-700 mb-4">
                    <path d="M3 18.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22H6.5C4.567 22 3 20.433 3 18.5ZM19 20V17H6.5C5.67157 17 5 17.6716 5 18.5C5 19.3284 5.67157 20 6.5 20H19ZM5 15.3368C5.45463 15.1208 5.9632 15 6.5 15H19V4H6C5.44772 4 5 4.44772 5 5V15.3368Z"></path>
                </svg>
                {isModalOpen.card2 && (
                    <Modal onClose={() => toggleModal('card2')}>
                        <Card2 name={name} transactionType={transactionType} />
                    </Modal>
                )}
                {isModalOpen.card3 && (
                    <Modal onClose={() => toggleModal('card3')}>
                        <Card3 name={name} />
                    </Modal>
                )}

                <div className="text-2xl font-semibold text-gray-700 mb-2">{data.name}</div>
                <div className="text-lg font-medium text-gray-600 mb-2">{data.author}</div>
                <div className="text-lg font-medium text-gray-800 mb-4"><span>avilability: </span>{data.currentAvailability}</div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button onClick={() => handleTransactionType('issue')} className='bg-gray-700 text-white px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105'>
                    Issue Book
                </button>
                <button onClick={() => handleTransactionType('returned')} className='bg-gray-700 text-white px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105'>
                    Return Book
                </button>
                <button onClick={() => toggleModal('card3')} className='bg-gray-700 text-white px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105'>
                    Change Availability
                </button>
                <button className='bg-gray-700 text-white px-6 py-2 rounded-md shadow-md transition-transform transform hover:scale-105' onClick={handleDelete}>
                    Delete Book
                </button>
            </div>
        </div>
    );
};

export default Operation;
