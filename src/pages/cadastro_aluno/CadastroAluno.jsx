import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function CadastroAluno() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const { id } = useParams();
    const ehNovoAluno = id && id === "0";
    const navigate = useNavigate();

    const [aluno, setAluno] = useState(
        {
            nome: '',
            cpf: '',
            dataNascimento: '',
            email: '',
            telefone: '',
            endereco: '',
            nivel: 'Pós-Graduado',
            situacao: 'ALUNO',
            objetivoAprendizado: '',
            professorId: auth.id
        }
    );

    useEffect(() => {
        if (ehNovoAluno) return;

        let isMounted = true;
        const controller = new AbortController();

        const getAluno = async () => {
            try {
                const response = await axiosPrivate.get(`/alunos/${id}`, {
                    signal: controller.signal
                });

                isMounted && setAluno(response.data);
            } catch (err) {
                if (err.name !== 'CanceledError')
                    console.error(err);
            }

        }

        getAluno();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAluno((prevAluno) => ({
            ...prevAluno,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!ehNovoAluno)
            setAluno((prevAluno) => ({
                ...prevAluno,
                id: { id }
            }));

        const response = await axiosPrivate.post('/alunos',
            JSON.stringify(aluno),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        if (response.status == 200)
            navigate(`/alunos/${response.data.id}`);

        localStorage.removeItem('previousPage');
    };

    const handleBack = () => {
        const previousPage = localStorage.getItem('previousPage');
        if (previousPage) {
            navigate(previousPage);
        } else {
            navigate("/home");
        }
    };

    const handleDelete = async () => {
        const response = await axiosPrivate.delete(`/alunos/${id}`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        if (response.status == 200)
            navigate("/home");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro de Aluno</h2>

            <div>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" value={aluno.nome} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="cpf">CPF:</label>
                <input type="text" id="cpf" name="cpf" value={aluno.cpf} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                <input type="date" id="dataNascimento" name="dataNascimento" value={aluno.dataNascimento} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={aluno.email} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="telefone">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" value={aluno.telefone} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="endereco">Endereço:</label>
                <input type="text" id="endereco" name="endereco" value={aluno.endereco} onChange={handleChange} required />
            </div>

            <div>
                <label htmlFor="nivel">Nível:</label>
                <select id="nivel" name="nivel" value={aluno.nivel} onChange={handleChange} required>
                    <option value="Pós-Graduado">Pós-Graduado</option>
                    <option value="Graduado">Graduado</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Fundamental">Fundamental</option>
                    <option value="Médio">Médio</option>
                </select>
            </div>

            <div>
                <label htmlFor="situacao">Situação:</label>
                <select id="situacao" name="situacao" value={aluno.situacao} onChange={handleChange} required>
                    <option value="ALUNO">Aluno</option>
                    <option value="EX_ALUNO">Ex-aluno</option>
                    <option value="PROSPECCAO">Prospecção</option>
                </select>
            </div>

            <div>
                <label htmlFor="objetivoAprendizado">Objetivo de Aprendizado:</label>
                <textarea id="objetivoAprendizado" name="objetivoAprendizado" rows="4" value={aluno.objetivoAprendizado} onChange={handleChange} ></textarea>
            </div>

            <button type="submit">Salvar</button>
            <button type="button" onClick={handleBack}>Voltar</button>
            {
                !ehNovoAluno &&
                <button type="button" onClick={handleDelete}>Excluir</button>
            }
        </form>
    )
}