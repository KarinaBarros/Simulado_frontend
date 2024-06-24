import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../../app/globals.css';
import './gabarito.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import useAuthentication from "@/components/useAuthentication";
import getConfig from 'next/config';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';

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
            router.push('/simulado');
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
        router.push('/simulado');
    }

    async function Salvar() {
        const notaElement = document.getElementById('nota');
        const gabaritoElement = document.getElementById('gabarito');

        // Criar uma div temporária para combinar os conteúdos
        const tempElement = document.createElement('div');
        tempElement.appendChild(notaElement.cloneNode(true));
        tempElement.appendChild(gabaritoElement.cloneNode(true));

        const doc = new jsPDF('p', 'pt', 'a4');

        await doc.html(tempElement, {
            callback: function (doc) {
                doc.save('gabarito.pdf');
            },
            margin: [10, 10, 10, 10], // Reduzir as margens
            x: 10,
            y: 10,
            width: 550, // Ajustar a largura
            windowWidth: 700, // Ajustar a largura da janela
            html2canvas: {
                scale: 0.5, // Diminuir a escala
                useCORS: true, // para evitar problemas de carregamento de imagens
            },
            pagebreak: { avoid: '.questoes' }, // Evitar quebra de página dentro das perguntas
        });
    }
    return (
        <div>
            
            <div>
                <div className='header'>
                    <img className='img-ia' src={nota < 6 ? 'negativo.png' : 'positivo.png'} alt='imagem de inteligência artificial'/>
                    <div className='text-header' id='nota'>
                        <h2>Gabarito</h2>
                        <p> {tema}</p>
                        <p className={nota < 6 ? 'wrong-answer' : 'correct-answer'}>Nota: {nota} de 10</p>
                    </div>
                </div>
                
                <div id='gabarito'>
                {gabarito.map((pergunta, index) => (
                    <div key={index} className='questoes' >
                        {pergunta.numero}- {pergunta.pergunta}
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
