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

export default function TextoCorrigido() {
    useAuthentication();
    const { publicRuntimeConfig } = getConfig();
    const [texto, setTexto] = useState("");
    const [copySuccess, setCopySuccess] = useState('');

    useEffect(() => {
        async function fetchCorrecao() {
            try {
                const response = await axios.get(`${publicRuntimeConfig.serverUrl}/correcao`);
                setTexto(response.data);
            } catch (error) {
                console.error('Erro ao buscar o texto corrigido:', error);
            }
        }
        fetchCorrecao();
    }, [publicRuntimeConfig.serverUrl]);

    const processText = (text) => {
        const regex = /\*\*(.*?)\*\*/g;
        const parts = text.split(regex);
        let hasRedText = false;

        const processedText = parts.map((part, index) => {
            if (index % 2 === 1) {
                hasRedText = true;
                return <span key={index} style={{ color: 'red' }}>{part}</span>;
            }
            return part;
        });

        if (!hasRedText) {
            return <p>Este texto não possui erros ortográficos.</p>;
        }

        return processedText;
    };

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
                <img className='img-ia' src='/IAgabarito.png' alt='imagem de inteligência artificial' />
                <div className='text-gabarito' id='nota'>
                    <h2>Correção:</h2>
                </div>

            </div>
            <div className="questoes">
                <div className="container-copiar">
                    <button onClick={copyToClipboard} className="copiar"><FontAwesomeIcon className="icon-copiar" icon={faCopy} /> Copiar</button>
                    {copySuccess && <span className="mensagem">{copySuccess}</span>}
                </div>
                <pre id="targetId">{texto && processText(texto)}</pre>
            </div>
        </div>
    );
}
