import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteTopic } from "../api";

export default function ConfirmDeleteTopicModal({
  confirmDeleteTopicModalIsOpen,
  setConfirmDeleteTopicModalIsOpen,
  title,
}: {
  confirmDeleteTopicModalIsOpen: boolean;
  setConfirmDeleteTopicModalIsOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  title: string;
}) {
  const [topicTitle, setTopicTitle] = useState("");
  const queryClient = useQueryClient();

    const topicDelete = useMutation(()=>deleteTopic({topicTitle:title}),{onSuccess:()=>{
      queryClient.invalidateQueries(['getTopics']);
      setConfirmDeleteTopicModalIsOpen(false)
      setTopicTitle("");
    }})

  return (
    <div
    onClick={(e)=>e.preventDefault()}
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed cursor-auto top-0 left-0 right-0 z-50 w-full flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        confirmDeleteTopicModalIsOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed w-full h-full bg-black opacity-50"></div>
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Delete Topic
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
              onClick={() => {
                setConfirmDeleteTopicModalIsOpen(false);
                setTopicTitle("");
              }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6 flex flex-col">
            <div className="flex flex-col gap-2">
            <p className="font-bold text-xl">Are you sure you want to delete this topic?</p>
            <p>This action is irreversible!</p>
            <p className="mt-10">To delete this write the topic title <span className="text-gray-600 italic">("{title}")</span> below</p>
              <input
                id="topicTitle"
                className="p-2 border rounded bg-gray-50"
                placeholder="topic title"
                type="text"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              disabled={title !== topicTitle}
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled:bg-red-200"
                onClick={(e)=>{topicDelete.mutate();e.preventDefault()}}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setConfirmDeleteTopicModalIsOpen(false);
                setTopicTitle("");
              }}
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
