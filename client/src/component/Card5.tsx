import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface RegisterData {
    currentAvailability: 0;
    name: string;

}
const Card5: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<RegisterData>(
        {
            currentAvailability: 0,
            name: '',
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
                    <div className='flex space-x-4'>
                        <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="First Name" name='firstName' onChange={handleChange} />
                        <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Last Name" name='lastName' onChange={handleChange} />
                    </div>

                    <input
                        type="email"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="email"
                        name='email'
                        onChange={handleChange}
                        title="Please enter a valid email address."
                        required
                    />
                    <input
                        type="text"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="username"
                        name='currentAvailability'
                        onChange={handleChange}
                        required
                        title="avilable book"
                    />
                    <input
                        type="text"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="contact number"
                        name='currentAvailability'
                        onChange={handleChange}
                        required
                        title="avilable book"
                    />
                    <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700'>
                        Change Avalability
                    </button>
                </form>

                <div className='ml-8'>Already have account?<span className='ml-2 text-blue-500 cursor-pointer' onClick={() => navigate('/pt/login')}>Login</span> </div>
            </div>
        </div>
    );
};

export default Card5;