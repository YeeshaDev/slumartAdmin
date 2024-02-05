import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";



function Layout() {
 // const location = useLocation();

  // Check if the current location is the registration route
 /* const hideNavbar =
    location.pathname === "/personal_details" ||
    location.pathname === "/email_verification" ||
    location.pathname === "/store_details" ||
    location.pathname === "/services_details" ||
    location.pathname === "/make_payment" ||
    location.pathname === "/domain_creation" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname.includes("services") ||
    location.pathname === "/services_info";*/

  return (
    
      <main className="relative flex">
       <Sidebar />
       <div className="w-2/3 ml-[250px] lg:ml-[280px] mb-10">
       <Outlet />
       </div>
      
        
      </main>
    
  );
}

export default Layout;