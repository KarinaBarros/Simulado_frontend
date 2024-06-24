import useAuthentication from "@/components/useAuthentication";
import Link from "next/link";
import '../app/globals.css';
import './home.css';

export default function Home(){
  useAuthentication();
  return(
    <div className="home">
      <h1>Home</h1>
      <Link href='/simulado' className="link-home">Simulado</Link><br/>
      <Link href='/correcaoortografica' className="link-home">Correção Ortográfica</Link>
    </div>
  )
}