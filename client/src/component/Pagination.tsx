import React from 'react';

interface paginationProps {
    currentPage: number,
    totalPage: number
}

const Pagination: React.FC<paginationProps> = ({ currentPage, totalPage }) => {
    return (
        <div className='space-x-5'>
            <span className='cursor-pointer'>
                <i className="ri-arrow-left-double-fill text-2xl"></i>
            </span>
            <span className="text-2xl">
                {currentPage} of {totalPage}
            </span>
            <span className='cursor-pointer'>
                <i className="ri-arrow-right-double-fill text-2xl"></i>
            </span>
        </div>
    );
};

export default Pagination;