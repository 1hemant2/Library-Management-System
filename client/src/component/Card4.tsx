import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface issueBook {
    email: string;
    bookName: string;
}
const Card4: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<issueBook>(
        {
            email: '',
            bookName: ''
        }
    );

    /**
     * Handles input change events and updates the form data state.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
     */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    /**
     * Handles form submission, calls the register API, and manages navigation and error handling.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        try {
            // const res = await registerApi(data);
            // console.log(res);
            // if (!res.success) {
            //     throw { message: res.message };
            // } else {
            //     navigate('/pt/login');
            // }
        } catch (error: any) {
            // toast.error(error.message, {
            //     position: "top-center",
            // });
        }
    };
    return (
        <div>
            <div className='border border-gray-300 bg-white rounded-lg shadow-lg sm:p-16 pt-16 pb-16 flex flex-col max-w-md w-full space-y-6'>
                <h2 className="text-2xl font-bold text-center">Patient Sign-Up</h2>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-6 p-4'>
                    <input
                        type="text"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="email or username"
                        name='email'
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="book name"
                        name='bookName'
                        onChange={handleChange}
                        required
                        title="Book is required."
                    />
                    <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700'>Register</button>
                </form>

                <div className='ml-8'>Already have account?<span className='ml-2 text-blue-500 cursor-pointer' onClick={() => navigate('/pt/login')}>Login</span> </div>
            </div>
        </div>
    );
};

export default Card4;