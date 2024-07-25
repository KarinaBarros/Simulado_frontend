import '@/app/globals.css';
import './main.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faSpellCheck, faFileAlt, faChalkboardTeacher, faBookOpen, faPencilAlt, faHome, faTimes, faBars, faCog, faChevronDown, faChevronUp, faLanguage } from '@fortawesome/free-solid-svg-icons';

export default function Main(){
    const [login, setLogin] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            setLogin(true);
        }
    },[])
    return(
        <div className="main">
            <div className="text-main">
                <p className={(!login) ? 'text-logout' : 'text-login'}>Utilize nossas ferramentas agora mesmo, com prompts simples e intuitivos, para criar conteúdos para seus estudos de forma fácil e rápida.</p>
                {(!login) &&
                <div className='login-main'>
                    <Link href='/login'>Acessar sua conta</Link>
                    <p>Ainda não tem uma conta?</p>
                    <Link href='/register'>Cadastre-se gratuitamente!</Link>
                </div>
                }
            </div>
            <div className='container-cards'>
                <div className='cards'>
                    <p>Receba sugestões personalizadas para otimizar seu tempo de estudo. Sugerimos os melhores materiais e estratégias para otimizar seu aprendizado. Com links externos para sites sobre o conteúdo gerado.</p>
                    <FontAwesomeIcon className='icon' icon={faChalkboardTeacher}/>
                    <Link className='link' href='/orientacaodeestudo'>Orientação de estudo <FontAwesomeIcon className='icon-botao' icon={faArrowUpRightFromSquare}/></Link>
                </div>
                <div className='cards'>
                    <p>Pratique e se prepare para suas provas com nossos simulados personalizados e interativos. Corrigidos através de um gabarito com nota final.</p>
                    <FontAwesomeIcon className='icon' icon={faFileAlt}/>
                    <Link className='link' href='/simulado'>Simulado <FontAwesomeIcon className='icon-botao' icon={faArrowUpRightFromSquare}/></Link>
                </div>
                <div className='cards'>
                    <p>Aprimore a qualidade dos seus textos com nossa ferramenta de correção ortográfica. Identificamos e corrigimos erros para que você escreva com confiança.</p>
                    <FontAwesomeIcon className='icon' icon={faSpellCheck}/>
                    <Link className='link' href='/correcaoortografica'>Correção ortográfica <FontAwesomeIcon className='icon-botao' icon={faArrowUpRightFromSquare}/></Link>
                </div>
                <div className='cards'>
                    <p>Transforme textos extensos em resumos claros e concisos. Economize tempo e compreenda rapidamente as principais informações.</p>
                    <FontAwesomeIcon className='icon' icon={faBookOpen}/>
                    <Link className='link' href='/resumo'>Resumo <FontAwesomeIcon className='icon-botao' icon={faArrowUpRightFromSquare}/></Link>
                </div>
                <div className='cards'>
                    <p>Melhore suas habilidades de escrita com feedback detalhado. Dicas de como melhorar sua redação e obter as melhores notas.</p>
                    <FontAwesomeIcon className='icon' icon={faPencilAlt}/>
                    <Link className='link' href='/redacao'>Redação <FontAwesomeIcon className='icon-botao' icon={faArrowUpRightFromSquare}/></Link>
                </div>
                <div className='cards'>
                    <p>Traduza textos em qualquer linguagem para o português, com precisão e mantendo o contexto original.</p>
                    <FontAwesomeIcon className='icon' icon={faLanguage}/>
                    <Link className='link' href='/traducao'>Tradução <FontAwesomeIcon className='icon-botao' icon={faArrowUpRightFromSquare}/></Link>
                </div>
            </div>
        </div>
    )
}