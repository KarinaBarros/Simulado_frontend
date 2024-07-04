import { useEffect, useState } from "react";
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import '@/app/globals.css';
import '@/styles/gabarito.css';
import Linkify from 'react-linkify';
import Title from "@/components/title";

export default function Orientacao() {
    useAuthentication();
    const { publicRuntimeConfig } = getConfig();
    const [texto, setTexto] = useState(""); // Estado para armazenar o texto corrigido
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        async function fetchCorrecao() {
            try {
                const response = await axios.get(`${publicRuntimeConfig.serverUrl}/orientacao`);
                console.log(response.data);
                setTexto(response.data); // Define o texto corrigido no estado
            } catch (error) {
                console.error('Erro ao buscar a orientação de estudos:', error);
                // Trate os erros conforme necessário
            }
        }
        fetchCorrecao();
    }, [publicRuntimeConfig.serverUrl]);

    useEffect(() => {
        const handleClick = () => {
            setCopySuccess('');
        };

        document.addEventListener('click', handleClick);

        // Cleanup event listener on component unmount
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

    const handleLinkClick = (event) => {
        event.preventDefault();
        window.open(event.target.href, '_blank');
    };

    const linkDecorator = (href, text, key) => (
        <a href={href} key={key} onClick={handleLinkClick} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );

    return (
        <div>
            <Title/>
            <div className='header'>
                <div className='text-header' id='nota'>
                    <h2>Orientação de estudo:</h2>
                </div>
                <img className='img-ia' src='/IAgabarito.png' alt='imagem de inteligência artificial'/>
            </div>
            <div className="questoes">
                <div className="container-copiar">
                    <button onClick={copyToClipboard} className="copiar">
                        <FontAwesomeIcon icon={faCopy} /> Copiar
                    </button>
                    {copySuccess && <span className="mensagem">{copySuccess}</span>}
                </div>
                <pre id="targetId">
                    <Linkify componentDecorator={linkDecorator}>{texto}</Linkify>
                </pre>
            </div>
        </div>
    );
}
