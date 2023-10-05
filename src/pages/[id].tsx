import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getArticle } from "../api";

function Article({ id }: { id: string }) {
  const [text, setText] = useState<any>("");

  useQuery({
    queryKey: ["getArticle"],
    queryFn: () => getArticle({ topic_id: id ?? "", setText }),
  });

  console.log(text.body);

  return (
    <div>
      Tutorial: {id}
    </div>
  );
}

export default function ArticlePage() {
  const { id } = useParams();

  return <>{id != undefined ? <Article id={id} /> : "loading"}</>;
}
