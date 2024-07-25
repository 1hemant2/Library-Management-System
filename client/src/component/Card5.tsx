import React, { useState } from 'react';
import { createUserApi } from '../api/userApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
}

const Card5: React.FC = () => {
    const [data, setData] = useState<RegisterData>({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: ""
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
        try {
            console.log('Data being sent:', data); // Log data here
            const res = await createUserApi(data);
            console.log(res);
            if (res.success) {
                setData({
                    username: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    contactNumber: ""
                })
                toast.success(res.message, {
                    position: "top-center",
                });
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: "top-center",
            });
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className='border border-gray-300 bg-white rounded-lg shadow-lg sm:p-16 pt-16 pb-16 flex flex-col max-w-md w-full space-y-6'>
                <h2 className="text-2xl font-bold text-center">User Details</h2>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-6 p-4'>
                    <div className='flex space-x-4'>
                        <input
                            type="text"
                            className='border border-gray-300 rounded-lg p-2 w-full'
                            placeholder="First Name"
                            name='firstName'
                            value={data.firstName} // Controlled component
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className='border border-gray-300 rounded-lg p-2 w-full'
                            placeholder="Last Name"
                            name='lastName'
                            value={data.lastName} // Controlled component
                            onChange={handleChange}
                        />
                    </div>

                    <input
                        type="email"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="Email"
                        name='email'
                        value={data.email} // Controlled component
                        onChange={handleChange}
                        title="Please enter a valid email address."
                        required
                    />
                    <input
                        type="text"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="Username"
                        name='username'
                        value={data.username} // Controlled component
                        onChange={handleChange}
                        required
                        title="Username required"
                    />
                    <input
                        type="text"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="Contact Number"
                        name='contactNumber'
                        value={data.contactNumber} // Controlled component
                        onChange={handleChange}
                        required
                        title="Contact number required"
                    />
                    <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700'>
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Card5;
