import '@/app/globals.css';
import './footer.css';
import Link from 'next/link';

export default function Footer(){
    return(
        <footer className='footer-home'>
        <div className='container-footer'>
            <div>
            <Link className='link-footer' href='/orientacaodeestudo'>Orientação de estudo</Link><br/>
            <Link className='link-footer' href='/simulado'>Simulado</Link>
            </div>
            <div>
            <Link className='link-footer' href='/correcaoortografica'>Correção ortográfica</Link><br/>
            <Link className='link-footer' href='/resumo'>Resumo</Link>
            </div>
            <div>
            <Link className='link-footer' href='/redacao'>Redação</Link><br/>
            <Link className='link-footer' href='/traducao'>Tradução</Link>
            </div>
            <div>
            <Link className='link-footer' href='/politica'>Política de uso</Link><br/>
            <Link className='link-footer' href='/contato'>Contato</Link>
            </div>
        </div>
        <div className='copyright-home'>
            <Link className='link-copyright' href='copyright'>© 2024 EstudAI. Todos os direitos reservados.</Link>
            </div>
        </footer>
    )
}