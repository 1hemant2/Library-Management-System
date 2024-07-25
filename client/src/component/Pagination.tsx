import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number; // Changed to plural for clarity
    changePage: (page: number) => void; // Changed function name for clarity
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, changePage }) => {

    const handlePrevPage = () => {
        if (currentPage > 1) {
            changePage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            changePage(currentPage + 1);
        }
    };

    return (
        <div className='space-x-5 flex items-center'>
            <button
                className='cursor-pointer'
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                aria-label="Previous Page"
            >
                <i className="ri-arrow-left-double-fill text-2xl"></i>
            </button>
            <span className="text-2xl">
                {currentPage} of {totalPages}
            </span>
            <button
                className='cursor-pointer'
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
            >
                <i className="ri-arrow-right-double-fill text-2xl"></i>
            </button>
        </div>
    );
};

export default Pagination;
