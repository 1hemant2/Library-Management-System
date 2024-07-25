import React, { useEffect, useState } from 'react';
import Card1 from '../../component/Card1';
import SearchBar from '../../component/SearchBar';
import Footer from '../../component/Footer';

import Pagination from '../../component/Pagination';
import { getBookApi, searchBookApi } from '../../api/bookApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/—Pngtree—not found outline icon vectors_5053765.png'

const Home: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [data, setData] = useState([]);
    const navigate = useNavigate();


    const handleSearch = async (input: string) => {
        try {
            const res = await searchBookApi(input);
            if (res.success) {
                setData(res.data);
                setTotalPage(res.totalPage)
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: "top-center",
            });
        }
    }
    const searchBook = (input: string) => {
        handleSearch(input);
    }
    const changePages = (page: number) => {
        setCurrentPage(page);
        console.log(page);
    }

    const handleData = async () => {
        try {
            const res = await getBookApi(currentPage);
            if (res.success) {
                setData(res.data);
                setTotalPage(res.totalPage)
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: "top-center",
            });
        }
    }

    useEffect(() => {
        handleData();
    }, [currentPage])

    return (
        <div>
            <ToastContainer />
            <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700 m-5' onClick={() => navigate('/admin/login')}>continue as Admin</button>
            <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700 m-5' onClick={() => navigate('/history')}>Your history</button>
            <div className='min-h-screen'>
                <div>
                    <SearchBar action='searchBook' placeholderValue='search book...' fn={searchBook}></SearchBar>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 ml-20 sm:grid-cols-2 mr-20 mt-10 mb-10 gap-y-10 ">
                    {
                        data.map((d: any) => (
                            <Card1 name={d.name} authorName={d.author} currenAvilibility={d.currentAvailability
                            }></Card1>
                        ))
                    }
                    {
                        data.length === 0 &&
                        <>
                            <span className='text-2xl'>No match found</span>
                            <img src={img1} alt="" className='w-[70%] h-[70%]' />
                        </>

                    }
                </div>
            </div>
            <div className='flex justify-center mt-5'>
                <Pagination currentPage={currentPage} totalPages={totalPage} changePage={changePages}></Pagination>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;