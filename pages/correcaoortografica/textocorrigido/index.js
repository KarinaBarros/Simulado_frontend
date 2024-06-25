import { useEffect, useState } from "react";
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import axios from "axios";

export default function TextoCorrigido() {
    useAuthentication();
    const { publicRuntimeConfig } = getConfig();
    const [texto, setTexto] = useState(""); // Estado para armazenar o texto corrigido

    useEffect(() => {
        async function fetchCorrecao() {
            try {
                const response = await axios.get(`${publicRuntimeConfig.serverUrl}/correcao`);
                console.log(response.data);
                setTexto(response.data); // Define o texto corrigido no estado
            } catch (error) {
                console.error('Erro ao buscar o texto corrigido:', error);
                // Trate os erros conforme necessário
            }
        }
        fetchCorrecao();
    }, [publicRuntimeConfig.serverUrl]);

    const processText = (text) => {
        const regex = /\*\*(.*?)\*\*/g;
        const parts = text.split(regex);
        let hasRedText = false; // Variável para verificar se há texto em vermelho

        const processedText = parts.map((part, index) => {
            if (index % 2 === 1) { // índice ímpar, significa que está entre **
                hasRedText = true; // Há texto em vermelho
                return <span key={index} style={{ color: 'red' }}>{part}</span>;
            }
            return part; // índice par, texto normal
        });

        // Se não houver texto em vermelho, mostra a mensagem
        if (!hasRedText) {
            return <p>Este texto não possui erros ortográficos.</p>;
        }

        return processedText;
    };

    return (
        <div>
            <h1>Correção</h1>
            <pre>{texto && processText(texto)}</pre>
        </div>
    );
}
