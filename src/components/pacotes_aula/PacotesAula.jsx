import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { valorParaMoeda } from '../../util/util.js'

export default function PacotesAula() {
    const [pacotes, setPacotes] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getPacotes = async () => {
            try {
                const response = await axiosPrivate.get('/pacote-aulas', {
                    signal: controller.signal
                });

                isMounted && setPacotes(response.data);
            } catch (err) {
                if (err.name !== 'CanceledError')
                    console.error(err);
            }
        }

        getPacotes();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Tem certeza de que deseja remover este pacote?"))
            return;

        const response = await axiosPrivate.delete(`/pacote-aulas/${id}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        if (response.status === 200)
            setPacotes((prevPacotes) => prevPacotes.filter((pacote) => pacote.id !== id));
    };

    return (
        <>
            {pacotes.length ? (
                <Table striped bordered hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Aluno</th>
                            <th>Local</th>
                            <th>Valor hora/aula</th>
                            <th>Total aulas</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacotes.map((pacote) => (
                            <tr key={pacote.id}>
                                <td>{pacote.id}</td>
                                <td>{pacote.aluno.nome}</td>
                                <td>{pacote.localAula.descricaoLocal} ({pacote.localAula.tipoLocal})</td>
                                <td>{valorParaMoeda(pacote.valorHoraAula)}</td>
                                <td>{pacote.aulas.length}</td>
                                <td className="text-center">
                                    <Link to={`/pacotes/${pacote.id}`} title="Editar pacote" className="me-3">
                                        <FontAwesomeIcon icon={faUserPen} className="btn-editar" />
                                    </Link>
                                    <FontAwesomeIcon icon={faTrash} className="btn-excluir" title="Excluir pacote" onClick={() => handleDelete(pacote.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p className="text-dark">Nenhum pacote de aula encontrado</p>
            )}
        </>
    )
}