import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteUser, getAllUsers } from "../../api";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { TrashIcon } from "../../icons/TrashIcon";
import {AuthMiddleware} from "../../authMiddleware/AuthMiddleware";
import { Spinner } from "../../components/Spinner";
import { User } from "@supabase/supabase-js";
import { SessionUser } from "../../types";
import { useAlert } from "../../components/Alert";

export function AllUsers({
  session,
  data,
}: {
  session: SessionUser;
  data:
    | [
        {
          profile: {
            name: String;
            user_id: String;
            role: String;
            id: Number;
          };
          users: User;
        }
      ]
    | undefined;
}) {
  const trigger = useAlert()
  const queryClient = useQueryClient()
  const deleteUserMutation = useMutation(
    ["getAllUsers"],
    ({ userId }: { userId: string }) => deleteUser({ userId: userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllUsers"]);
        trigger({
          text: "Usuário deletado!",
          isShowing: true,
          duration: 4000,
        });
      },
    }
  );

  return (
    <div>
      <Navbar session={session} />
      <Sidebar />
      <div className="ml-52 p-32">
        <h1 className="text-2xl font-bold">All Users</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border mt-6">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((us) =>
                us.profile.name == "" ? null : (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {us.profile.name}
                    </th>
                    <td className="px-6 py-4">{us.users.email}</td>
                    <td className="px-6 py-4">{us.profile.role}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          deleteUserMutation.mutate({ userId: us.users.id })
                        }
                        className="rounded p-2 hover:bg-red-200 group"
                      >
                        <TrashIcon className=" group-hover:stroke-red-800" />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function AllUsersPage() {
  const { data, isLoading } = useQuery(["getAllUsers"], () => getAllUsers());

  return (
    <AuthMiddleware>
      {(session: SessionUser) =>
        isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <AllUsers session={session} data={data} />
        )
      }
    </AuthMiddleware>
  );
}
