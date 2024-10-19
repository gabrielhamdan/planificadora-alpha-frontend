import "./Home.css";
import ItemMenu from "../../components/item_menu/ItemMenu";
import { faUsers, faUser, faPenToSquare, faFolder } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    return (
        <>
            <div className="menu">
                <ItemMenu label="Alunos" icone={faUsers} link="/alunos" />
                <ItemMenu label="Aulas" icone={faPenToSquare} />
                <ItemMenu label="Pacotes de Aula" icone={faFolder} />
                <ItemMenu label="Usuário" icone={faUser} link={`/usuarios`} />
            </div>
        </>
    )
}