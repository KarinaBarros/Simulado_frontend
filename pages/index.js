import useAuthentication from "@/components/useAuthentication";
import '@/app/globals.css';
import '@/styles/home.css';
import Nav from "@/components/nav/nav";
import Title from "@/components/title";
import SaveTemas from "@/components/savetemas";

export default function Home(){
  useAuthentication();
  
  return(
    <>
    <Title/>
    <SaveTemas/>
    <div className="home">
      <Nav/>
    </div>
    </>
  )
}