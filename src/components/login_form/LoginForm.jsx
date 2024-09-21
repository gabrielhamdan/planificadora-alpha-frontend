import { useRef, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import './LoginForm.css';
import logo from '../../assets/images/logo.png';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/auth/login';

export default function LoginForm() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [usuario, senha]);

    const submitLogin = async e => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ usuario, senha }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const token = response?.data?.token;

            setAuth({ usuario, senha, token });
            setUsuario('');
            setSenha('');
            navigate(from, { replace: true });
        } catch (err) {
            setErrMsg(`Erro de autenticação (${err?.response?.status})`);
            errRef.current.focus();
        }
    }

    return (
        <>
            <section className='vh-100 auth-bg'>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" >
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-1 mt-md-4 pb-5">

                                        <img src={logo} className='logo mb-5' />

                                        <p ref={errRef} className="errmsg text-white-50 mb-3">{errMsg}</p>

                                        <Form onSubmit={submitLogin}>
                                            <Form.Group className="form-outline form-white mb-4" >
                                                <Form.Control className='form-control form-control-lg bg-dark text-white border-light custom-placeholder'
                                                    type="text"
                                                    id='usuario'
                                                    ref={userRef}
                                                    autoComplete='off'
                                                    onChange={e => setUsuario(e.target.value)}
                                                    value={usuario}
                                                    required
                                                    placeholder='usuário'
                                                />
                                            </Form.Group>

                                            <Form.Group className="form-outline form-white mb-4" >
                                                <Form.Control className='form-control form-control-lg bg-dark text-white border-light custom-placeholder'
                                                    type="password"
                                                    id='senha'
                                                    onChange={e => setSenha(e.target.value)}
                                                    value={senha}
                                                    required
                                                    placeholder='senha'
                                                />
                                            </Form.Group>
                                            <button className='btn btn-outline-light btn-lg px-5 mb-5'>Entrar</button>
                                        </Form>

                                        <div>
                                            <p className='mb-0'>
                                                <a href='#' className='text-white-50 fw-bold'>Criar uma conta</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}