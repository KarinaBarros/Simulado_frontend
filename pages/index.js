import useAuthentication from "@/components/useAuthentication";
import '@/app/globals.css';
import '@/styles/home.css';
import Nav from "@/components/nav/nav";
import Title from "@/components/title";
import SaveTemas from "@/components/savetemas";

export default function Home(){
  useAuthentication();
  
  return(
    
    
    <div className="home">
      <Title/>
      <SaveTemas/>
      <Nav/>
    </div>
    
  )
}