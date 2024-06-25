import { useEffect, useState } from "react";
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import axios from "axios";
import '../../../app/globals.css';
import '../../gabarito/gabarito.css'

export default function Analise() {
    useAuthentication();
    const { publicRuntimeConfig } = getConfig();
    const [texto, setTexto] = useState(""); // Estado para armazenar o texto corrigido
    const [nota, setNota] = useState();

    useEffect(() => {
        async function fetchCorrecao() {
            try {
                const response = await axios.get(`${publicRuntimeConfig.serverUrl}/analise`);
                console.log(response.data);
                setTexto(response.data.comentario); // Define o texto corrigido no estado
                setNota(response.data.nota);
            } catch (error) {
                console.error('Erro os dados:', error);
                // Trate os erros conforme necessário
            }
        }
        fetchCorrecao();
    }, [publicRuntimeConfig.serverUrl]);

    

    return (
        <div>
            <div className='header'>
                    <img className='img-ia' src={nota < 6 ? '/negativo.png' : '/positivo.png'} alt='imagem de inteligência artificial'/>
                    <div className='text-header' id='nota'>
                        <h2>Análise da redação:</h2>
                        <p className={nota < 6 ? 'wrong-answer' : 'correct-answer'}>Nota: {nota} de 10</p>
                    </div>
                </div>
            <div className="questoes">
                <pre>{texto}</pre>
            </div>
        </div>
    );
}