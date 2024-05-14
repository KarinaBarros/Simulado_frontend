import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../app/globals.css'
import './gabarito.css';

export default function Gabarito() {
    const [gabarito, setGabarito] = useState([]);
    const tema = localStorage.getItem('tema');

    useEffect(() => {
        async function fetchGabarito() {
            try {
                const response = await axios.get('http://localhost:3000/gabarito');
                console.log('Gabarito:', response.data);
                setGabarito(response.data);
            } catch (error) {
                console.error('Erro ao buscar o gabarito:', error);
                // Trate os erros conforme necessário
            }
        }
        fetchGabarito();
    }, []);

    return (
        <div>
            <h2>Gabarito</h2>
            <p>{tema}</p>
            <br/>
            
                {gabarito.map((pergunta, index) => (
                    <div key={index}>
                        <strong>{pergunta.numero}.</strong> {pergunta.pergunta}
                        <p>{pergunta.correcao}</p>
                        {pergunta.opcoes.map((opcao, opcaoIndex) => (
                            <p key={opcaoIndex} className={pergunta.resposta === String.fromCharCode(97 + opcaoIndex) ? 'correct-answer' : (pergunta.usuario === String.fromCharCode(97 + opcaoIndex) ? 'wrong-answer' : '')}>{opcao}</p>
                        ))}
                        <p>Explicação: {pergunta.explicacao}</p>
                        <br/>
                    </div>
                ))}
            
        </div>
    );
}