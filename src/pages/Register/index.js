import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()

        if (email !== '' && password !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/admin', { replace: true })
                })
                .cath(() => {
                    toast.error("Erro ao fazer o cadastro!", {
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
            <h1>Cadastre-se</h1>

            <span>Vamos criar sua conta!</span>

            <form className='form' onSubmit={handleRegister}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Digite seu e-mail...' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='******' />

                <button type='submit'>Cadastrar</button>
            </form>

            <Link className='button-link' to="/">Já possui uma conta? <u>Faça login!</u></Link>
        </div>
    );
}
