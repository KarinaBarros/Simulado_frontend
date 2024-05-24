import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../app/globals.css';
import './gabarito.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';


export default function Gabarito() {
    const [nota, setNota] = useState();
    const [gabarito, setGabarito] = useState([]);
    const tema = localStorage.getItem('tema');


    useEffect(() => {
        async function fetchGabarito() {
            try {
                const response = await axios.get('http://localhost:3000/gabarito');
                console.log('Gabarito:', response.data.respostas);
                console.log('Nota:', response.data.nota);
                setNota(response.data.nota);
                setGabarito(response.data.respostas);
            } catch (error) {
                console.error('Erro ao buscar o gabarito:', error);
                // Trate os erros conforme necessário
                localStorage.removeItem('tema');
            }
        }
        fetchGabarito();
        
    }, []);

    return (
        <div >
            <div className='header'>
                <img className='img-ia' src={nota<6 ? 'negativo.png' : 'positivo.png'} alt='imagem de inteligência artificial'/>
                <div className='text-header'>
                    <h2>Gabarito</h2>
                    <p> {tema}</p>
                    <p className={nota < 6 ? 'wrong-answer' : 'correct-answer'}>Nota: {nota} de 10</p>
                </div>
            </div>
            
                {gabarito.map((pergunta, index) => (
                    <div key={index} className='questoes'>
                        <strong>{pergunta.numero}.</strong> {pergunta.pergunta}
                        {pergunta.correcao === 'certo' ? (
                        <FontAwesomeIcon icon={faCheck} className='certo'/>
                        ) : (
                        <FontAwesomeIcon icon={faTimes} className='errado'/>
                        )}
                         <br/><br/>
                        {pergunta.opcoes.map((opcao, opcaoIndex) => (
                            <p key={opcaoIndex} className={pergunta.resposta === String.fromCharCode(97 + opcaoIndex) ? 'correct-answer' : (pergunta.usuario === String.fromCharCode(97 + opcaoIndex) ? 'wrong-answer' : '')}>{opcao}</p>
                        ))}
                        <br/><br/>
                        <p>Explicação: {pergunta.explicacao}</p>
                        <br/>
                    </div>
                ))}
            
        </div>
    );
}