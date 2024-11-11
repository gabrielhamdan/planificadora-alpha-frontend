import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { inputParaMoeda, moedaParaReal } from '../../util/util.js'

export default function CadastroPacoteAula() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const ehNovoPacote = id && id === "0";
    const navigate = useNavigate();

    const [localAula, setLocalAula] = useState({
        descricaoLocal: '',
        tipoLocal: 'ONLINE'
    });

    const [pacote, setPacote] = useState({
        aluno: {},
        aulas: [],
        localAula: localAula,
        valorHoraAula: 0
    });

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(pacote)
        // TODO: Lógica de envio do formulário
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'valorHoraAula') {
            e.target.value = inputParaMoeda(value)
            const rawValue = moedaParaReal(e.target.value)
            setPacote((prev) => ({
                ...prev,
                valorHoraAula: rawValue,  // Salva como número sem formatação
            }));
        } else if (name === 'localAula.descricaoLocal') {
            setLocalAula((prev) => ({
                ...prev,
                descricaoLocal: value,
            }));
        } else if (name === 'localAula.tipoLocal') {
            setLocalAula((prev) => ({
                ...prev,
                tipoLocal: value,
            }));
        }
    };

    const handleDelete = () => {
        console.log(pacote)
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
                                                    value={pacote.aluno.nome}
                                                    onChange={handleChange} // TODO: handleChangeAluno para pegar o objeto
                                                    required
                                                    className='bg-dark text-white border-light'
                                                />
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
                                                    value=""
                                                    onChange={handleChange}
                                                    required
                                                    className='bg-dark text-white border-light'
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Descrição local:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="descricaoLocal"
                                                    value={localAula.descricaoLocal}
                                                    onChange={handleChange} // handleChangeLocal
                                                    className='bg-dark text-white border-light'
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Tipo local:</Form.Label>
                                                <Form.Select
                                                    name="tipoLocal"
                                                    value={localAula.tipoLocal}
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
                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    name=""
                                                    // value={aluno.objetivoAprendizado}
                                                    onChange={handleChange}
                                                    style={{ resize: 'none' }} // Impede o redimensionamento
                                                    className='bg-dark text-white border-light'
                                                />
                                            </Form.Group>
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
