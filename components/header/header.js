import { useState, useEffect } from 'react';
import '@/app/globals.css';
import './header.css';
import SaveTemas from "@/components/savetemas";
import Link from 'next/link';

export default function Header() {
    const [Login, setLogin] = useState(false);
    const [Nome, setNome] = useState(null);

    useEffect(() => {
        const nome = localStorage.getItem('nome');

        if (nome) {
            const primeiroNome = nome.split(' ')[0];
            setLogin(true);
            setNome(primeiroNome);
        }
    }, []);

    return (


        <div>
            {Login && <SaveTemas />}
            <header className='header-home'>
                <div className='nav-home'>
                    {!Login && <Link className='link-nav-home' href='/register'>Cadastre-se</Link>}
                    {!Login ? <Link className='link-nav-home' href='/login'>Login</Link> : <p className='link-nav-home'>Bem vindo {Nome}</p>}

                </div>
                <div className='container-header'>
                    <div className='container-text-header'>

                        <h1>EstudAI</h1>
                        <h2>A ferramenta de estudo do futuro.</h2>
                        <p>Totalmente impulsionada por inteligência artificial para facilitar sua jornada de aprendizado e garantir que você alcance os melhores resultados. Junte-se a nós e transforme sua maneira de estudar!</p>
                    </div>
                    <div className='container-img-header'>
                        <img className='img-header' src='/IAprincipal.png' alt='robô de inteligência artificial segurando livros'></img>
                        <div className='elipse'></div>
                    </div>
                </div>
            </header>
        </div>

    )
}