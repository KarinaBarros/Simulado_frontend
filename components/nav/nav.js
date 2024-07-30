import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import '@/app/globals.css';
import './nav.css';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpellCheck, faFileAlt, faChalkboardTeacher, faBookOpen, faPencilAlt, faHome, faTimes, faBars, faCog, faChevronDown, faChevronUp, faLanguage } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
    const [userName, setUserName] = useState(null);
    const [navVisible, setNavVisible] = useState(false);
    const [expandVisible, setExpandVisible] = useState(false);
    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        const nome = localStorage.getItem('nome');
        if (nome) {
            const primeiroNome = nome.split(' ')[0];
            setUserName(primeiroNome);
        }
    }, []);

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('nome');
        localStorage.removeItem('nivel');
        localStorage.removeItem('curso');
        localStorage.removeItem('temas');
        router.push('/login');
    }

    if (!userName) {
        return null;
    }

    function toggleNav() {
        setNavVisible(!navVisible);
    }

    function toggleExpand() {
        setExpandVisible(!expandVisible);
    }

    return (
        <>
            <button className={`hamburguer ${navVisible ? 'active' : ''}`} onClick={toggleNav}><FontAwesomeIcon className="icon-hamburguer" icon={faBars} /></button>

            <div id="nav" style={{ display: navVisible ? 'block' : 'none' }}>
                <div className="background"></div>
                <div className="nav">
                    <div className="container-logo">
                        <img src="/logo2.png" alt="Logotipo" className="logo-nav"></img>
                        <h1>EstudAI</h1>
                    </div>
                    <Link href='/' className={`link-nav ${pathname === '/' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faHome} />Home</Link>
                    <Link href='/orientacaodeestudo' className={`link-nav ${pathname === '/orientacaodeestudo' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faChalkboardTeacher} />Orientação de estudo</Link>
                    <Link href='/simulado' className={`link-nav ${pathname === '/simulado' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faFileAlt} />&nbsp;Simulado</Link>
                    <Link href='/correcaoortografica' className={`link-nav ${pathname === '/correcaoortografica' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faSpellCheck} />Correção Ortográfica</Link>
                    <Link href='/resumo' className={`link-nav ${pathname === '/resumo' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faBookOpen} />Resumo</Link>
                    <Link href='/redacao' className={`link-nav ${pathname === '/redacao' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faPencilAlt} />Redação</Link>
                    <Link href='/traducao' className={`link-nav ${pathname === '/traducao' ? 'active' : ''}`}><FontAwesomeIcon className="icon-nav" icon={faLanguage} />Tradução</Link>
                    <div>
                        <button className={`button-nav ${pathname === '/editar' ? 'active' : ''}`} onClick={toggleExpand}>
                            <FontAwesomeIcon className="icon-nav" icon={expandVisible ? faChevronUp : faChevronDown}></FontAwesomeIcon>{userName}
                        </button>
                        <div className="expand" style={{ display: expandVisible ? 'flex' : 'none' }}>
                            <Link href='editar' className="link-expand"><FontAwesomeIcon className="icon-nav" icon={faCog}></FontAwesomeIcon> Editar</Link>
                            <button className='button-expand' onClick={logout} title="Sair">&nbsp;<FontAwesomeIcon className="icon-nav" icon={faTimes} /> Sair</button>
                        </div>
                    </div>
                    <br /><br /><br />
                    <Link className="link-politica" href='/erro'>Reporte um erro</Link>
                    <Link className="link-politica" href='/politica'>Política de uso</Link>
                </div>
            </div>
        </>
    );
}

