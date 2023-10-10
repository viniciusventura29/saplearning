import boschLogo from "../assets/Bosch_logo.svg";
import boschSupergraphic from "../assets/Bosch-Supergraphic.svg";
import { SessionUser } from "../../authmiddleware/authMiddleware";
import ProfileButton from "./ProfileButton";
export const Navbar = ({ session }: { session?: SessionUser }) => {
  return (
    <nav className="mb-8 z-50 flex w-full flex-col fixed bg-white">
      <div className="h-2 w-full overflow-hidden">
        <img src={boschSupergraphic} className="w-full" alt="" />
      </div>
      <div className="shadow w-full h-20 px-32 py-4 flex items-center justify-between relative">
       <a href="/"> <img className="h-16" src={boschLogo} alt="" /></a>
        {session?.user.data.session ? <div><ProfileButton session={session} /></div> : <a href="/login" style={{background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"}} className="rounded p-3 w-36 font-medium uppercase text-xs cursor-pointer flex justify-center text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]">Login</a>}
      </div>
    </nav>
  );
};
