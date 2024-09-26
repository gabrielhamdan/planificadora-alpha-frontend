import './App.css'
import LoginForm from './components/login_form/LoginForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import RequireAuth from './components/require_auth/RequireAuth';
import Home from './pages/home/Home';
import CadastroAluno from './pages/home/CadastroAluno';

function App() {

  return (
    // TODO redirecionar / para home se estiver logado ou login caso não esteja

    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          {/* rotas sem autenticação */}
          <Route path='login' element={<LoginForm />} />

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
