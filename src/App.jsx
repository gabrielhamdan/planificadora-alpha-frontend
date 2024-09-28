import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import RequireAuth from './components/require_auth/RequireAuth';
import Home from './pages/home/Home';
import CadastroAluno from './pages/home/CadastroAluno';
import { Navigate } from 'react-router-dom';
import UserForm from './components/user_form/UserForm';

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
            <Route path='aluno/:id' element={<CadastroAluno />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
