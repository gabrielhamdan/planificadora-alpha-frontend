import { useRef, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/auth/login';

export default function LoginForm(props) {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = props.errRef;

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const setErrMsg = props.setErrMsg;

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [usuario, senha]);

    const handlerSubmit = async e => {
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
            <Form onSubmit={handlerSubmit}>
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
                    <Link to="/register" className='text-white-50 fw-bold' >Criar uma conta</Link>
                </p>
            </div>
        </>
    )
}