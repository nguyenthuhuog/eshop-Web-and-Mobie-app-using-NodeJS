import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import '../css/homepage.css';

const Sidebar = () => {
    const isAdmin = Cookies.get('isAdmin') === '1';
    return (
        <div className="sidebar">
            <div className="sidebar__inner">
                <ul>
                    <li>
                        <Link to="/computer">
                            <span className="icon"><i className="fas fa-laptop"></i></span>
                            <span className="title">Computer & Laptop</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/mouse">
                            <span className="icon"><i className="fas fa-computer-mouse"></i></span>
                            <span className="title">Mouses</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/keyboard">
                            <span className="icon"><i className="fas fa-keyboard"></i></span>
                            <span className="title">Keyboards</span>
                        </Link>
                    </li>
                    {isAdmin && (
                        <li>
                            <Link to="/admincomputer">
                                <span className="icon"><i className="fas fa-pencil"></i></span>
                                <span className="title">Add product</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
