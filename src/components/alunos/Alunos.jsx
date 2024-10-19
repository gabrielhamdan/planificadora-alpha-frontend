import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import "./Alunos.css";

export default function Alunos() {
    const [alunos, setAlunos] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAlunos = async () => {
            try {
                const response = await axiosPrivate.get('/alunos', {
                    signal: controller.signal
                });

                isMounted && setAlunos(response.data);
            } catch (err) {
                if (err.name !== 'CanceledError')
                    console.error(err);
            }
        }

        getAlunos();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const handleDelete = async (id) => {
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
        <>
            {alunos.length ? (
                <Table striped bordered hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Situação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map((aluno) => (
                            <tr key={aluno.id}>
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td>{aluno.telefone}</td>
                                <td>{aluno.situacao}</td>
                                <td className="text-center">
                                    <Link to={`/alunos/${aluno.id}`} title="Editar aluno" className="me-3">
                                        <FontAwesomeIcon icon={faUserPen} className="btn-editar" />
                                    </Link>
                                    <FontAwesomeIcon icon={faTrash} className="btn-excluir" title="Excluir aluno" onClick={() => handleDelete(aluno.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="text-dark">Nenhum aluno encontrado</p>
            )}
        </>
    );
}
