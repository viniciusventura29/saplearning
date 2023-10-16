import { useLocation } from "react-router-dom";
import { HomeIcon } from "../icons/HomeIcon";
import { MultUsersIcon } from "../icons/MultUsersIcon";
import { NewUserIcon } from "../icons/NewUserIcon";

export function SidebarComponent({ path }: { path: string }) {
  console.log(path);
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 pt-28 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li className={`${path === "/admin"?"text-blue-700":""}`}>
            <a
              href="/admin"
              className="flex items-center p-2 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <HomeIcon />
              <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
            </a>
          </li>
          <li className={`${path === "/admin/allUsers"?"text-blue-700":""}`}>
            <a
              href="/admin/allUsers"
              className="flex items-center p-2 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <MultUsersIcon />
              <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
            </a>
          </li>

          <li className={`${path === "/admin/newUsers"?"text-blue-700":""}`}>
            <a
              href="/admin/newUsers"
              className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <NewUserIcon />
              <span className="flex-1 ml-3 whitespace-nowrap">
                Register Users
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export const Sidebar = () => {
  const { pathname } = useLocation();
  return <SidebarComponent path={pathname} />;
};
