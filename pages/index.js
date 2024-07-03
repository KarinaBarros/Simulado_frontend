import useAuthentication from "@/components/useAuthentication";
import '@/app/globals.css';
import '@/styles/home.css';
import Nav from "@/components/nav/nav";

export default function Home(){
  useAuthentication();
  return(
    <div className="home">
      <Nav/>
    </div>
  )
}