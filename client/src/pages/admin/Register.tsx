import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerApi } from '../../api/adminApi';

interface RegisterData {
    "username": string,
    "firstName": string,
    "lastName": string,
    "password": string,
    "email": string,
    "contactNumber": string
}




/**
 * Register component for doctors.
 * @returns {JSX.Element} The rendered Register component.
 */
const Register: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<RegisterData>(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            username: '',
            contactNumber: ''
        }
    );



    /**
    * Handles input change and updates the state.
    * @param {React.ChangeEvent<HTMLInputElement>} e - The change event of the input.
    */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    /**
     * Handles form submission and registration process.
     * @param {React.FormEvent<HTMLFormElement>} e - The form event.
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await registerApi(data);
            if (!res.success) {
                throw { message: res.message };
            } else {
                navigate('/admin/login');
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: "top-center",
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-blue p-4 sm:p-0">
            <ToastContainer />
            <div className='border border-gray-300 bg-white rounded-lg shadow-lg sm:p-8 pt-16 pb-16 flex flex-col max-w-md w-full space-y-6'>
                <h2 className="text-2xl font-bold text-center">Admin Signup</h2>
                <form className='flex flex-col space-y-6 p-4' onSubmit={handleSubmit}>
                    <div className='flex space-x-4'>
                        <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="First Name" name='firstName' onChange={handleChange} required />
                        <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Last Name" name='lastName' onChange={handleChange} required />
                    </div>
                    <input type="email" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="Email" name='email' onChange={handleChange}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="Please enter a valid email address."
                        required
                    />
                    <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="username" name='username' onChange={handleChange}
                        title="username should be unique."
                        required
                    />
                    <input
                        type="password"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="Password "
                        name='password'
                        onChange={handleChange}
                        required
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        // minLength={8}
                        title="Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number."
                    />

                    <input type="text" className='border border-gray-300 rounded-lg p-2 w-full' placeholder="contact number" name='contactNumber' onChange={handleChange} required />
                    <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700 ' >Register</button>
                </form>
                <div className='ml-8'>Already have account?<span className='ml-2 text-blue-500 cursor-pointer' onClick={() => navigate('/admin/login')}>Login</span> </div>
            </div>
        </div>
    );
};

export default Register;