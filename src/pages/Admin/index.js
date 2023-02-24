import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import './admin.css'

export default function Admin() {

    const [tarefaInput, setTarefaInput] = useState('')
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])
    const [edit, setEdit] = useState([])

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail)
                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = []
                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data.userUid
                        })
                    })
                    setTarefas(lista)
                })
            }
        }

        loadTarefas()
    }, [])

    async function handleRegister(e) {
        e.preventDefault();

        if (tarefaInput === '') {
            toast.error("Digite uma tarefa.", {
                theme: "dark"
            })
            return
        }

        if (edit?.id) {
            handleUpdateTarefa()
            return
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
            .then(() => {
                toast.success("Tarefa registrada!", {
                    theme: "dark"
                })
                setTarefaInput('')
            })
            .catch((error) => {
                toast.error("Erro ao registrar!" + error, {
                    theme: "dark"
                })
            })
    }

    async function handleLogout() {
        await signOut(auth)
    }

    async function deleteTarefa(id) {
        const docRef = doc(db, "tarefas", id)

        await deleteDoc(docRef)
            .then(() => {
                toast.success("Tarefa deletada!", {
                    theme: "dark"
                })
            })
            .catch((error) => {
                toast.error("Erro ao deletar!" + error, {
                    theme: "dark"
                })
            })
    }

    function editTarefa(item) {
        setTarefaInput(item.tarefa)
        setEdit(item)
    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
            .then(() => {
                toast.success("Tarefa atualizada!", {
                    theme: "dark"
                })
                setTarefaInput('')
                setEdit({})
            })
            .catch((error) => {
                toast.error("Erro ao atualizar!" + error, {
                    theme: "dark"
                })
                setTarefaInput('')
                setEdit({})
            })
    }

    return (
        <div className="admin-container">
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea value={tarefaInput} onChange={(e) => setTarefaInput(e.target.value)} placeholder="Digite sua tarefa..."></textarea>

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' style={{ backgroundColor: '#6add39' }} type='submit'>Atualizar tarefa</button>
                ) : (
                    <button className='btn-register' type='submit'>Registrar tarefa</button>
                )}
            </form>

            {tarefas.map((item) => (
                <article key={item.id} className='list'>
                    <p>{item.tarefa}</p>

                    <div>
                        <button onClick={() => editTarefa(item)}>Editar</button>
                        <button onClick={() => deleteTarefa(item.id)} className='btn-delete'>Excluir</button>
                    </div>
                </article>
            ))}

            <button onClick={handleLogout} className='btn-logout'>Sair</button>
        </div>
    )
}
