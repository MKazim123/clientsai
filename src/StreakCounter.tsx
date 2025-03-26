// src/StreakCounter.tsx

import React, {useEffect, useState} from 'react';

interface StreakCounterProps {
    streak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({streak}) => {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [streak]);

    return (
        <div className={`streak-counter ${visible ? 'visible' : ''}`} id="streak-counter">
            Streak: {streak} 🔥
        </div>
    );
};

export default StreakCounter;
