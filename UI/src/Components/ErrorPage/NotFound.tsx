import Linkup from '../../assets/Linkup.svg'


const NotFoundPage = () => {
  return (
    
    <div className="bg-gray-100">
             <nav  className=  " z-10 bg-white border px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="" className="flex items-center">
            { <img
            src={Linkup}
            className="mr-3 h-6 sm:h-9"
            alt="LinkUp"
          />}               
            </a>
            <div className="flex items-center lg:order-2 ms-10">
                <a href="/register"  className="inline-flex items-center justify-center px-5 py-2 mr-3 text-xs font-medium text-center border rounded-lg text-green-600 hover:bg-gray-100 ">Sign Up</a>
        
            </div>
            <div  className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  
                    <li>
                        <a href="#" className="text-xs block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-green-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-green-600 dark:hover:bg-gray-700 dark:hover:text-green-600 lg:dark:hover:bg-transparent dark:border-gray-700">About</a>
                    </li>
         
                    <li>
                        <a href="#" className="text-xs block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-green-600 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                    </li>
                
                    <li>
                        <a href="#" className="text-xs block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-green-600  dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-8xl font-bold text-gray-800">404</h1>
        <p className="text-4xl font-medium text-gray-800">Page Not Found</p>
        <a href="/login" className="mt-4 text-xl text-green-500 hover:underline">Go back home</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
