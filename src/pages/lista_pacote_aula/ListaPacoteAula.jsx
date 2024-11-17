import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import PacotesAula from "../../components/pacotes_aula/PacotesAula";

export default function ListaPacoteAula() {
    return (
        <section>
            <div className="container py-5">
                <Link to={"/pacotes/0"} >
                    <Button className='mb-3 btn-dark'>Novo pacote de aula</Button>
                </Link>
                <PacotesAula />
                <Link to={"/pacotes/0"} >
                    <Button className='mb-3 btn-dark'>Novo pacote de aula</Button>
                </Link>
            </div>
        </section>
    )
}