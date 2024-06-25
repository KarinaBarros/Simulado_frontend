import useAuthentication from "@/components/useAuthentication";
import Link from "next/link";
import '@/app/globals.css';
import '@/styles/home.css';

export default function Home(){
  useAuthentication();
  return(
    <div className="home">
      <h1>Home</h1>
      <Link href='/simulado' className="link-home">Simulado</Link><br/>
      <Link href='/correcaoortografica' className="link-home">Correção Ortográfica</Link><br/>
      <Link href='/resumo' className="link-home">Resumo</Link><br/>
      <Link href='/redacao' className="link-home">Redação</Link>
    </div>
  )
}