import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useLocation } from "react-router-dom";

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

    const location = useLocation();

    const handleClick = () => {
        // Armazena a URL da página atual antes de navegar
        localStorage.setItem('previousPage', location.pathname);
    };

    return (
        <article>
            <h2>Alunos</h2>
            <Link to={"/alunos/0"} onClick={handleClick}>Novo aluno</Link>
            {alunos?.length
                ? (
                    <ul>
                        {/* HACK: testando novo aluno, passando id 0 */}
                        {
                            alunos.map((aluno, key) => {
                                return <li key={key}><Link to={`/alunos/${aluno?.id}`}>{aluno?.nome}</Link></li>
                            })
                        }
                    </ul>
                ) : <p>Nenhum aluno encontrado</p>
            }
        </article>
    )
}