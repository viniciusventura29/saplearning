import logo from "../assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow border-t px-8">
      <div className="w-full mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            target="_blank"
            href=""
            className="flex items-center mb-4 sm:mb-0"
          >
            <img src={logo} className="h-16 mr-3" alt="Flowbite Logo" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <a
                target="_blank"
                href=""
                className="mr-4 hover:underline md:mr-6 "
              >
                About
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href=""
                className="mr-4 hover:underline md:mr-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href=""
                className="hover:underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Monkeydevs
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
