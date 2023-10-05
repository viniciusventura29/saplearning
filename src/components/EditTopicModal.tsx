import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { editTopic } from "../api";

export default function NewTopicModal({
  editTopicModalIsOpen,
  setEditTopicModalIsOpen,
  topicTitleProps,
  topicDescProps,
  topicId,
}: {
  editTopicModalIsOpen: boolean;
  setEditTopicModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  topicTitleProps:string;
  topicDescProps:string;
  topicId:string
}) {
  const [topicTitle, setTopicTitle] = useState(topicTitleProps);
  const [topicDesc, setTopicDesc] = useState(topicDescProps);
  const queryClient = useQueryClient();
  console.log(topicId)
  
  const topicEdit = useMutation(({topicId}:{topicId:string})=>editTopic({topicId, topicDesc,topicTitle}),{onSuccess:()=>{
    queryClient.invalidateQueries(['getTopics']);
    setEditTopicModalIsOpen(false)
  }})

  return (
    <div
    onClick={(e)=>e.preventDefault()}
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 z-50 w-full flex justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        editTopicModalIsOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed w-full h-full bg-black opacity-50"></div>
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit topic
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
              onClick={(e) => {
                setEditTopicModalIsOpen(false);
                e.preventDefault();
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
<form onSubmit={()=>topicEdit.mutate({topicId:topicId})}>
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

          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="defaultModal"
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e)=>{topicEdit.mutate({topicId:topicId}); e.preventDefault()}}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                setEditTopicModalIsOpen(false);
                e.preventDefault()
              }}
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </div>
</form>
         
        </div>
      </div>
    </div>
  );
}
