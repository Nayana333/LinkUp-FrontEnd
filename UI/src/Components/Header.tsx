
import { useLocation, useNavigate } from 'react-router-dom';
import Linkup from '../assets/Linkup.svg'

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path:any) => location.pathname === path;

  return (
   
    <div>
      <nav className="z-10 bg-white border px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        { <img
            src={Linkup}
            className="mr-3 h-6 sm:h-9"
            alt="CircleUp logo"
          /> }
          <div className="flex items-center lg:order-2 ms-10">
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center justify-center px-5 py-2 mr-3 text-xs font-medium text-center border rounded-lg text-green-600 hover:bg-gray-100"
            >
              Sign Up
            </button>
          </div>
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <button
                  onClick={() => navigate('#')}
                  className={`text-xs block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 dark:border-gray-700 ${
                    isActive('/about-us')
                      ? 'text-green-500'
                      : 'text-gray-700 dark:text-gray-400 lg:hover:text-green-700 lg:dark:hover:text-green-600'
                  }`}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('#')}
                  className={`text-xs block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 dark:border-gray-700 ${
                    isActive('/features')
                      ? 'text-green-500'
                      : 'text-gray-700 dark:text-gray-400 lg:hover:text-green-700 lg:dark:hover:text-green-600'
                  }`}
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('#')}
                  className={`text-xs block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 dark:border-gray-700 ${
                    isActive('/contact-us')
                      ? 'text-green-500'
                      : 'text-gray-700 dark:text-gray-400 lg:hover:text-green-700 lg:dark:hover:text-green-600'
                  }`}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;