import React from 'react';

interface navProps {
    onClose: () => void;
    handleModal: (arg1: 'card5' | 'card6') => void;
}
const NavBar: React.FC<navProps> = ({ onClose, handleModal }) => {

    return (
        <div className="w-64 p-4 border-r shadow-lg border text-gray-800 bg-white rounded-sm fixed top-0 left-0 z-10 h-96">
            <div className="flex justify-end"
                onClick={onClose}>
                <i className="ri-close-line cursor-pointer text-xl hover:text-red-600"></i>
            </div>

            <div className="flex flex-col space-y-4 mt-4">
                <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-500 transition-colors duration-300" onClick={() => handleModal('card5')}>
                    <i className="ri-user-add-line"></i>
                    <span>Create User</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-500 transition-colors duration-300 "
                    onClick={() => handleModal('card6')}
                >
                    <i className="ri-sticky-note-add-line"></i>
                    <span>Add Book</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-500 transition-colors duration-300">
                    <i className="ri-logout-circle-r-line"></i>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
