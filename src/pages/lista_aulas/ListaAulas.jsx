import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import { axiosPrivate } from "../../api/axios";
import { localDateToData } from "../../util/util.js"

export default function ListaAulas() {
    const [aulas, setAulas] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAulas = async () => {
            try {
                const response = await axiosPrivate.get('/aulas',
                    {
                        signal: controller.signal
                    }
                );

                isMounted && setAulas(response.data);
            } catch (err) {
                if (err.name !== 'CanceledError')
                    console.error(err);
            }
        }

        getAulas();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const getStatusAula = (stt) => {
        stt = stt.replace("PRESENCA", "PRESENÇA");
        return stt.toLowerCase();
    }

    return (
        <section>
            <div className="container py-5">
                {aulas.length ? (
                    <Table striped bordered hover responsive variant="dark">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Início</th>
                                <th>Fim</th>
                                <th>Aluno</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aulas.map((aula) => (
                                <tr key={aula.idAula}>
                                    <td>{localDateToData(aula.data)}</td>
                                    <td>{aula.horaInicial}</td>
                                    <td>{aula.horaFinal}</td>
                                    <td>{aula.nomeAluno}</td>
                                    <td>{getStatusAula(aula.statusAula)}</td>
                                    <td className="text-center">
                                        <Link to={`/aulas/${aula.idAula}`} title="Editar aula" className="me-3">
                                            <FontAwesomeIcon icon={faUserPen} className="btn-editar" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p className="text-dark">Nenhuma aula encontrada</p>
                )}
            </div>
        </section>
    )
}