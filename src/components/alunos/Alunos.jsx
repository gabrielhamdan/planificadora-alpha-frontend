import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

export default function Alunos() {
    const [alunos, setAlunos] = useState();
    const axiosPrivate = useAxiosPrivate();

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

    return (
        <article>
            <h2>Alunos</h2>
            {alunos?.length
                ? (
                    <ul>
                        {/* HACK: testando novo aluno, passando id 0 */}
                        <li><Link to={"/aluno/0"}>Novo aluno</Link></li>
                        {
                            alunos.map((aluno, key) => {
                                return <li key={key}><Link to={`/aluno/${aluno?.id}`}>{aluno?.nome}</Link></li>
                            })
                        }
                    </ul>
                ) : <p>Nenhum aluno encontrado</p>
            }
        </article>
    )
}