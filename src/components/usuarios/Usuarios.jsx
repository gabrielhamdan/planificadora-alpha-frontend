import { useState, useEffect } from "react";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState();

    return (
        <article>
            <h2>Usuários</h2>
            {usuarios?.length
                ? (
                    <ul>
                        {
                            usuarios.map((usuario, key) => {
                                return <li key={key}>{usuario?.usuario}</li>
                            })
                        }
                    </ul>
                ) : <p>Nenhum usuário encontrado</p>
            }
        </article>
    )
}