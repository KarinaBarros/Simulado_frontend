import Nav from "@/components/nav/nav";
import useAuthentication from "@/components/useAuthentication";
import { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "next/config";
import '@/app/globals.css';
import '@/styles/principal.css';
import SaveTemas from "@/components/savetemas";
import Link from "next/link";
import Title from "@/components/title";

export default function Editar() {
    useAuthentication();
    const [email, setEmail] = useState(null);
    const [nome, setNome] = useState(null);
    const [nivel, setNivel] = useState(null);
    const [curso, setCurso] = useState(null);
    const [novoNome, setNovoNome] = useState('');
    const [novoNivel, setNovoNivel] = useState('');
    const [novoCurso, setNovoCurso] = useState('');
    const { publicRuntimeConfig } = getConfig();
    const [showCurso, setShowCurso] = useState(false);
    const [required, setRequired] = useState(false);
    const [temas, setTemas] = useState(false);
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
        const cursoNulo = '';
        if (cursoFromStorage) {
            setCurso(cursoFromStorage);
            setShowCurso(true);
        } else {
            setCurso(cursoNulo);
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTemas(false);

        if ((novoNome && novoNome !== nome) ||
            (novoNivel && novoNivel !== nivel) ||
            (novoCurso && novoCurso !== curso)) {
            setLoading(true);
            try {
                const response = await axios.post(`${publicRuntimeConfig.serverUrl}/editar`, { email, novoNome, novoNivel, novoCurso });
                const resposta = response.data;

                if ((novoNome && novoNome !== nome)) {
                    localStorage.setItem('nome', novoNome);
                    setNome(novoNome);
                    setNovoNome('');
                }
                if ((novoNivel && novoNivel !== nivel)) {
                    localStorage.setItem('nivel', novoNivel);
                    setNivel(novoNivel);
                    setNovoNivel('');
                }
                if ((novoCurso && novoCurso !== curso)) {
                    localStorage.setItem('curso', novoCurso);
                    setCurso(novoCurso);
                    setNovoCurso('');
                }
                if ((novoNivel === 'Ensino fundamental') || (novoNivel === 'Ensino médio') || (novoNivel === 'Pré-vestibular')) {
                    localStorage.removeItem('curso');
                }
                if ((novoNivel && novoNivel !== nivel) || (novoCurso && novoCurso !== curso)) {
                    localStorage.removeItem('temas');
                    setTemas(true);
                }


                alert('Dados atualizados com suscesso!');
                setLoading(false);

            } catch (err) {
                console.error('Falha ao enviar o email!', err);
            }
        } else {
            alert('Insira algum dado para editar!')
        }

    }

    return (
        <div className="simulado">
            <Title />
            <div className="container">
                <Nav />
                <div className="container-interger">
                    <div className='editar'>
                        <h2>Preencha somente os campos que deseja editar.</h2>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <p className="email-editar">Email: {email}</p>
                            <br />
                            <p>Nome: {nome}</p>
                            <label>Novo nome:
                                <input
                                    value={novoNome}
                                    onChange={(e) => setNovoNome(e.target.value)}
                                >
                                </input>
                            </label>
                            <br /><br />
                            <p>Nível de escolaridade: {nivel}</p>
                            <label>Novo nível:
                                <select
                                    value={novoNivel}
                                    onChange={(e) => {
                                        setNovoNivel(e.target.value);
                                        if ((e.target.value === "Ensino técnico") || (e.target.value === "Ensino superior")) {
                                            setShowCurso(true); setRequired(true);
                                        } else if (e.target.value === '') {
                                            setRequired(false);
                                        } else { setShowCurso(false); setRequired(false); setNovoCurso(''); }
                                    }}>
                                    <option></option>
                                    <option value="Ensino fundamental">Ensino fundamental</option>
                                    <option value="Ensino médio">Ensino médio</option>
                                    <option value="Ensino técnico">Ensino técnico</option>
                                    <option value="Pré-vestibular">Pré-vestibular</option>
                                    <option value="Ensino superior">Ensino superior</option>
                                </select>
                            </label>
                            <br /><br />
                            {(showCurso) && <div>
                                <p>Curso: {curso}</p>
                                <label>Novo curso:
                                    <input
                                        value={novoCurso}
                                        onChange={(e) => setNovoCurso(e.target.value)}
                                        required={required}
                                    ></input>
                                </label>
                                <br /><br />
                            </div>
                            }
                            <button type="submit" disabled={loading} >{loading ? 'Editando...' : 'Editar'}</button>
                        </form><br /><br />
                        <Link href='/trocarsenha'>Alterar Senha</Link>
                        {(temas) && <div><SaveTemas /> </div>}
                    </div>
                </div>
            </div>

        </div>
    )
}
