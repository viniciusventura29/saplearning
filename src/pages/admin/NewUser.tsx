import { useState } from "react";
import {AuthMiddleware} from "../../../authmiddleware/AuthMiddleware";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { ArrowIcon } from "../../icons/ArrowIcon";
import { SessionUser, UserRoles } from "../../types";
import { useMutation } from "react-query";
import { createUser } from "../../api";
import { useAlert } from "../../components/Alert";

function NewUser({ session }: { session: SessionUser }) {
  const [dropdownUser, setDropdownUser] = useState(false);
  const [role, setRole] = useState(UserRoles.USER);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const trigger = useAlert()

  const createUserMutation = useMutation(
    () => createUser({ name, email, role }),
    {
      onSuccess: () => {
        trigger({
          text: "Usuário Criado!",
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
      <div className="pt-32 ml-80">
        <form
          className="w-2/3"
          onSubmit={(e) => {
            createUserMutation.mutate();
            e.preventDefault();
          }}
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Fulano da silva"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@br.bosch.com"
              required
            />
          </div>

          <div
            onClick={() => setDropdownUser(!dropdownUser)}
            className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 flex justify-between"
          >
            {role} <ArrowIcon />
          </div>
          <div
            className={`${
              dropdownUser ? "" : "hidden"
            } cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full`}
          >
            <ul>
              <li
                onClick={() => {
                  setRole(UserRoles.ADMIN);
                  setDropdownUser(false);
                }}
                className="border w-full h-full p-2.5 hover:bg-gray-200"
              >
                {UserRoles.ADMIN}
              </li>
              <li
                onClick={() => {
                  setRole(UserRoles.USER);
                  setDropdownUser(false);
                }}
                className="border w-full h-full p-2.5 hover:bg-gray-200"
              >
                {UserRoles.USER}
              </li>
            </ul>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 mt-12 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit new user
          </button>
        </form>
      </div>
    </div>
  );
}

export function NewUserPage() {
  return (
    <AuthMiddleware>
      {(session) => <NewUser session={session} />}
    </AuthMiddleware>
  );
}
