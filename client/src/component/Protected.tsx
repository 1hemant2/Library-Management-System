import React, { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { varifyAdminApi } from '../api/adminApi';

interface ProtectedProps {
    children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
    const navigate = useNavigate();
    const varify = async () => {
        try {
            const res = await varifyAdminApi();
            console.log(res);
            if (!res.success) {
                navigate('/');
            }
        } catch (error) {
            navigate('/');
        }
    }
    useEffect(() => {
        varify();
    }, []);

    return (
        <div>
            {children}
        </div>
    );
};

export default Protected;
