import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Bienvenido a la RED!</h1>
                <p className="text-gray-600 mb-6">
                    Conéctate, comparte y colabora con otros usuarios. ¡Explora lo que tenemos para ofrecer!
                </p>
                <button onClick={() => navigate('/login')} className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
                    Empezar
                </button>
            </div>
        </div>
    );
}

export default Home;
