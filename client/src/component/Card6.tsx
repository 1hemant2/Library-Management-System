import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addBookApi } from '../api/bookApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NewBook {
    currentAvailability: string;
    name: string;
    author: string;
}

const Card6: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<NewBook>({
        currentAvailability: '',
        name: '',
        author: ''
    });

    /**
     * Handles input change events and updates the form data state.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: name === 'currentAvailability' ? Number(value) : value
        }));
    };

    /**
     * Handles form submission, calls the register API, and manages navigation and error handling.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await addBookApi(data);
            if (res.success) {
                setData({
                    currentAvailability: '',
                    name: '',
                    author: ''
                });
                toast.success(res.message, {
                    position: "top-center",
                });
            } else {
                throw res;
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.message, {
                position: "top-center",
            });
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className='border border-gray-300 bg-white rounded-lg shadow-lg sm:p-16 pt-16 pb-16 flex flex-col max-w-md w-full space-y-6'>
                <h2 className="text-2xl font-bold text-center">Add new Book</h2>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-6 p-4'>
                    <input
                        type="text"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="Book name"
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="Author"
                        name='author'
                        value={data.author}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="Current Availability"
                        name='currentAvailability'
                        value={data.currentAvailability}
                        onChange={handleChange}
                        required
                    />
                    <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700'>
                        Add New Book
                    </button>
                </form>

                <div className='ml-8'>
                    Already have an account?
                    <span className='ml-2 text-blue-500 cursor-pointer' onClick={() => navigate('/pt/login')}>Login</span>
                </div>
            </div>
        </div>
    );
};

export default Card6;
