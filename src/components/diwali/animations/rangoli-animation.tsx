"use client";
import React, { useEffect, useState } from 'react';

const Firecracker = ({ style }: { style: React.CSSProperties }) => (
    <div style={style} className="absolute w-1 h-1 bg-yellow-400 rounded-full" />
);

const FirecrackersAnimation = () => {
    const [firecrackers, setFirecrackers] = useState<any[]>([]);

    useEffect(() => {
        const createFirecracker = () => {
            const id = Date.now() + Math.random();
            const delay = Math.random() * 10;
            const duration = 1 + Math.random() * 2;
            const top = 10 + Math.random() * 40;
            const left = 10 + Math.random() * 80;

            const particles = Array.from({ length: 30 }).map((_, i) => ({
                id: `${id}-${i}`,
                style: {
                    top: `${top}%`,
                    left: `${left}%`,
                    animation: `burst ${duration}s ease-out ${delay}s forwards`,
                    '--angle': `${(i / 30) * 360}deg`,
                    '--distance': `${30 + Math.random() * 70}px`,
                    backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                }
            }));
            return particles;
        };

        const allFirecrackers = Array.from({ length: 15 }, createFirecracker).flat();
        setFirecrackers(allFirecrackers);

        const interval = setInterval(() => {
             const newFirecrackers = Array.from({ length: 15 }, createFirecracker).flat();
             setFirecrackers(newFirecrackers);
        }, 10000);
        
        return () => clearInterval(interval);

    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {firecrackers.map(f => <Firecracker key={f.id} style={f.style} />)}
            <style jsx>{`
                @keyframes burst {
                    0% {
                        transform: translate(0, 0) scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(cos(var(--angle)) * var(--distance)), calc(sin(var(--angle)) * var(--distance))) scale(1);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default FirecrackersAnimation;
