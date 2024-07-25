import React from 'react';
import { useState } from 'react';
import { bookAvailablityApi } from '../api/bookApi';
import { ToastContainer, toast } from 'react-toastify';
interface Card3Props {
    name: string;
}
const Card3: React.FC<Card3Props> = ({ name }) => {
    const [data, setData] = useState(
        {
            currentAvailability: '',
            name: name,
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
        try {
            const res = await bookAvailablityApi(data);
            console.log(res);
            if (res.success) {
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
            <ToastContainer></ToastContainer>
            <div className='border border-gray-300 bg-white rounded-lg shadow-lg sm:p-16 pt-16 pb-16 flex flex-col max-w-md w-full space-y-6'>
                <h2 className="text-2xl font-bold text-center">Change Availablity</h2>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-6 p-4'>
                    <input
                        type="text"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="Book name"
                        name='name'
                        value={name}
                        onChange={handleChange}
                        title="Please enter a valid email address."
                        required
                        disabled
                    />
                    <input
                        type="number"
                        className='border border-gray-300 rounded-lg p-2 w-full'
                        placeholder="current avilablity "
                        name='currentAvailability'
                        onChange={handleChange}
                        required
                        title="avilable book"
                    />
                    <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700'>
                        Change Avalability
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Card3;