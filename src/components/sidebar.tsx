import { HomeIcon } from "../icons/HomeIcon";
import { MultUsersIcon } from "../icons/MultUsersIcon";
import { NewUserIcon } from "../icons/NewUserIcon";

export function Sidebar (){
    return(
        <aside
        id="default-sidebar"
        className="fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 pt-28 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
          <li>
              <a
                href="/admin"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HomeIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/allUsers"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MultUsersIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </a>
            </li>

            <li>
              <a
                href="/admin/newUsers"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <NewUserIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">Register Users</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    )
}