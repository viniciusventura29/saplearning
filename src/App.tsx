import AuthMiddleware, { SessionUser } from "../authmiddleware/authMiddleware";
import { Navbar } from "./components/Navbar";
import Hero from "./components/hero";
export default function App() {
  return (
    <AuthMiddleware>
      {(session: SessionUser) => (
        <div>
          <Navbar session={session} />
          <Hero />
          {session ? session.user.data.session?.user.email : ""}
        </div>
      )}
    </AuthMiddleware>
  );
}
