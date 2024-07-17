import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import '@/app/globals.css';
import '@/styles/principal.css';
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import Nav from "@/components/nav/nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste } from '@fortawesome/free-solid-svg-icons';
import LottieAnimation from "@/components/lottie/lottie";
import Title from "@/components/title";

export default function Traducao() {
    useAuthentication();

    const [traducao, setTraducao] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const [pasteSuccess, setPasteSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${publicRuntimeConfig.serverUrl}/traducao`, { traducao });

            router.push({
                pathname: '/traducao/textotraduzido',
            });
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleClick = () => {
            setPasteSuccess('');
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const paste = async () => {
        try {
            await navigator.permissions.query({ name: 'clipboard-read' });
            const text = await navigator.clipboard.readText();
            document.getElementById('targetId').value += text;
            setTraducao(prevResumo => prevResumo + text);
        } catch (err) {
            setPasteSuccess('Falha ao colar, verifique as permissôes do navegador!');
        }
    };

    return (
        <>
            <Title />
            <div className={`simulado ${isLoading ? 'loading' : ''}`}>
                {isLoading ? (
                    <div className='container_loading'>
                        <p>Carregando...</p>
                        <LottieAnimation />
                    </div>
                ) : (
                    <div className='container'>
                        <Nav />
                        <div className="container-interger">
                            <div className='interger-top'>
                                <div>
                                    <h1 className="cores">Tradução</h1>
                                </div>
                                <p className="descricao">Escreva ou cole seu texto em qualquer linguagem aqui. A inteligência artificial vai traduzir seu texto para o português.</p>
                            </div>
                            <form onSubmit={handleSubmit} className='interger-bottom'>

                                <p className="label_simulado">Texto:</p>
                                <div className="container-textarea">
                                    <textarea id="targetId" rows={15} className='textarea_simulado' type="text" value={traducao} onChange={(e) => setTraducao(e.target.value)} maxLength={10000} required />
                                </div>
                                <button type="button" onClick={paste} className="colar"><FontAwesomeIcon className="icon-colar" icon={faPaste} /> Colar:</button>
                                {pasteSuccess && <span className="mensagem">{pasteSuccess}</span>}
                                <button type="submit" className='button_simulado'>Traduzir<img src='/brilho.png' className='brilho' alt='ícone brilho'></img></button>

                            </form>
                        </div>

                    </div>
                )}
            </div>
        </>
    );
}
