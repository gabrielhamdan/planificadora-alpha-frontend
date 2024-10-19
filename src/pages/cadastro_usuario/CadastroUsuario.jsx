import { useRef, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import useAuth from '../../hooks/useAuth.js';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from 'react-router-dom';

export default function CadastroUsuario() {
    const userRef = useRef();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [professor, setProfessor] = useState({
        id: '',
        usuario: '',
        nome: '',
        cpf: '',
        area: ''
    });

    const [senha, setSenha] = useState({
        idUsuario: auth.id,
        novaSenha: '',
        confirmacaoSenha: ''
    })

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProfessor = async () => {
            try {
                const response = await axiosPrivate.get(`/usuario/${auth.id}`, {
                    signal: controller.signal
                });

                isMounted && setProfessor(response.data);
            } catch (err) {
                if (err.name !== 'CanceledError')
                    console.error(err);
            }

        }

        getProfessor();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, []);

    const handleSubmitAlteraUsuario = async (e) => {
        e.preventDefault();
        
        const response = await axiosPrivate.put('/usuario',
            JSON.stringify(professor),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        if (response.status == 200)
            console.log("usuário alterado"); // exibe mensagem de alteração
    }

    const handleSubmitAlteraSenha = async (e) => {
        e.preventDefault();
        
        const response = await axiosPrivate.put('/usuario/pwd',
            JSON.stringify(senha),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        if (response.status == 200)
            navigate("/login");
    }

    const handleChangeUsuario = (e) => {
        const { name, value } = e.target;
        setProfessor(prevProfessor => ({
            ...prevProfessor,
            [name]: value
        }));
    };

    const handleChangeSenha = (e) => {
        const { name, value } = e.target;
        setSenha(prevSenha => ({
            ...prevSenha,
            [name]: value
        }));
    };

    const handleDelete = async () => {
        if (!confirm("Tem certeza de que deseja excluir seu usuário? Isso não poderá ser desfeito!")) return;

        const response = await axiosPrivate.delete(`/usuario/${auth.id}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        if (response.status == 200)
            navigate("/login");
    };

    return (
        <>
            <section className='auth-bg'>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="">
                            <div className="card bg-dark text-white" style={{ width: '80%', margin: '0 auto' }}>
                                <div className="card-body p-5 text-center">
                                    <h2 className="mb-4">Olá, {professor.usuario}</h2>

                                    <Form onSubmit={handleSubmitAlteraUsuario} className="mb-4">
                                        <div className="d-flex justify-content-between mb-3">
                                            <Form.Group className="flex-fill mx-1">
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control
                                                    className='form-control form-control-lg bg-dark text-white border-light custom-placeholder'
                                                    type="text"
                                                    ref={userRef}
                                                    id='nome'
                                                    name='nome'
                                                    autoComplete='off'
                                                    onChange={handleChangeUsuario}
                                                    value={professor.nome}
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group className="flex-fill mx-1">
                                                <Form.Label>CPF</Form.Label>
                                                <Form.Control
                                                    className='form-control form-control-lg bg-dark text-white border-light custom-placeholder'
                                                    type="text"
                                                    id='cpf'
                                                    name='cpf'
                                                    autoComplete='off'
                                                    onChange={handleChangeUsuario}
                                                    value={professor.cpf}
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group className="flex-fill mx-1">
                                                <Form.Label>Área</Form.Label>
                                                <Form.Control
                                                    className='form-control form-control-lg bg-dark text-white border-light custom-placeholder'
                                                    type="text"
                                                    id='area'
                                                    name='area'
                                                    autoComplete='off'
                                                    onChange={handleChangeUsuario}
                                                    value={professor.area}
                                                    required
                                                />
                                            </Form.Group>
                                        </div>
                                        <button className='btn btn-outline-light btn-lg px-5'>Alterar usuário</button>
                                    </Form>

                                    <h4>Alterar Senha</h4>
                                    <Form onSubmit={handleSubmitAlteraSenha}>
                                        <div className="d-flex justify-content-between mb-3">
                                            <Form.Group className="flex-fill mx-1">
                                                <Form.Label>Nova senha</Form.Label>
                                                <Form.Control
                                                    className='form-control form-control-lg bg-dark text-white border-light custom-placeholder'
                                                    type="password"
                                                    id='novaSenha'
                                                    name='novaSenha'
                                                    autoComplete='off'
                                                    onChange={handleChangeSenha}
                                                    required
                                                    />
                                            </Form.Group>

                                            <Form.Group className="flex-fill mx-1">
                                                <Form.Label>Confirmar nova senha</Form.Label>
                                                <Form.Control
                                                    className='form-control form-control-lg bg-dark text-white border-light custom-placeholder'
                                                    type="password"
                                                    id='confirmacaoSenha'
                                                    name='confirmacaoSenha'
                                                    autoComplete='off'
                                                    onChange={handleChangeSenha}
                                                    required
                                                />
                                            </Form.Group>
                                        </div>
                                        <button className='btn btn-outline-light btn-lg px-5'>Alterar senha</button>
                                    </Form>

                                    <button 
                                        className='btn btn-danger btn-lg px-5 mt-4' 
                                        onClick={handleDelete}
                                    >
                                        Excluir usuário
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
