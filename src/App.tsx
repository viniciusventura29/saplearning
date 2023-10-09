import AuthMiddleware, { SessionUser } from "../authmiddleware/authMiddleware";
import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
import { useState } from "react";
import Card from "./components/Card";
import { PlusIcon } from "./icons/PlusIcon";
import NewTopicModal from "./components/NewTopicModal";
import { getTopics } from "./api";
import { useQuery } from "react-query";
import { Footer } from "./components/Footer";
import { Searchbar } from "./components/SearchBar";
import { Spinner } from "./components/Spinner";

export default function App() {
  const [topics, setTopics] = useState<any[] | null>();
  const [newTopicModalIsOpen, setNewTopicModalIsOpen] = useState(false);
  const { isLoading, isError } = useQuery({
    queryKey: ["getTopics"],
    queryFn: () => getTopics({ setTopics }),
  });

  if (isLoading)
    return (
      <div
        role="status"
        className="w-screen h-screen flex flex-col gap-3 items-center justify-center"
      >
        <Spinner />
        <span className="text-xl font-bold text-blue-700">Carregando...</span>
      </div>
    );
  if (isError) return <div>Error!</div>;

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
          <div className="w-full flex px-52 pt-32 pb-10 justify-between">
            {session?.user.data.session ? (
              <button
                onClick={() => setNewTopicModalIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 px-6 text-white rounded flex gap-2 justify-center items-center"
              >
                <PlusIcon />
                New Topic
              </button>
            ) : (
              <div></div>
            )}
            <Searchbar setTopics={setTopics} />
          </div>
          <div className="w-full grid gap-4 grid-cols-4 px-52 pb-32">
            {isLoading ? (
              <Spinner />
            ) : (
              topics?.map((t) => (
                <Card
                  session={session}
                  key={t.title}
                  description={t.description}
                  title={t.title}
                  id={t.id}
                />
              ))
            )}
          </div>
          <Footer />
        </div>
      )}
    </AuthMiddleware>
  );
}
