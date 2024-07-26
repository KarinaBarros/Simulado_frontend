import Link from "next/link"
import '../politica/politica.css'

export default function Copyright(){
    return(
        <div class="container-politica">
            <h2>Copyright</h2>
            <p>© 2024 EstudAI. Todos os direitos reservados.</p>
            <p>Todo o conteúdo deste site, incluindo textos, gráficos, imagens, e outras informações, é de propriedade exclusiva de EstudAI e está protegido pelas leis de direitos autorais vigentes.</p>
            <p>É proibida a reprodução, distribuição, exibição ou transmissão do conteúdo deste site sem a prévia autorização por escrito de EstudAI.</p>
            <p>Para mais informações, entre em contato através do link: <Link href="/contato">Contato</Link>.</p>
        </div>
    )
}