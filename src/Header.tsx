// src/Header.tsx

import React from 'react';
import headerImage from './assets/header.png';
import './index.css';

const Header: React.FC = () => (
    <div id="image03" className="image">
        <span className="frame">
        <img src={headerImage} alt="Header"/>
            </span>
    </div>
);

export default Header;
