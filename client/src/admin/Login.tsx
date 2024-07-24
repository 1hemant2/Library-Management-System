import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { loginApi } from '../../api/doctorApi';
// import { useUserDetils } from '../../hooks/useCurrentUser';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface LoginData {
    email: string;
    password: string;
}

/**
 * Login component for doctors.
 * @returns {JSX.Element} The rendered Login component.
 */

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<LoginData>({
        email: '',
        password: ''
    });
    // const user = useUserDetils();
    // if (user?.specialty) {
    //     navigate('/dr');
    // }

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
    * Handles form submission and login process.
    * @param {React.FormEvent<HTMLFormElement>} e - The form event.
    */
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         const res = await loginApi(data);
    //         if (!res.success) {
    //             throw { message: res.message };
    //         } else {
    //             localStorage.setItem('token', res.token);
    //             navigate('/dr');
    //         }
    //     } catch (error: any) {
    //         toast.error(error.message, {
    //             position: "top-center",
    //         });
    //     }
    // };

    return (
        <div className="flex justify-center items-center h-screen bg-blue p-4 sm:p-00">
            {/* <ToastContainer /> */}
            <div className="border border-gray-300 bg-white rounded-lg shadow-lg sm:p-8 pt-16 pb-16 flex flex-col max-w-md w-full space-y-6">
                <h2 className="text-2xl font-bold text-center">Admin Login</h2>
                <form className="flex flex-col space-y-6 p-4">
                    <input
                        type="email"
                        name="email"
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        placeholder="Email or username"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700"
                    >
                        Login
                    </button>
                </form>
                <div className='ml-8'>Don't have an account?<span className="ml-2 text-blue-500 cursor-pointer" onClick={() => navigate('/admin/register')}>Register</span></div>
            </div>
        </div>
    );
};

export default Login;