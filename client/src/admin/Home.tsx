import React, { useState } from 'react';
import Card1 from '../component/Card1';
import SearchBar from '../component/SearchBar';
import Footer from '../component/Footer';
import NavBar from '../component/NavBar';
import Modal from '../component/Modal';
import Card5 from '../component/Card5';
import Card6 from '../component/Card6';
import Pagination from '../component/Pagination';

const Home: React.FC = () => {
    const [isNavbar, setIsNavbar] = useState(false);
    const [isModal, setIsModal] = useState({
        'card5': false,
        'card6': false
    });
    const searchBook = (input: string) => {
        console.log(input);
    }

    const handleNav = () => {
        setIsNavbar(!isNavbar);
    }

    const handleModal = (card: 'card5' | 'card6') => {
        setIsModal((prevState) => ({
            ...prevState,
            [card]: !prevState[card],
        }));
    }
    return (
        <div>

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
                    <Card1 name='A song of ice and fire' authorName='George R. R. Martin' currenAvilibility={10}></Card1>
                    <Card1 name='A song of ice and fire' authorName='George R. R. Martin' currenAvilibility={10}></Card1>
                    <Card1 name='A song of ice and fire' authorName='George R. R. Martin' currenAvilibility={10}></Card1>
                    <Card1 name='A song of ice and fire' authorName='George R. R. Martin' currenAvilibility={10}></Card1>
                    <Card1 name='A song of ice and fire' authorName='George R. R. Martin' currenAvilibility={10}></Card1>
                    <Card1 name='A song of ice and fire' authorName='George R. R. Martin' currenAvilibility={10}></Card1>
                    <Card1 name='A song of ice and fire' authorName='George R. R. Martin' currenAvilibility={10}></Card1>
                    <Card1 name='A song of ice and fire' authorName='George R. R. Martin' currenAvilibility={10}></Card1>
                    <Card1 name='A song of ice and fire' authorName='George R. R. Martin' currenAvilibility={10}></Card1>
                </div>
            </div>
            <div className='flex justify-center mt-5'>
                <Pagination currentPage={1} totalPage={5}></Pagination>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;