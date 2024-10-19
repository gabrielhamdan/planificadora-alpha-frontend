import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./BarraNavegacao.css";
import logo from "../../assets/images/logo_icon.png"
import useAxiosPriavate from "../../hooks/useAxiosPrivate.js"

export default function BarraNavegacao() {
    const axiosPrivate = useAxiosPriavate();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axiosPrivate.post('/auth/logout',
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
    
            if (response.status === 200)
                navigate("/login");
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="nav">
            <div>
                <Link to="/home" className='text-white-50 fw-bold'>
                    <img className='logo-icon' src={logo} alt="logo Planificadora Alpha" />
                </Link>
            </div>
            <div onClick={handleLogout} className='btn-logout'>
                sair
            </div>
        </div>
    );
}
