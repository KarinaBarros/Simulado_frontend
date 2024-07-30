import Nav from "@/components/nav/nav";
import '@/app/globals.css';
import '@/styles/principal.css';
import useAuthentication from "@/components/useAuthentication";
import { useEffect, useState } from "react";
import getConfig from "next/config";
import axios from "axios";
import Title from "@/components/title";

export default function Erro() {
    useAuthentication();
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [nivel, setNivel] = useState('');
    const [curso, setCurso] = useState('');
    const [temas, setTemas] = useState('');
    const [erro, setErro] = useState('');
    const { publicRuntimeConfig } = getConfig();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const emailFromStorage = localStorage.getItem('email');
        const nomeFromStorage = localStorage.getItem('nome');
        const nivelFromStorage = localStorage.getItem('nivel');
        if (emailFromStorage) {
            setEmail(emailFromStorage);
            setNome(nomeFromStorage);
            setNivel(nivelFromStorage);
        }
    }, [])

    useEffect(() => {
        const cursoFromStorage = localStorage.getItem('curso');
        if (cursoFromStorage) {
            setCurso(cursoFromStorage);
        }
    }, [])

    useEffect(() => {
        const temasFromStorage = localStorage.getItem('temas');
        if (temasFromStorage) {
            setTemas(JSON.parse(temasFromStorage));
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${publicRuntimeConfig.serverUrl}/erro`, { email, nome, nivel, curso, temas, erro });
            alert('Seu erro foi reportado!');
        } catch {
            alert('Erro ao enviar');
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="simulado">
            <Title />
            <div className="container">
                <Nav />
                <div className="container-interger">
                    <div className="editar">
                        <p>Reporte seu erro com detalhes. Se possível coloque todos os dados usados para gerar o conteúdo e a ferramenta utilizada.</p>
                        <form onSubmit={handleSubmit}>
                            <br />
                            <textarea
                                value={erro}
                                onChange={(e) => setErro(e.target.value)}
                                required>
                            </textarea>
                            <br /><br />
                            <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}