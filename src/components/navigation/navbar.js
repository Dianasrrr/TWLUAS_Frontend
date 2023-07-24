import React from 'react';
import { useNavigate } from 'react-router-dom';

import './navbar.css'; // Mengimpor file CSS

const Navbar = () => {


    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');

        // Navigate back to the login page
        navigate('/login');
    };

        return (
            <nav>
                <ul>
                    <li><button onClick={handleLogout} style={{backgroundColor:"#ff0000"}}>Logout</button></li>
                </ul>
            </nav>
        );
}

export default Navbar;
