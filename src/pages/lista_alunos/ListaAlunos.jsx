import { Link, useLocation } from "react-router-dom";
import Alunos from "../../components/alunos/Alunos";
import Button from 'react-bootstrap/Button';

export default function ListaAlunos() {
    const location = useLocation();

    const handleClick = () => {
        localStorage.setItem('previousPage', location.pathname);
    };

    return (
        <section>
            <div className="container py-5">
                <Link to={"/alunos/0"} onClick={handleClick}>
                    <Button className='mb-3 btn-dark'>Novo aluno</Button>
                </Link>
                <Alunos />
                <Link to={"/alunos/0"} onClick={handleClick}>
                    <Button className='mb-3 btn-dark'>Novo aluno</Button>
                </Link>
            </div>
        </section>
    )
}