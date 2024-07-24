import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Card1Props {
    name: string;
    authorName: string;
    currenAvilibility: number;
}


const Card1: React.FC<Card1Props> = ({ name, authorName, currenAvilibility }) => {
    // const navigate = useNavigate();
    // function handleAction(action: string) {
    //     switch (action) {
    //         case 'uploadPdf':
    //             if (fn) {
    //                 fn();
    //             }
    //             break;
    //         case 'viewPdf':
    //             navigate('/dr/available-pdf');
    //             break;
    //         case 'avilablePatients':
    //             navigate('/dr/available-patient')
    //             break;
    //         case 'assignPatients':
    //             navigate('/dr/assigned-patient')
    //             break;
    //         default:
    //             break;
    //     }
    // }
    return (
        <div className="p-4 border border-gray-300 shadow-xl rounded-lg w-[90%]  h-50 relative">
            <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-14 text-gray-700 mb-1  ">
                    <path d="M3 18.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22H6.5C4.567 22 3 20.433 3 18.5ZM19 20V17H6.5C5.67157 17 5 17.6716 5 18.5C5 19.3284 5.67157 20 6.5 20H19ZM5 15.3368C5.45463 15.1208 5.9632 15 6.5 15H19V4H6C5.44772 4 5 4.44772 5 5V15.3368Z"></path>
                </svg>
            </div>
            <div className="text-xl font-medium flex justify-center">{name}</div>
            <div className='font-mono text-slate-500 mt-1'>{authorName}</div>
            <div className='flex justify-end'>{currenAvilibility}</div>
        </div>
    );
};

export default Card1;