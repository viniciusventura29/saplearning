import { SetStateAction, useState } from "react";
import { EditIcon } from "../icons/EditIcon";
import EditTopicModal from "./EditTopicModal";
import { ProfileUser, SessionUser } from "../../authmiddleware/authMiddleware";
import { TrashIcon } from "../icons/TrashIcon";
import ConfirmDeleteTopicModal from "./ConfirmDeleteModal";

export default function Card({
  title,
  description,
  id,
  session,
}: {
  title: string;
  description: string;
  id: number;
  session: SessionUser & ProfileUser;
}) {
  const [editTopicModalIsOpen, setEditTopicModalIsOpen] = useState(false);
  const [confirmDeleteTopicModalIsOpen, setConfirmDeleteTopicModalIsOpen] = useState(false);
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
        <div className="flex gap-2">
          {session?.user.data.session ? (
            <button
              onClick={(e) => {
                setEditTopicModalIsOpen(true);
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-1 rounded hover:bg-blue-100"
            >
              <EditIcon />
            </button>
          ) : null}
          {session?.user.data.session && session?.profile.data[0].role === "ADMIN" ? (
            <button
              onClick={(e) => {
                setConfirmDeleteTopicModalIsOpen(true);
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-1 rounded hover:bg-red-100"
            >
              <TrashIcon />
            </button>
          ) : null}
        </div>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <EditTopicModal
        editTopicModalIsOpen={editTopicModalIsOpen}
        topicDescProps={description}
        setEditTopicModalIsOpen={setEditTopicModalIsOpen}
        topicId={title}
        topicTitleProps={title}
      />
      <ConfirmDeleteTopicModal confirmDeleteTopicModalIsOpen={confirmDeleteTopicModalIsOpen} setConfirmDeleteTopicModalIsOpen={setConfirmDeleteTopicModalIsOpen} title={title} />
    </a>
  );
}
