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

export default function Resumo() {
    useAuthentication();

    const [resumo, setResumo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const [pasteSuccess, setPasteSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${publicRuntimeConfig.serverUrl}/resumo`, { resumo });

            router.push({
                pathname: '/resumo/textoresumido',
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
        } catch (err) {
            setPasteSuccess('Falha ao colar, verifique as permissôes do navegador!');
        }
    };

    return (
        <div className={`simulado ${isLoading ? 'loading' : ''}`}>
            {isLoading ? (
                <div className='container_loading'>
                    <p>Carregando...</p>
                    <LottieAnimation />
                </div>
            ) : (
                <div className='container'>
                    <Nav/>
                    <div className="container_form">
                    <div className='container_logo'>
                            <img className='logo' src='/logo.png' alt='logotipo' />
                            <p>IA Simulado</p>
                        </div>
                    <form onSubmit={handleSubmit} className='form_simulado'>
                    <p className="descricao">Escreva ou cole seu texto aqui. A inteligência artificial vai resumir o texto.</p>
                            <p className="label_simulado">Texto:</p>
                            <div className="container-textarea">
                            <textarea id="targetId" rows={15} className='textarea_simulado' type="text" value={resumo} onChange={(e) => setResumo(e.target.value)} maxLength={10000} required />
                            </div>
                            <button onClick={paste} className="colar"><FontAwesomeIcon icon={faPaste} /> Colar:</button>
                            {pasteSuccess && <span className="mensagem">{pasteSuccess}</span>}
                        <button type="submit" className='button_simulado'>Resumir<img src='/brilho.png' className='brilho' alt='ícone brilho'></img></button>
                        
                    </form>
                    </div>
                    <div className='container_imagem'>
                        <img src='/IAprincipal.png' alt='Robô de inteligência artificial com livros.' className='ia_principal'></img>
                    </div>
                </div>
            )}
        </div>
    );
}
