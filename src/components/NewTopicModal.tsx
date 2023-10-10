import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTopic } from "../api";

export default function NewTopicModal({
  newTopicModalIsOpen,
  setNewTopicModalIsOpen,
}: {
  newTopicModalIsOpen: boolean;
  setNewTopicModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDesc, setTopicDesc] = useState("");
  const queryClient = useQueryClient();

  const topicCreate = useMutation(
    () => createTopic({ topicDesc, topicTitle }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getTopics"]);
        setNewTopicModalIsOpen(false);
        setTopicDesc("");
        setTopicTitle("");
      },
    }
  );

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 z-50 w-full flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        newTopicModalIsOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed w-full h-full bg-black opacity-50"></div>
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Create new topic
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="defaultModal"
              onClick={() => {
                setNewTopicModalIsOpen(false);
                setTopicDesc("");
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
              <label htmlFor="topicTitle">Topic title</label>
              <input
                id="topicTitle"
                className="p-2 border rounded bg-gray-50"
                placeholder="topic title"
                type="text"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="topicDesc">Topic description</label>
              <input
                id="topicDesc"
                className="p-2 border rounded bg-gray-50"
                placeholder="topic description"
                type="text"
                value={topicDesc}
                onChange={(e) => setTopicDesc(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => topicCreate.mutate()}
            >
              Create
            </button>
            <button
              onClick={() => {
                setNewTopicModalIsOpen(false);
                setTopicDesc("");
                setTopicTitle("");
              }}
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
