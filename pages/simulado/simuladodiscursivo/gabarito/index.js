import axios from "axios";
import { useEffect, useState } from "react";
import getConfig from "next/config";
import useAuthentication from "@/components/useAuthentication";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import '@/app/globals.css';
import '@/styles/gabarito.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import LottieAnimation from "@/components/lottie/lottie";
import Title from "@/components/title";
import Nav from "@/components/nav/nav";

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
                const response = await axios.get(`${publicRuntimeConfig.serverUrl}/gabaritoDiscursivo`);
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
        const notaOriginalStyle = notaElement.style.marginLeft;
        notaElement.style.marginLeft = '350px'; 
        const tempElement = document.createElement('div');
        tempElement.appendChild(notaElement.cloneNode(true));
        tempElement.appendChild(gabaritoElement.cloneNode(true));

        const style = document.createElement('style');
        style.innerText = `
            .correct-answer { display: block; }
            .wrong-answer { display: block;  }
            .answer { display: block; }
        `;
        tempElement.appendChild(style);
    
        const doc = new jsPDF('p', 'pt', 'a4');

        let margin;
        const screenWidth = window.innerWidth;
        let windowWidth;

        if (screenWidth <= 900){
            margin = [10, 10 ,10, 10];
            windowWidth = 1000;
        } else{
            margin = [10, 10, 10, -120];
            windowWidth = 1400;
        }
    
        await doc.html(tempElement, {
            callback: function (doc) {
                doc.save('gabarito.pdf');
            },
            margin: margin, 
            x: 10,
            y: 10,
            width: 600,
            windowWidth: windowWidth,
            html2canvas: {
                scale: 0.5,
                useCORS: true,
            },
            pagebreak: { avoid: '.questoes' },
        });
        notaElement.style.marginLeft = notaOriginalStyle;
        notaElement.style.marginBottom = '';
    }

    return (
        <>
            <Title />
            
            <div className={`loading-gabarito ${isLoading ? 'loading' : ''}`}>
                {isLoading ? (
                    <div className='container_loading'>
                        <p>Carregando...</p>
                        <LottieAnimation />
                    </div>
                ) : (
                    <div className="gabarito">
                        <Nav/>
                        <div className='header-gabarito'>
                            <img className='img-ia' src={nota < 6 ? '/negativo.png' : '/positivo.png'} alt='imagem de inteligência artificial' />
                            <div className='text-gabarito' id='nota'>
                                <h2>Gabarito</h2>
                                <p>{tema}</p>
                                <p className={nota < 6 ? 'wrong-answer' : 'correct-answer'}>Nota: {nota} de 10</p>
                            </div>
                            <div className='quadrados-gabarito'>
                        {gabarito.slice(0, -1).map((pergunta, index) => (
                            <div key={index} className={`quadrado-gabarito ${pergunta.correcao.toLowerCase() === 'certo' ? 'quadrado-certo' : pergunta.correcao.toLowerCase() === 'errado' ? 'quadrado-errado' : 'quadrado-meio' }`}></div>
                        ))}    
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
                                    )}>Resposta: {item.respostaCliente}</p><br />
                                    <pre>Resposta Correta: {item.respostaCerta.replace(/\*/g, '')}</pre><br />
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
        </>
    );
}
