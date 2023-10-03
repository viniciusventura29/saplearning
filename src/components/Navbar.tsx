import boschLogo from "../assets/Bosch_logo.svg";
import boschSupergraphic from "../assets/Bosch-Supergraphic.svg";
import { SessionUser } from "../../authmiddleware/authMiddleware";
import ProfileButton from "./ProfileButton";
export const Navbar = ({ session }: { session: SessionUser }) => {
  return (
    <nav className="mb-8 bg-white">
      <div className="h-2 w-full overflow-hidden">
        <img src={boschSupergraphic} className="w-full" alt="" />
      </div>
      <div className="shadow w-full h-20 px-32 py-4 flex items-center justify-between relative">
        <img className="h-16" src={boschLogo} alt="" />
        {session ? <div><ProfileButton session={session} /></div> : <p>Login</p>}
      </div>
    </nav>
  );
};
