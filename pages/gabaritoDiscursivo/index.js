import axios from "axios";
import { useEffect, useState } from "react";
import getConfig from "next/config";
import useAuthentication from "@/components/useAuthentication";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import '../../app/globals.css';
import '../gabarito/gabarito.css';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';

const Loading = () => (
    <div className="container_loading">
        <p>Carregando...</p>
        <div className="loading"></div>
    </div>
);

export default function GabaritoDiscursivo() {
    useAuthentication();
    const { publicRuntimeConfig } = getConfig();
    const router = useRouter();
    const [gabarito, setGabarito] = useState([]);
    const [tema, setTema] = useState(null);
    const [nota, setNota] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const tema = localStorage.getItem('tema');
        setTema(tema ? tema : '');
    }, []);

    useEffect(() => {
        async function fetchSimulado() {
            try {
                setIsLoading(true);  // Inicia o carregamento
                const response = await axios.get(`${publicRuntimeConfig}/gabaritoDiscursivo`);
                console.log(response.data);
                setGabarito(response.data);
                const totalNota = response.data[response.data.length - 1].notaTotal;
                setNota(totalNota);
            } catch (error) {
                console.error('Erro ao buscar o gabarito:', error);
            } finally {
                setIsLoading(false);  // Termina o carregamento
            }
        }
        fetchSimulado();
    }, [publicRuntimeConfig.serverUrl]);

    useEffect(() => {
        const handlePopState = () => {
            router.push('/simulado');
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [router]);

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
            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    <div className='header'>
                        <img className='img-ia' src={nota < 6 ? '/negativo.png' : '/positivo.png'} alt='imagem de inteligência artificial' />
                        <div className='text-header' id='nota'>
                            <h2>Gabarito</h2>
                            <p>{tema}</p>
                            <p className={nota < 6 ? 'wrong-answer' : 'correct-answer'}>Nota: {nota} de 10</p>
                        </div>
                    </div>
                    <div id='gabarito'>
                        {gabarito.slice(0, -1).map((item) => (
                            <div key={item.numero} className="questoes">
                                {item.numero}- {item.pergunta}
                                {item.correcao.toLowerCase() === 'certo' ? (
                                    <FontAwesomeIcon icon={faCheck} className='certo' />
                                ) : item.correcao.toLowerCase() === 'errado' ? (
                                    <FontAwesomeIcon icon={faTimes} className='errado' />
                                ) : (
                                    <FontAwesomeIcon icon={faCheck} className='meio-certo' />
                                )}
                                <br /><br />
                                <p className={item.correcao.toLowerCase() === 'certo' ? (
                                    'correct-answer'
                                ) : item.correcao.toLowerCase() === 'errado' ? (
                                    'wrong-answer'
                                ) : (
                                    'answer'
                                )}>Resposta: {item.respostaCliente}</p>
                                <p><strong>Resposta Correta:</strong> {item.respostaCerta}</p>
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
            )}
        </div>
    );
}
