import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import "./UserForm.css"
import LoginForm from '../login_form/LoginForm';
import RegisterForm from '../register_form/RegisterForm';

const LOGIN = "/login";

export default function UserForm() {
    const location = useLocation();

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    return (
        <section className='vh-100 auth-bg'>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" >
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-1 mt-md-4 pb-1">
                                    {
                                        location.pathname === LOGIN
                                        ?
                                        <img src={logo} className='logo mb-5' />
                                        :
                                        <h1>Cadastro de usuário</h1>
                                    }

                                    <p ref={errRef} className="errmsg text-white-50 mb-3">{errMsg}</p>

                                    {
                                        location.pathname === LOGIN
                                        ?
                                        <LoginForm errRef={errRef} setErrMsg={setErrMsg} />
                                        :
                                        <RegisterForm errRef={errRef} setErrMsg={setErrMsg} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}