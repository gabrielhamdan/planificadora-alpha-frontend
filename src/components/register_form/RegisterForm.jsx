import { useRef, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const REGISTER_URL = '/usuario';

export default function RegisterForm(props) {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = props.errRef;

    const [professor, setProfessor] = useState(
        {
            usuario: '',
            senha: '',
            nome: '',
            cpf: '',
            area: '',
            ativo: true
        }
    );

    const setErrMsg = props.setErrMsg;

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [professor]);

    const handlerSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(professor),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );

            if (response?.status === 200)
                navigate("/login");
        } catch (err) {
            setErrMsg(`ERRO (${err?.response?.status})`); // TODO: tratar erro (usuário existente, outros)
            errRef.current.focus();
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfessor((prevProfessor) => ({
            ...prevProfessor,
            [name]: value
        }));
    };

    return (
        <>
            <Form onSubmit={handlerSubmit}>
                <Form.Group className="form-outline form-white mb-4 form-group-container" >
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control className='form-control form-control-lg bg-dark text-white border-light custom-placeholder'
                        type="text"
                        id='usuario'
                        name='usuario'
                        ref={userRef}
                        autoComplete='off'
                        onChange={handleChange}
                        value={professor.usuario}
                        required
                    />
                </Form.Group>

                <Form.Group className="form-outline form-white mb-4 form-group-container" >
                    <Form.Label>Senha</Form.Label>
                    <Form.Control className='form-control form-control-lg bg-dark text-white border-light custom-placeholder'
                        type="password"
                        id='senha'
                        name='senha'
                        autoComplete='off'
                        onChange={handleChange}
                        value={professor.senha}
                        required
                    />
                </Form.Group>
                
                <Form.Group className="form-outline form-white mb-4 form-group-container" >
                    <Form.Label>Nome</Form.Label>
                    <Form.Control className='form-control form-control-lg bg-dark text-white border-light custom-placeholder'
                        type="text"
                        id='nome'
                        name='nome'
                        autoComplete='off'
                        onChange={handleChange}
                        value={professor.nome}
                        required
                    />
                </Form.Group>

                <Form.Group className="form-outline form-white mb-4 form-group-container" >
                    <Form.Label>CPF</Form.Label>
                    <Form.Control className='form-control form-control-lg bg-dark text-white border-light custom-placeholder'
                        type="text"
                        id='cpf'
                        name='cpf'
                        autoComplete='off'
                        onChange={handleChange}
                        value={professor.cpf}
                        required
                    />
                </Form.Group>

                <Form.Group className="form-outline form-white mb-4 form-group-container" >
                    <Form.Label>Área</Form.Label>
                    <Form.Control className='form-control form-control-lg bg-dark text-white border-light custom-placeholder'
                        type="text"
                        id='area'
                        name='area'
                        autoComplete='off'
                        onChange={handleChange}
                        value={professor.area}
                        required
                    />
                </Form.Group>
                <button className='btn btn-outline-light btn-lg px-5 mb-1'>Criar usuário</button>
            </Form>
        </>
    )
}