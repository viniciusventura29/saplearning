import { useState } from "react";
import { EditIcon } from "../icons/EditIcon";
import EditTopicModal from "./EditTopicModal";
import { SessionUser } from "../../authmiddleware/authMiddleware";

export default function Card({
  title,
  description,
  id,
  session
}: {
  title: string;
  description: string;
  id:number,
  session: SessionUser
}) {
  const [editTopicModalIsOpen, setEditTopicModalIsOpen] = useState(false);
  return (
    <a
      href={`/${title}`}
      id="anchor"
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div className="flex justify-between items-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        {session?.user.data.session ? <button onClick={(e)=>{ setEditTopicModalIsOpen(true); e.preventDefault(); e.stopPropagation()}} className="p-1 rounded hover:bg-blue-100"><EditIcon /></button>:null}
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <EditTopicModal editTopicModalIsOpen={editTopicModalIsOpen} topicDescProps={description} setEditTopicModalIsOpen={setEditTopicModalIsOpen} topicId={title} topicTitleProps={title} />
    </a>
  );
}
