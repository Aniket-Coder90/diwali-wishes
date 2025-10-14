"use client";
import React, { useEffect, useState } from 'react';
import DiyaIcon from '../diya-icon';

const Diya = ({ style }: { style: React.CSSProperties }) => (
    <div style={style} className="absolute bottom-[-150px] will-change-transform">
        <DiyaIcon className="w-16 h-16 animate-pulse" />
    </div>
);

const DiyaAnimation = () => {
    const [diyas, setDiyas] = useState<any[]>([]);

    useEffect(() => {
        const createDiya = () => {
            return {
                id: Date.now() + Math.random(),
                style: {
                    left: `${Math.random() * 90}%`,
                    animation: `float-up ${8 + Math.random() * 8}s linear ${Math.random() * 6}s infinite`,
                    transform: `scale(${0.6 + Math.random() * 0.6})`,
                    opacity: 0.7 + Math.random() * 0.3,
                },
            };
        };
        setDiyas(Array.from({ length: 20 }, createDiya));
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {diyas.map(diya => <Diya key={diya.id} style={diya.style} />)}
            <style jsx>{`
                @keyframes float-up {
                    0% {
                        transform: translateY(0) scale(var(--tw-scale-x, 0.8));
                        opacity: 0;
                    }
                    25%, 75% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-110vh) scale(var(--tw-scale-x, 1.2));
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default DiyaAnimation;
