import { useState } from "react";
import { AuthMiddleware } from "../authMiddleware/AuthMiddleware";
import { Navbar } from "../components/Navbar";
import { SessionUser } from "../types";
import { useMutation } from "react-query";
import { changePassword } from "../api";
import { useAlert } from "../components/Alert";

function User({ session }: { session: SessionUser }) {
  const [newPassword, setNewPassword] = useState("");
  const trigger = useAlert();

  const changePasswordMutation = useMutation(
    () => changePassword({ newPassword: newPassword }),
    {
      onSuccess: () => {
        trigger({
          text: "Senha Atualizada!",
          isShowing: true,
          duration: 4000,
        });
      },
    }
  );

  return (
    <div>
      <Navbar session={session} />
      <div className="pt-32 ml-80">
        <form
          className="w-2/3"
          onSubmit={(e) => {
            changePasswordMutation.mutate();
            e.preventDefault();
          }}
        >
          <div className="mb-6">
            <h1 className="text-2xl mb-6 font-bold">Change Password</h1>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type="text"
              id="newPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="**********"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 mt-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Change password
          </button>
        </form>
      </div>
    </div>
  );
}

export function UserPage() {
  return (
    <AuthMiddleware>
      {(session) => <User session={session} />}
    </AuthMiddleware>
  );
}
