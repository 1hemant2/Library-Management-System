import React, { useEffect, useState } from 'react';
import Card1 from '../../component/Card1';
import SearchBar from '../../component/SearchBar';
import Footer from '../../component/Footer';
import NavBar from '../../component/NavBar';
import Modal from '../../component/Modal';
import Card5 from '../../component/Card5';
import Card6 from '../../component/Card6';
import Pagination from '../../component/Pagination';
import { getBookApi } from '../../api/bookApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/—Pngtree—not found outline icon vectors_5053765.png'
import { searchBookApi } from '../../api/bookApi';

const Home: React.FC = () => {
    const [isNavbar, setIsNavbar] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [isModal, setIsModal] = useState({
        'card5': false,
        'card6': false
    });

    const handleNav = () => {
        setIsNavbar(!isNavbar);
    }

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
    const handleModal = (card: 'card5' | 'card6') => {
        setIsModal((prevState) => ({
            ...prevState,
            [card]: !prevState[card],
        }));
    }

    const changePages = (page: number) => {
        setCurrentPage(page);
    }

    const handleData = async () => {
        try {
            const res = await getBookApi(currentPage);
            if (res.success) {
                setData(res.data);
                setTotalPage(res.totalPage);
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: "top-center",
            });
        }
    }

    const handleNavigate = (bookName: string) => {
        navigate(`/admin/operation/${bookName}`);
    }

    useEffect(() => {
        handleData();
    }, [currentPage])

    return (
        <div>
            <ToastContainer />
            <div className='min-h-screen'>
                {
                    isNavbar &&
                    (
                        <NavBar onClose={handleNav} handleModal={handleModal} ></NavBar>
                    )
                }
                <div className='m-2 cursor-pointer' onClick={handleNav}>
                    <i className="ri-menu-line text-4xl "></i>
                </div>

                <div>
                    <SearchBar action='searchBook' placeholderValue='search book...' fn={searchBook}></SearchBar>
                </div>
                {
                    isModal.card5 &&
                    (
                        <Modal onClose={() => handleModal('card5')}>
                            <Card5></Card5>
                        </Modal>
                    )
                }
                {
                    isModal.card6 && (
                        <Modal onClose={() => handleModal('card6')}>
                            <Card6></Card6>
                        </Modal>
                    )
                }
                <div className="grid lg:grid-cols-3 md:grid-cols-2 ml-20 sm:grid-cols-2 mr-20 mt-10 mb-10 gap-y-10 ">
                    {
                        data.map((d: any) => (
                            <div onClick={() => handleNavigate(d.name)} className='cursor-pointer'>
                                <Card1 name={d.name} authorName={d.author} currenAvilibility={d.currentAvailability
                                }></Card1>
                            </div>

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