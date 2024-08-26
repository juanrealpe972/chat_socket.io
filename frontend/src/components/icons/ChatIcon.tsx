import React from 'react';

interface ChatIconProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
}

const ChatIcon: React.FC<ChatIconProps> = ({ color = '#0000FF', ...props }) => {
    const startColor = color;
    const endColor = shadeColor(color, - 65);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className="iconify iconify--chat"
            width="40"
            height="40"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 960 960"
            {...props}
        >
            <defs>
                <linearGradient id="gradient1" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor={startColor} />
                    <stop offset="100%" stopColor={endColor} />
                </linearGradient>
            </defs>
            <path
                fill="url(#gradient1)"
                d="M290 776h277L706 965q19 9 31-2.5t12-29.5V776h63q24 0 42-18t18-42V314q0-24-18-42t-42-18H240q-24 0-42 18t-18 42v402q0 24 18 42t42 18zm0-390h499v60H240v-60zm0 90h499v60H240v-60zm0 90h499v60H240v-60z"
            />
        </svg>
    );
};

const shadeColor = (color: string, percent: number): string => {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.round(R * (100 + percent) / 100);
    G = Math.round(G * (100 + percent) / 100);
    B = Math.round(B * (100 + percent) / 100);

    R = Math.min(Math.max(0, R), 255);
    G = Math.min(Math.max(0, G), 255);
    B = Math.min(Math.max(0, B), 255);

    const toHex = (value: number): string => {
        const hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(R)}${toHex(G)}${toHex(B)}`;
};

export default ChatIcon;
