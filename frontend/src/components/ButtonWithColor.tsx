import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonWithColor = ({ selectedColor, buttonText }) => {
    const navigate = useNavigate();

    return (
        <button
            style={{ backgroundColor: selectedColor }}
            className="px-4 py-2 text-white font-bold rounded shadow transition-colors duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 active:opacity-70"
            onClick={() => navigate("/dashboard/chat")}
        >
            {buttonText}
        </button>
    );
};

export default ButtonWithColor;
