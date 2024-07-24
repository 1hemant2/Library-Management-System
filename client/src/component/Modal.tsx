import React from 'react';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='bg-white p-10 border border-gray-300 shadow-lg relative'>
                <button onClick={onClose} className='absolute top-2 right-2'>❌</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
