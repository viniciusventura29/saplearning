import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getArticle } from "../../api";
import { Spinner } from "../../components/Spinner";
import { Navbar } from "../../components/Navbar";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import {AuthMiddleware} from "../../authMiddleware/AuthMiddleware";
import { EditIcon } from "../../icons/EditIcon";
import { Footer } from "../../components/Footer";

function Article({ data, session }: { data: any; session: any }) {
  return (
    <div>
      <Navbar session={session} />
      <div className="flex mb-32 pt-20">
        <div className="w-full h-[100vh - 90px] flex flex-col">
          <div className="w-full h-14 flex items-center justify-end"></div>
          <div className="flex justify-center items-center ">
            <div className="w-2/3">
              <div className="mb-4 flex justify-between items-center">
                <h1 className="">
                  Topic: <span className="font-semibold">{data.topic_id}</span>
                </h1>
                {session?.user.data.session ? (
                  <a
                    className="flex gap-2 p-2 px-4 bg-blue-500 rounded text-white"
                    href={`${data.topic_id}/edit`}
                  >
                    <EditIcon className="w-4" />
                    Editar
                  </a>
                ) : null}
              </div>
              <div className="min-h-screen bg-gray-50 rounded-lg border shadow p-14">
                <h2 className="text-2xl font-bold mb-6">
                  {data.title === "" ? (
                    <span className="text-gray-500 italic">
                      Article title here
                    </span>
                  ) : (
                    data.title
                  )}
                </h2>
                <ReactMarkdown className="markdown" rehypePlugins={[rehypeRaw]}>
                  {data.body == "" ? (
                    "<span className='text-gray-500 italic'>Article body is empty! Start to write something.</span>"
                  ) : (
                    data.body
                  )}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function ArticlePage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getArticle"],
    queryFn: () => getArticle({ topic_id: id ?? "" }),
  });

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <AuthMiddleware>
          {(session) => <Article data={data} session={session} />}
        </AuthMiddleware>
      )}
    </>
  );
}
