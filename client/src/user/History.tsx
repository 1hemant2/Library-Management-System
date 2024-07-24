import React from 'react';
import SearchBar from '../component/SearchBar';
import Footer from '../component/Footer';

const History: React.FC = () => {
    const searchBook = (input: string) => {
        console.log(input);
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700 m-5'>Home</button>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 h-[600px] overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4 flex justify-center">Your transaction history</h1>
                <SearchBar action='' fn={searchBook} placeholderValue='Enter username or email' />

                <table className="min-w-full bg-white mt-6">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Book Details</th>
                            <th className="py-2 px-4 border-b text-left">Due Date</th>
                            <th className="py-2 px-4 border-b text-left">Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b">The Great Gatsby</td>
                            <td className="py-2 px-4 border-b"></td>
                            <td className="py-2 px-4 border-b">return</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">1984</td>
                            <td className="py-2 px-4 border-b">2024-08-15</td>
                            <td className="py-2 px-4 border-b">issue</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default History;
