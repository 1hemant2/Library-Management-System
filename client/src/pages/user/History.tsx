import React, { useState } from 'react';
import SearchBar from '../../component/SearchBar';
import Footer from '../../component/Footer';
import { useNavigate } from 'react-router-dom';
import { historyApi } from '../../api/transactionApi';
import { ToastContainer, toast } from 'react-toastify';

const History: React.FC = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    const handleData = async () => {
        try {
            const res = await historyApi(user);
            if (res.success) {
                setData(res.data);
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: "top-center",
            });
        }
    }
    const searchUser = (input: string) => {
        setUser(input);
        handleData();
    }

    return (
        <div className=" bg-gray-100 min-h-screen">
            <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700 m-5' onClick={() => navigate('/')}>Home</button>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 h-[600px] overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4 flex justify-center">Your transaction history</h1>
                <SearchBar action='searchUser' fn={searchUser} placeholderValue='Enter username or email' />

                <table className="min-w-full bg-white mt-6">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Book Details</th>
                            <th className="py-2 px-4 border-b text-left">Due Date</th>
                            <th className="py-2 px-4 border-b text-left">Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((d: any) => (
                                <tr>
                                    <td className="py-2 px-4 border-b">{d?.book?.name}</td>
                                    <td className="py-2 px-4 border-b">{d?.dueDate}</td>
                                    <td className="py-2 px-4 border-b">{d.transactionType}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default History;
