import React from 'react';
import { Link } from 'react-router-dom';
import "./BarraNavegacao.css";
import logo from "../../assets/images/logo_icon.png"

export default function BarraNavegacao() {
    return (
        <div className="nav">
            <div>
                <Link to="/home" className='text-white-50 fw-bold'>
                    <img className='logo-icon' src={logo} alt="logo Planificadora Alpha" />
                </Link>
            </div>
            <div>
                <Link to="/#" className='text-white-50 fw-bold'>sair</Link>
            </div>
        </div>
    );
}
