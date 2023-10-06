import { useState } from "react";
import { ProfileUser, SessionUser, supabase } from "../../authmiddleware/authMiddleware";

export default function ProfileFunction ({session}:{session:SessionUser & ProfileUser}){
    const [isOpen, setIsOpen] = useState(false);

    const singout=()=>{
      supabase.auth.signOut()
    }

  return (
    <div>
      <img
        id="avatarButton"
        data-dropdown-toggle="userDropdown"
        data-dropdown-placement="bottom-start"
        className="w-10 h-10 rounded-full cursor-pointer"
        src="/docs/images/people/profile-picture-5.jpg"
        alt="User dropdown"
        onClick={()=>setIsOpen(!isOpen)}
      />

      <div
        id="userDropdown"
        className={`z-10 ${isOpen? "":"hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-20 right-36 w-80`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{session.profile.data ? session.profile.data[0].name  : "Login"}</div>
          <div className="font-medium truncate">{session.user.data.session?.user.email ?? "Login"}</div>
        </div>
        <div className="py-1">
          <button
            onClick={singout}
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
