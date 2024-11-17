import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Dropdown, Form, Button, Row, Col } from 'react-bootstrap'
import { inputParaMoeda, moedaParaReal } from '../../util/util.js'
import { useDebouncedCallback } from 'use-debounce';
import AulaPacote from "../../components/aula_pacote/AulaPacote.jsx";

export default function CadastroPacoteAula() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const ehNovoPacote = id && id === "0";
    const navigate = useNavigate();

    const [pacote, setPacote] = useState({
        aluno: {},
        aulas: [],
        localAula: { descricaoLocal: '', tipoLocal: 'ONLINE' },
        valorHoraAula: 0,
        professorId: auth.id
    });

    const [valorHoraAula, setValorHoraAula] = useState("R$ 0,00")
    const [searchTerm, setSearchTerm] = useState('');
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(false);

    const buscarAlunos = async (term) => {
        if (term.trim() === "") {
            setAlunos([]);
            return;
        }

        try {
            setLoading(true);
            const response = await axiosPrivate.get(`/alunos/search`, {
                params: { nome: term }
            });

            setAlunos(response.data);
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (ehNovoPacote) return;

        let isMounted = true;
        const controller = new AbortController();

        const getPacote = async () => {
            try {
                const response = await axiosPrivate.get(`/pacote-aulas/${id}`, {
                    signal: controller.signal
                });

                if (isMounted) {
                    const pacoteData = response.data;
                    setPacote({ ...pacoteData, valorHoraAula: parseFloat(pacoteData.valorHoraAula.toFixed(2)) });
                    setValorHoraAula(inputParaMoeda(pacoteData.valorHoraAula.toFixed(2)));
                    setSearchTerm(pacoteData.aluno.nome);
                }
            } catch (err) {
                if (err.name !== 'CanceledError')
                    console.error(err);
            }
        }

        getPacote();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const debouncedBuscarAlunos = useDebouncedCallback((term) => {
        buscarAlunos(term);
    }, 500);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedBuscarAlunos(value);
    };

    const handleSelectAluno = (aluno) => {
        setSearchTerm(aluno.nome);
        setPacote((prev) => ({
            ...prev,
            aluno: aluno
        }));
        setAlunos([]);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        let reqMethod = axiosPrivate.post

        if (!ehNovoPacote) {
            setPacote((prev) => ({
                ...prev,
                id: { id }
            }));

            reqMethod = axiosPrivate.put
        }

        pacote.aulas = pacote.aulas.map(aula => {
            if (typeof aula.id === 'string' && aula.id.includes('temp-'))
                aula.id = 0;

            if (aula.data !== "" && aula.data !== null)
                return aula;

            return null;
        }).filter(aula => aula !== null);

        const response = await reqMethod('/pacote-aulas',
            JSON.stringify(pacote),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        if (response.status === 200)
            navigate("/pacotes");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'valorHoraAula') {
            const valueFloat = moedaParaReal(inputParaMoeda(value));
            setPacote((prev) => ({
                ...prev,
                valorHoraAula: valueFloat,
            }));
            setValorHoraAula(inputParaMoeda(value));
        } else if (name === 'localAula.descricaoLocal') {
            setPacote((prev) => ({
                ...prev,
                localAula: {
                    ...prev.localAula,
                    descricaoLocal: value,
                }
            }));
        } else if (name === 'localAula.tipoLocal') {
            setPacote((prev) => ({
                ...prev,
                localAula: {
                    ...prev.localAula,
                    tipoLocal: value,
                }
            }));
        }
    };

    const handleAddAula = () => {
        const novaAula = {
            id: `temp-${Date.now()}`,
            statusAula: 'AGENDADA',
            data: '',
            horaInicial: '',
            horaFinal: '',
            anotacoes: '',
            pagamento: null,
            tarefasDeCasa: ''
        };

        setPacote((prev) => ({
            ...prev,
            aulas: [...prev.aulas, novaAula]
        }));
    };

    const handleAulaChange = (aulaId, fieldName, value) => {
        setPacote(prev => ({
            ...prev,
            aulas: prev.aulas.map(aula =>
                aula.id === aulaId ? { ...aula, [fieldName]: value } : aula
            )
        }));
    };

    const handleDelete = async () => {
        if (!confirm("Tem certeza de que deseja remover este pacote?"))
            return;

        const response = await axiosPrivate.delete(`/pacote-aulas/${pacote.id}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        if (response.status === 200)
            navigate("/pacotes");
    };

    const handleRemoveAula = (id) => {
        const pacoteAulas = pacote.aulas.filter(aula => aula.id != id);
        setPacote((prev) => ({
            ...prev,
            aulas: pacoteAulas
        }));
    }

    return (
        <section className='auth-bg'>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="">
                        <div className="card bg-dark text-white" style={{ width: '80%', margin: '0 auto' }}>
                            <div className="card-body p-5 text-center">
                                <h2 className="mb-4">Cadastro de Pacote de Aula</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Aluno:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="aluno"
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                    required
                                                    className='bg-dark text-white border-light'
                                                    autoComplete="off"
                                                />

                                                {alunos.length > 0 && (
                                                    <Dropdown.Menu show>
                                                        {alunos.map((aluno) => (
                                                            <Dropdown.Item
                                                                key={aluno.id}
                                                                onClick={() => handleSelectAluno(aluno)}
                                                            >
                                                                {aluno.nome}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Valor hora/aula:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="valorHoraAula"
                                                    value={valorHoraAula}
                                                    onChange={handleChange}
                                                    required
                                                    className='bg-dark text-white border-light'
                                                    autoComplete="off"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Descrição local:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="localAula.descricaoLocal"
                                                    value={pacote.localAula.descricaoLocal}
                                                    onChange={handleChange}
                                                    className='bg-dark text-white border-light'
                                                    autoComplete="off"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Tipo local:</Form.Label>
                                                <Form.Select
                                                    name="localAula.tipoLocal"
                                                    value={pacote.localAula.tipoLocal}
                                                    onChange={handleChange}
                                                    required
                                                    className='bg-dark text-white border-light'
                                                >
                                                    <option value="ONLINE">Online</option>
                                                    <option value="PRESENCIAL">Presencial</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Aulas:</Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {pacote.aulas.map(aula => (
                                        <AulaPacote
                                            key={aula.id}
                                            aula={aula}
                                            onChange={handleAulaChange}
                                            onRemove={handleRemoveAula}
                                        />
                                    ))}
                                    <Row>
                                        <Col className="text-start">
                                            <Button className='btn-light mb-3 mt-3' style={{ width: 'auto' }} onClick={handleAddAula}>Adicionar aula</Button>
                                        </Col>
                                    </Row>

                                    <Button type="submit" className='btn btn-outline-light btn-lg px-5 me-3'>Salvar</Button>

                                    {
                                        !ehNovoPacote &&
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
