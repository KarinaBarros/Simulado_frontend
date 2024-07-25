import '@/app/globals.css';
import '@/styles/home.css';
import Title from "@/components/title";
import Header from '@/components/header/header';
import Main from '@/components/main/main';

export default function Home(){
  
  return(
    
    
    <div className="home">
      <Title/>
      <Header/>
      <Main/>
    </div>
    
  )
}