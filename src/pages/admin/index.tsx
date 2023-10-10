import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/sidebar";

export function AdminPage() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <Sidebar />
      <div className="ml-80 text-2xl font-bold pt-32">
        <h1>Admin panel</h1>
        <div className="flex gap-2 w-full mt-20">
        <a
          href={`admin/newUsers`}
          id="anchor"
          className="block w-72 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="flex justify-between items-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              New User
            </h5>
          </div>
        </a>
        <a
          href={`admin/allUsers`}
          id="anchor"
          className="block max-w-sm w-72 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="flex justify-between items-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              All users
            </h5>
          </div>
        </a>
        </div>
      </div>
    </div>
  );
}
