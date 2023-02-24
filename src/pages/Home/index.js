import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import './home.css'

export default function Home() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()

        if (email !== '' && password !== '') {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/admin', { replace: true })
                })
                .cath(() => {
                    toast.error("Erro ao fazer o login!", {
                        theme: "dark"
                    })
                })
        } else {
            toast.error("Preencha todos os campos!", {
                theme: "dark"
            })
        }
    }

    return (
        <div className='home-container'>
            <h1>Lista de tarefas</h1>

            <span>Gerencie sua agenda de forma fácil.</span>

            <form className='form' onSubmit={handleLogin}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Digite seu e-mail...' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='******' />

                <button type='submit'>Acessar</button>
            </form>

            <Link className='button-link' to="/register">Não possui uma conta? <u>Cadastre-se</u></Link>
        </div>
    );
}
