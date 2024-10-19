import { Link } from "react-router-dom"
import "./ItemMenu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ItemMenu(props) {
    return (
        <>
        <Link to={props.link} className="item-link">
            <div className="item-menu-container">
                <FontAwesomeIcon icon={props.icone} className="icone" />
                <p className="descricao-item">{props.label}</p>
            </div>
        </Link>
        </>
    )
}