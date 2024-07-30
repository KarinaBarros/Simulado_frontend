import { useEffect, useState } from "react";
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import axios from "axios";
import '@/app/globals.css';
import '@/styles/gabarito.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Title from "@/components/title";
import Nav from "@/components/nav/nav";

export default function Analise() {
    useAuthentication();
    const { publicRuntimeConfig } = getConfig();
    const [texto, setTexto] = useState("");
    const [nota, setNota] = useState();
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        async function fetchCorrecao() {
            try {
                const response = await axios.get(`${publicRuntimeConfig.serverUrl}/analise`);
                console.log(response.data);
                setTexto(response.data.comentario);
                setNota(response.data.nota);
            } catch (error) {
                console.error('Erro os dados:', error);
            }
        }
        fetchCorrecao();
    }, [publicRuntimeConfig.serverUrl]);

    useEffect(() => {
        const handleClick = () => {
            setCopySuccess('');
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const copyToClipboard = async () => {
        try {
            const textToCopy = document.getElementById('targetId').innerText;
            await navigator.clipboard.writeText(textToCopy);
            setCopySuccess('Copiado para a área de transferência!');
        } catch (err) {
            setCopySuccess('Falha ao copiar!');
        }
    };



    return (
        <div className="gabarito">
            <Title />
            <Nav />
            <div className='header-gabarito'>
                <img className='img-ia' src={nota < 6 ? '/negativo.png' : '/positivo.png'} alt='imagem de inteligência artificial' />
                <div className='text-gabarito' id='nota'>
                    <h2>Análise da redação:</h2>
                    <p className={nota < 6 ? 'wrong-answer' : 'correct-answer'}>Nota: {nota} de 10</p>
                </div>
            </div>
            <div className="questoes">
                <div className="container-copiar">
                    <button onClick={copyToClipboard} className="copiar"><FontAwesomeIcon className="icon-copiar" icon={faCopy} /> Copiar</button>
                    {copySuccess && <span className="mensagem">{copySuccess}</span>}
                </div>
                <pre id="targetId">{texto}</pre>
            </div>
        </div>
    );
}