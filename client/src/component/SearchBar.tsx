import React, { useState } from 'react';

interface SearchBarProps {
    placeholderValue: string;
    action: string
    fn: Function;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholderValue, action, fn }) => {
    const [input, setInput] = useState<string>();

    function searchFn(action: string) {
        switch (action) {
            case 'searchUser':
                fn(input);
                break;
            case 'searchBook':
                fn(input);
                break;
            default:
                break;
        }
    }

    const handleChange = (e: any) => {
        setInput(e.target.value);
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchFn(action);
        }
    }
    return (
        <div className="w-full flex justify-center items-center mt-4">
            <div className="relative w-80 max-w-xl">
                <input
                    type="text"
                    placeholder={placeholderValue}
                    className="w-full pl-10 pr-4 py-2 rounded-lg shadow-lg border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition duration-300"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                />
                <svg
                    className="absolute right-3 top-2.5 w-5 h-5 text-gray-700 cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    onClick={() => searchFn(action)}
                >
                    <path
                        fillRule="evenodd"
                        d="M11 2a9 9 0 100 18 9 9 0 000-18zM3 11a8 8 0 1113.196 6.032l4.615 4.616a1 1 0 01-1.415 1.415l-4.616-4.615A8 8 0 013 11z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    );
};

export default SearchBar;