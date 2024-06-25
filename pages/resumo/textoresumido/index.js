import { useEffect, useState } from "react";
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import axios from "axios";

export default function TextoResumido() {
    useAuthentication();
    const { publicRuntimeConfig } = getConfig();
    const [texto, setTexto] = useState(""); // Estado para armazenar o texto corrigido

    useEffect(() => {
        async function fetchCorrecao() {
            try {
                const response = await axios.get(`${publicRuntimeConfig.serverUrl}/textoresumido`);
                console.log(response.data);
                setTexto(response.data); // Define o texto corrigido no estado
            } catch (error) {
                console.error('Erro ao buscar o texto corrigido:', error);
                // Trate os erros conforme necessário
            }
        }
        fetchCorrecao();
    }, [publicRuntimeConfig.serverUrl]);

    

    return (
        <div>
            <h1>Resumo</h1>
            <pre>{texto}</pre>
        </div>
    );
}