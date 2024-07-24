import React, { useState } from 'react';
import Card1 from '../component/Card1';
import SearchBar from '../component/SearchBar';
import Footer from '../component/Footer';

import Pagination from '../component/Pagination';

const Home: React.FC = () => {

    const searchBook = (input: string) => {
        console.log(input);
    }

    return (
        <div>

            <div className='min-h-screen'>
                <button type='submit' className='bg-black text-white py-2 px-4 rounded-lg hover:bg-slate-700 m-5'>View History</button>
                <div>
                    <SearchBar action='searchBook' placeholderValue='search book...' fn={searchBook}></SearchBar>
                </div>

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