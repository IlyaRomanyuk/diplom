import React from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

export const NavbarMenu = ({ exitToken }) => {

    const handleExitToken = () => {
        Swal.fire('Вы действительно хотите выйти ?').
            then(response => {
                if (response.isConfirmed) {
                    exitToken();
                } else {
                    return;
                }
            })
    }

    return (
        <div className="navbar__links">
            <div>
                <Link to="/" >Home</Link>
                <Link to="/profile" >Profile</Link>
            </div>
            <button onClick={handleExitToken} className="wrapper__clean">Выход</button>
        </div>
    )
}
