import { Outlet } from "react-router-dom";
import Header1 from "./Components/Header1";
import Profile from "./Components/Profile/Profile";
import FilterProvider from "./utils/context/JobFilterData/FilterProvider";

function App() {
  return (
    <>
      <FilterProvider>
        <div>
          <Header1 />
          <div className="home-main">
            <div className="hidden lg:block home-section-1" id="mobile-menu-2">
              <Profile />
            </div>
            <Outlet />
          </div>
        </div>
      </FilterProvider>
    </>
  );
}

export default App;