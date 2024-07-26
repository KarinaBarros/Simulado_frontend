import '@/app/globals.css';
import '@/styles/login.css';
import { useState } from "react";
import getConfig from "next/config";
import axios from "axios";
import Title from "@/components/title";

export default function Erro() {

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [mensagem, setMensagem] = useState('');
    const { publicRuntimeConfig } = getConfig();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${publicRuntimeConfig.serverUrl}/contato`, { email, nome, mensagem });
            alert('Mensagem enviada com sucesso, daremos um retorno assim que possível.');
        } catch {
            alert('Erro ao enviar');
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="login">
            <Title />
            <div className="container-login">
                <div className="login-itens">

                    <h2>Mensagem</h2>
                    <form onSubmit={handleSubmit} className='form-login'>
                        <br />
                        <h3>Email</h3>
                        <input
                            className='input-login'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <h3>Nome</h3>
                        <input
                            className='input-login'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                        <h3>Mensagem</h3>
                        <textarea
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            rows={5}
                            required>
                        </textarea>
                        <br /><br />
                        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
                    </form>

                </div>
            </div>
        </div>
    )
}