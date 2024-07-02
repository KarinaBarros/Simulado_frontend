import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import '../../app/globals.css';
import './nav.css';
import Link from "next/link";

export default function Nav() {
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
        <div className="nav">
            <p>Bem vindo {userName}</p>
            <Link href='/' className="link-nav">Home</Link>
            <Link href='/simulado' className="link-nav">Simulado</Link>
            <Link href='/correcaoortografica' className="link-nav">Correção Ortográfica</Link>
            <Link href='/resumo' className="link-nav">Resumo</Link>
            <Link href='/redacao' className="link-nav">Redação</Link>
            <Link href='/orientacaodeestudo' className="link-nav">Orientação de estudo</Link>
            <button onClick={logout} title="Sair">X Sair</button>
        </div>
    );
}