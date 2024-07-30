import './politica.css';
import Title from "@/components/title";
import Link from 'next/link';

export default function Politica() {
  return (
    <div>
      <Title />
      <div className="container-politica">
        <h1>Política de Uso - EstudAI</h1><br />
        <p>
          Este documento estabelece a Política de Uso do Aplicativo EstudAI
          Gemini, que rege o uso do aplicativo por parte dos usuários. Ao utilizar
          o aplicativo, você concorda em se submeter a esta política.
        </p>

        <h2>Definições</h2>
        <ul>
          <li>Aplicativo: O aplicativo EstudAI, acessível através de um navegador web.</li>
          <li>Usuário: Qualquer pessoa física ou jurídica que utiliza o aplicativo.</li>
          <li>Conteúdo: Qualquer informação, texto, imagem, áudio, vídeo ou outro material acessível através do aplicativo.</li>
          <li>Gemini: O modelo de inteligência artificial utilizado para gerar o conteúdo.</li>
        </ul>

        <h2>Uso Permitido</h2>
        <p>O aplicativo é destinado ao uso pessoal e educacional. Você pode usar o aplicativo para:</p>
        <ul>
          <li>Gerar conteúdos em diversas áreas do conhecimento.</li>
          <li>Praticar para provas e concursos.</li>
          <li>Aprender novos conteúdos.</li>
          <li>Avaliar seu nível de conhecimento.</li>
        </ul>

        <h2>Uso Proibido</h2>
        <p>É proibido usar o aplicativo para qualquer finalidade ilegal, prejudicial ou que viole os direitos de terceiros. Você não deve:</p>
        <ul>
          <li>Copiar, distribuir ou modificar o aplicativo sem autorização prévia e por escrito da EstudAI.</li>
          <li>Utilizar o aplicativo para gerar conteúdo falso, enganoso ou ofensivo.</li>
          <li>Assediar, ameaçar ou prejudicar outros usuários.</li>
          <li>Acessar ou utilizar indevidamente contas de outros usuários.</li>
          <li>Violar qualquer lei ou regulamento aplicável.</li>
        </ul>

        <h2>Conteúdo</h2>
        <p>O conteúdo do aplicativo é gerado pela Gemini e pode não ser preciso ou completo. Você deve sempre verificar outras fontes de informação antes de tomar qualquer decisão com base no conteúdo do aplicativo.</p>
        <p>A Gemini e o EstudAI não se responsabilizam por qualquer dano que possa resultar do uso do aplicativo ou do conteúdo do aplicativo.</p>

        <h2>Propriedade Intelectual</h2>
        <p>Todos os direitos de propriedade intelectual sobre o aplicativo e seu conteúdo pertencem à EstudAI. Você não pode copiar, distribuir ou modificar o aplicativo ou seu conteúdo sem autorização prévia e por escrito da EstudAI.</p>

        <h2>Privacidade</h2>
        <p>A EstudAI coleta e armazena informações sobre os usuários do aplicativo, como nome, e-mail e dados de uso. Essas informações são usadas para melhorar o aplicativo e fornecer serviços aos usuários. A Gemini não compartilha essas informações com terceiros sem o consentimento do usuário.</p>

        <h2>Limitação de Responsabilidade</h2>
        <p>A EstudAI não se responsabiliza por qualquer dano que possa resultar do uso do aplicativo ou do conteúdo do aplicativo. Você utiliza o aplicativo por sua conta e risco.</p>

        <h2>Alterações nesta política</h2>
        <p>Esta política pode ser atualizada periodicamente. Recomendamos que você revise esta página regularmente para se manter informado sobre quaisquer alterações. Ao continuar a utilizar o aplicativo após as alterações nesta política, você estará concordando com as mesmas.</p>

        <div className="footer">
          <p>Para mais informações, entre em contato através do link: <Link href="/contato">Contato</Link>.</p>
        </div>
      </div>
    </div>
  );
}