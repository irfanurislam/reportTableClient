
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
     
        <div className="p-6">
          <Outlet /> {/* Renders the child route components */}
        </div>
      
    </div>
  );
};

export default Main;
