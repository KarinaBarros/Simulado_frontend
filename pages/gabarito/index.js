
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../../app/globals.css';
import './gabarito.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import useAuthentication from "@/components/useAuthentication";
import Logout from '@/components/logout/logout';
import getConfig from 'next/config';

export default function Gabarito() {
    useAuthentication();
    const [nota, setNota] = useState();
    const [gabarito, setGabarito] = useState([]);
    const [tema, setTema] = useState(null);

    useEffect(() => {
        const tema = localStorage.getItem('tema');
        setTema(tema ? tema : '');
    }, []);

    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();

    useEffect(() => {
        const handlePopState = () => {
            router.push('/');
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    useEffect(() => {
        async function fetchGabarito() {
            try {
                const response = await axios.get(`${publicRuntimeConfig.serverUrl}/gabarito`);
                console.log('Gabarito:', response.data.respostas);
                console.log('Nota:', response.data.nota);
                setNota(response.data.nota);
                setGabarito(response.data.respostas);
            } catch (error) {
                console.error('Erro ao buscar o gabarito:', error);
                // Trate os erros conforme necessário
                localStorage.removeItem('tema');
            }
        }
        fetchGabarito();
    }, []);

    function Voltar() {
        router.push('/');
    }

    function Salvar(){
        const element = document.getElementById('gabarito'); // Obtém o elemento a ser convertido para PDF
         // Converte o elemento para PDF e o salva
    }

    return (
        <div>
            <Logout/>
            <div id='gabarito'>
                <div className='header'>
                    <img className='img-ia' src={nota < 6 ? 'negativo.png' : 'positivo.png'} alt='imagem de inteligência artificial'/>
                    <div className='text-header'>
                        <h2>Gabarito</h2>
                        <p> {tema}</p>
                        <p className={nota < 6 ? 'wrong-answer' : 'correct-answer'}>Nota: {nota} de 10</p>
                    </div>
                </div>
                
                {gabarito.map((pergunta, index) => (
                    <div key={index} className='questoes'>
                        <strong>{pergunta.numero}.</strong> {pergunta.pergunta}
                        {pergunta.correcao === 'certo' ? (
                            <FontAwesomeIcon icon={faCheck} className='certo'/>
                        ) : (
                            <FontAwesomeIcon icon={faTimes} className='errado'/>
                        )}
                        <br/><br/>
                        {pergunta.opcoes.map((opcao, opcaoIndex) => (
                            <p key={opcaoIndex} className={pergunta.resposta === String.fromCharCode(97 + opcaoIndex) ? 'correct-answer' : (pergunta.usuario === String.fromCharCode(97 + opcaoIndex) ? 'wrong-answer' : '')}>{opcao}</p>
                        ))}
                        <br/><br/>
                        <pre>Explicação: {pergunta.explicacao}</pre>
                        <br/>
                    </div>
                ))}
            </div>
            
            <div className='botoes'>
                <div className='botoes-centro'>
                    <button className='botao' onClick={Voltar}>Novo Simulado</button>
                    <button className='botao' onClick={Salvar}>Salvar em PDF</button>
                </div>
            </div>
        </div>
    );
}
