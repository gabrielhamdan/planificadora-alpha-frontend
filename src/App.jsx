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
              <Route path='usuarios' element={<CadastroUsuario />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
