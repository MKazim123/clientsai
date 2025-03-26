// src/Fireworks.tsx

import React, {useEffect} from 'react';

const Fireworks: React.FC = () => {
    useEffect(() => {
        createFireworks();
    }, []);

    const createFireworks = () => {
        const container = document.getElementById('fireworks-container');
        if (!container) return;

        container.innerHTML = '';
        const colors = [
            '#FF00FF',
            '#A020F0',
            '#8A2BE2',
            '#9400D3',
            '#9370DB',
            '#7B68EE',
            '#6A5ACD',
            '#FFD700',
            '#FFA500',
            '#FF4500',
        ];

        const textBox = document.getElementById('typed-output');
        if (!textBox) return;
        const rect = textBox.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFirework(container, colors, centerX, centerY);
            }, i * 50);
        }
    };

    const createFirework = (
        container: HTMLElement,
        colors: string[],
        x: number,
        y: number
    ) => {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${x + (Math.random() - 0.5) * 300}px`;
        firework.style.top = `${y + (Math.random() - 0.5) * 200}px`;
        firework.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(firework);

        for (let j = 0; j < 30; j++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];
            spark.style.left = firework.style.left;
            spark.style.top = firework.style.top;
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            spark.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
            spark.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
            container.appendChild(spark);
        }
    };

    return <div id="fireworks-container"></div>;
};

export default Fireworks;

