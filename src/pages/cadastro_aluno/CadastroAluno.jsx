import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CadastroAluno() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const ehNovoAluno = id && id === "0";
    const navigate = useNavigate();

    const [aluno, setAluno] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        nivel: 'Pós-Graduado',
        situacao: 'ALUNO',
        objetivoAprendizado: '',
        professorId: auth.id
    });

    useEffect(() => {
        if (ehNovoAluno) return;

        let isMounted = true;
        const controller = new AbortController();

        const getAluno = async () => {
            try {
                const response = await axiosPrivate.get(`/alunos/${id}`, {
                    signal: controller.signal
                });

                isMounted && setAluno(response.data);
            } catch (err) {
                if (err.name !== 'CanceledError')
                    console.error(err);
            }
        }

        getAluno();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAluno((prevAluno) => ({
            ...prevAluno,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!ehNovoAluno) {
            setAluno((prevAluno) => ({
                ...prevAluno,
                id: { id }
            }));
        }

        const response = await axiosPrivate.post('/alunos',
            JSON.stringify(aluno),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        if (response.status === 200)
            navigate("/alunos");
    };

    const handleBack = () => {
        const previousPage = localStorage.getItem('previousPage');
        if (previousPage) {
            navigate(previousPage);
        } else {
            navigate("/home");
        }
    };

    const handleDelete = async () => {
        const response = await axiosPrivate.delete(`/alunos/${id}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        if (response.status === 200)
            navigate("/home");
    };

    return (
        <section className='auth-bg'>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="">
                        <div className="card bg-dark text-white" style={{ width: '80%', margin: '0 auto' }}>
                            <div className="card-body p-5 text-center">
                                <h2 className="mb-4">Cadastro de Aluno</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Nome:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="nome"
                                                    value={aluno.nome}
                                                    onChange={handleChange}
                                                    required
                                                    className='bg-dark text-white border-light'
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>CPF:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="cpf"
                                                    value={aluno.cpf}
                                                    onChange={handleChange}
                                                    required
                                                    className='bg-dark text-white border-light'
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Data de Nascimento:</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="dataNascimento"
                                                    value={aluno.dataNascimento}
                                                    onChange={handleChange}
                                                    required
                                                    className='bg-dark text-white border-light'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Email:</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={aluno.email}
                                                    onChange={handleChange}
                                                    required
                                                    className='bg-dark text-white border-light'
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Telefone:</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    name="telefone"
                                                    value={aluno.telefone}
                                                    onChange={handleChange}
                                                    required
                                                    className='bg-dark text-white border-light'
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Endereço:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="endereco"
                                                    value={aluno.endereco}
                                                    onChange={handleChange}
                                                    required
                                                    className='bg-dark text-white border-light'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Nível:</Form.Label>
                                                <Form.Select
                                                    name="nivel"
                                                    value={aluno.nivel}
                                                    onChange={handleChange}
                                                    required
                                                    className='bg-dark text-white border-light'
                                                >
                                                    <option value="Pós-Graduado">Pós-Graduado</option>
                                                    <option value="Graduado">Graduado</option>
                                                    <option value="Técnico">Técnico</option>
                                                    <option value="Fundamental">Fundamental</option>
                                                    <option value="Médio">Médio</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Situação:</Form.Label>
                                                <Form.Select
                                                    name="situacao"
                                                    value={aluno.situacao}
                                                    onChange={handleChange}
                                                    required
                                                    className='bg-dark text-white border-light'
                                                >
                                                    <option value="ALUNO">Aluno</option>
                                                    <option value="EX_ALUNO">Ex-aluno</option>
                                                    <option value="PROSPECCAO">Prospecção</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Objetivo de Aprendizado:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    name="objetivoAprendizado"
                                                    value={aluno.objetivoAprendizado}
                                                    onChange={handleChange}
                                                    style={{ resize: 'none' }} // Impede o redimensionamento
                                                    className='bg-dark text-white border-light'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Button type="submit" className='btn btn-outline-light btn-lg px-5 me-3'>Salvar</Button>

                                    <Button type="button" className='btn btn-secondary btn-lg px-5 me-3' onClick={handleBack}>Voltar</Button>
                                    {
                                        !ehNovoAluno &&
                                        <Button type="button" className='btn btn-danger btn-lg px-5 me-3' onClick={handleDelete}>Excluir</Button>
                                    }
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
