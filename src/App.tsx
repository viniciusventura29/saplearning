import AuthMiddleware, {
  SessionUser,
} from "../authmiddleware/authMiddleware";
import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
import { useState } from "react";
import Card from "./components/Card";
import { PlusIcon } from "./icons/PlusIcon";
import NewTopicModal from "./components/NewTopicModal";
import { getTopics } from "./api";
import { useQuery } from "react-query";
export default function App() {
  const [topics, setTopics] = useState<any[] | null>();
  const [newTopicModalIsOpen, setNewTopicModalIsOpen] = useState(false);
  useQuery({
    queryKey: ["getTopics"],
    queryFn: () => getTopics({ setTopics }),
  });

  return (
    <AuthMiddleware>
      {(session: SessionUser) => (
        <div>
          <NewTopicModal
            newTopicModalIsOpen={newTopicModalIsOpen}
            setNewTopicModalIsOpen={setNewTopicModalIsOpen}
          />
          
          <Navbar session={session} />
          <Hero />
          <div className="w-full flex px-52 pt-32 pb-10">
            {session?.user.data.session ? (
              <button
                onClick={() => setNewTopicModalIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 text-white rounded flex gap-2 justify-center items-center"
              >
                <PlusIcon />
                New Topic
              </button>
            ) : (
              <div></div>
            )}
          </div>
          <div className="w-full grid gap-4 grid-cols-4 px-52 pb-32">
            {topics?.map((t) => (
              <Card key={t.title} description={t.description} title={t.title} id={t.id} />
            ))}
          </div>
        </div>
      )}
    </AuthMiddleware>
  );
}
