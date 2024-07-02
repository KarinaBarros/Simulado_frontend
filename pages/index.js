import useAuthentication from "@/components/useAuthentication";
import Link from "next/link";
import '@/app/globals.css';
import '@/styles/home.css';
import Logout from "@/components/nav/nav";

export default function Home(){
  useAuthentication();
  return(
    <div className="home">
      <Logout/>
    </div>
  )
}