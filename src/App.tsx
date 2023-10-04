import AuthMiddleware, {
  SessionUser,
  supabase,
} from "../authmiddleware/authMiddleware";
import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
import { useEffect, useState } from "react";
import Card from "./components/Card";
export default function App() {
  const [topics, setTopics] = useState<any[] | null>();

  useEffect(() => {
    getTopics().then((e) => {
      setTopics(e.data);
    });
  }, []);

  const getTopics = async () => {
    return await supabase.from("topics").select("*");
  };

  return (
    <AuthMiddleware>
      {(session: SessionUser) => (
        <div>
          <Navbar session={session} />
          <Hero />
          {session ? <div className="w-full "></div> : <div></div>}
          <div className="w-full grid gap-4 grid-cols-4 px-52 py-32">
            {topics?.map((t) => (
              <Card key={t.title} description={t.description} title={t.title} />
            ))}
          </div>
        </div>
      )}
    </AuthMiddleware>
  );
}
