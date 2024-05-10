import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import '../../app/globals.css';
import './simulado.css';

class Pergunta {
  constructor(pergunta, opcoes, numero) {
    this.pergunta = pergunta;
    this.opcoes = opcoes;
    this.numero = numero;
  }
}

export default function Simulado() {
  const router = useRouter();
  const [tema, setTema] = useState('');
  const [perguntas, setPerguntas] = useState([]);

  useEffect(() => {
    // Recuperando os dados do localStorage
    const temaFromStorage = localStorage.getItem('tema');
    const dataFromStorage = localStorage.getItem('data');

    console.log("Tema from localStorage:", temaFromStorage);
    console.log("Data from localStorage:", dataFromStorage);

    if (temaFromStorage && dataFromStorage) {
      setTema(temaFromStorage);
      const parsedData = JSON.parse(dataFromStorage);
      console.log("Parsed data:", parsedData);
      const perguntasArray = parsedData.map(item => {
        return new Pergunta(item.pergunta, item.opcoes,  item.numero);
      });
      console.log("Perguntas array:", perguntasArray);
      setPerguntas(perguntasArray);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implemente o envio das respostas aqui
      localStorage.removeItem('tema');
      localStorage.removeItem('data');
  };

  return (
    <div>
      <h2>Simulado</h2>
      <p>Tema: {tema}</p>
      <form onSubmit={handleSubmit}>
        <br/><br/>
        {perguntas.map((pergunta, index) => (
          <div key={index} className="questions">
            <p> {pergunta.numero}- {pergunta.pergunta}</p>
            <div className="options">
              {pergunta.opcoes.map((opcao, opcaoIndex) => (
                <label key={opcaoIndex} className="option-label">
                  <input type="radio"  className="option-radio" value={opcao} name={pergunta.numero} required/> {opcao}
                </label>
              ))}
            </div>
            <br/>
          </div>
        ))}
        <button type="submit">Enviar Respostas</button>
      </form>
    </div>
  );
}




