import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import '@/app/globals.css';
import './nav.css';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpellCheck, faFileAlt, faChalkboardTeacher, faBookOpen, faPencilAlt, faHome, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
    const [userName, setUserName] = useState(null);
    const [navVisible, setNavVisible] = useState(false);
    const router = useRouter();
    const { pathname } = router;   

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

    function toggleNav() {
       setNavVisible(!navVisible);
    }
    

    return (
        <>
        
        <button className={`hamburguer ${navVisible ? 'active' : ''}`} onClick={toggleNav}><FontAwesomeIcon className="icon-hamburguer" icon={faBars}/></button>
        
        <div id="nav" style={{ display: navVisible ? 'block' : 'none' }}>
            <div className="background"></div>
        <div className="nav">
            <img src="logo.png" alt="Logotipo" className="logo-nav"></img>
            <p>Bem vindo {userName}</p>
            <Link href='/' className={`link-nav ${pathname === '/' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faHome}/>Home</Link>
            <Link href='/simulado' className={`link-nav ${pathname === '/simulado' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faFileAlt}/>&nbsp;Simulado</Link>
            <Link href='/correcaoortografica' className={`link-nav ${pathname === '/correcaoortografica' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faSpellCheck}/>Correção Ortográfica</Link>
            <Link href='/resumo' className={`link-nav ${pathname === '/resumo' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faBookOpen}/>Resumo</Link>
            <Link href='/redacao' className={`link-nav ${pathname === '/redacao' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faPencilAlt}/>Redação</Link>
            <Link href='/orientacaodeestudo' className={`link-nav ${pathname === '/orientacaodeestudo' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faChalkboardTeacher}/>Orientação de estudo</Link>
            <button onClick={logout} title="Sair">&nbsp;<FontAwesomeIcon className="icon-nav" icon={faTimes}/> Sair</button>
            <Link className="link-politica" href='/politica'>Política de uso</Link>
        </div>
        </div>
        
        </>
    );
}
