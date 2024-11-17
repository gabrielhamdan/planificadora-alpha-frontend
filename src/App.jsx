import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import RequireAuth from './components/require_auth/RequireAuth';
import Home from './pages/home/Home';
import CadastroAluno from './pages/cadastro_aluno/CadastroAluno';
import { Navigate } from 'react-router-dom';
import UserForm from './components/user_form/UserForm';
import ListaAlunos from './pages/lista_alunos/ListaAlunos';
import CadastroUsuario from './pages/cadastro_usuario/CadastroUsuario';
import ListaPacoteAula from './pages/lista_pacote_aula/ListaPacoteAula';
import CadastroPacoteAula from './pages/cadastro_pacote_aula/CadastroPacoteAula';
import ListaAulas from './pages/lista_aulas/ListaAulas';
import CadastroAula from './pages/cadastro_aula/CadastroAula';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/home" replace />} />

        <Route path='/' element={<Layout />} >
          {/* rotas sem autenticação */}
          <Route path='login' element={<UserForm />} />
          <Route path='register' element={<UserForm />} />

          {/* rotas que requerem autenticação */}
          <Route element={<RequireAuth />} >
              <Route path='home' element={<Home />} />
              <Route path='alunos' element={<ListaAlunos />} />
              <Route path='alunos/:id' element={<CadastroAluno />} />
              <Route path='aulas' element={<ListaAulas />} />
              <Route path='aulas/:id' element={<CadastroAula />} />
              <Route path='usuarios' element={<CadastroUsuario />} />
              <Route path='pacotes' element={<ListaPacoteAula />} />
              <Route path='pacotes/:id' element={<CadastroPacoteAula />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
