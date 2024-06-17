import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import '../../app/globals.css';
import './logout.css'

export default function Logout() {
    const [userName, setUserName] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const nome = localStorage.getItem('nome');
        if (nome) {
            setUserName(nome);
        }
    }, []);

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('nome');
        router.push('/login');
    }

    if (!userName) {
        // Se o nome de usuário não estiver disponível, renderize uma mensagem ou oculte o componente de logout
        return null;
    }

    return (
        <div className="logout">
            <button onClick={logout} title="Sair">X</button>
            <p>{userName}</p>
        </div>
    );
}