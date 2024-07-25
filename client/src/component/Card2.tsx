import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { issueBookApi, returnBookApi } from '../api/bookApi';
import { ToastContainer, toast } from 'react-toastify';


interface card2Props {
    name: string;
    transactionType: string;
}

const Card2: React.FC<card2Props> = ({ name, transactionType }) => {
    const [data, setData] = useState(
        {
            user: '',
            bookName: name,
            transactionType: transactionType
        }
    );


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    /**
    * Handles form submission based on the transaction type.
    * 
    * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
    */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        switch (transactionType) {
            case 'issue':
                issueFn(e);
                break;
            case 'returned':
                returnFn(e);
                break;
            default:
                break;
        }
    };

    /**
     * Handles form submission, calls the register API, and manages navigation and error handling.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
     */
    const issueFn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await issueBookApi(data);
            if (res.success) {
                toast.success(res.message, {
                    position: "top-center",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: "top-center",
            });
        }
    };
    const returnFn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await returnBookApi(data);
            if (res.success) {
                toast.success(res.message, {
                    position: "top-center",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: "top-center",
            });
        }
    };
    return (
        <div>
            <ToastContainer></ToastContainer>
            <div className='border border-gray-300 bg-white rounded-lg shadow-lg sm:p-16 pt-16 pb-16 flex flex-col max-w-md w-full space-y-6'>
                <h2 className="text-2xl font-bold text-center">{transactionType === 'issue' ? 'Issue Book' : 'Return Book'}</h2>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-6 p-4'>
                    <input
                        type="text"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="email or username"
                        name='user'
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="book name"
                        name='bookName'
                        onChange={handleChange}
                        disabled
                        value={name}
                        required
                        title="Book is required."
                    />
                    <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700'>{transactionType === 'issue' ? 'issue' : 'Accept'}</button>
                </form>
            </div>
        </div>
    );
};

export default Card2;