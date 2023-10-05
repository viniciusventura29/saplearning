import BoschLogo from '../assets/Bosch_logo.svg'

export const Footer = ()=>{
    return(
        
<footer className="bg-white rounded-lg shadow border-t dark:bg-gray-900 px-8">
    <div className="w-full mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a target='_blank' href="https://www.bosch.com/" className="flex items-center mb-4 sm:mb-0">
                <img src={BoschLogo} className="h-16 mr-3" alt="Flowbite Logo" />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a target='_blank' href="https://www.bosch.com/company/" className="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a target='_blank' href="https://www.bosch.com/" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a target='_blank' href="https://www.bosch.com/contact/" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Bosch</a>. All Rights Reserved.</span>
    </div>
</footer>


    )
}