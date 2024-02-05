import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { GoProject } from "react-icons/go";
import { BsCalendarEvent } from "react-icons/bs";
import { FaArtstation } from "react-icons/fa";
export default function Sidebar() {
    return (
      <div className="flex fixed h-screen w-1/3">
    {/* sidebar */}
    <div className=" md:flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white font-bold uppercase">Sidebar</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-800">
        <Link to='/'>
          <li href="#" className="flex items-center gap-x-3 px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
           
           <FaPen />
           Upload Art Works
          
          </li>
          </Link>
          <Link to='/upload_projects'>
          <li href="#" className="flex items-center gap-x-3 px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
           
          <GoProject />
           Projects
          Upload 
          </li>
          </Link>

          <Link to='/artworks'>
          <li href="#" className="flex items-center gap-x-3 px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
           
          <FaArtstation />
          All Arts
          
          </li>
          </Link>

          <Link to='/events'>
          <li href="#" className="flex items-center gap-x-3 px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
           
          <BsCalendarEvent />
          All Events
          
          </li>
          </Link>
          
        </nav>
      </div>
    </div>
    
  </div>
  
    )
  }
  