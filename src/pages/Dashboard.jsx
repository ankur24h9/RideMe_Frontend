
import { useState, useEffect } from "react";
import { supabase } from "../pages/supabaseclient";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const [user, setUser] = useState(null);

  
    const navigate = useNavigate();
    

  return (
  
     
    <div className="bg-white text-center min-h-screen">
      <nav className="w-340 flex items-center justify-between px-6 py-4 border-b shadow-sm">
        <div className="text-2xl font-bold">RideXperts</div>
     
        <div className="flex space-x-4 cursor">
        
          <button className="text-gray-700 px-4 py-2 cursor-pointer rounded-full hover:bg-green-400 "
          onClick={() => navigate("/login")}>Log in</button>
          <button className=" text-grey-700 px-4 py-2 rounded-full hover:bg-green-400 cursor-pointer" 
          onClick={()=> navigate("/signup")}>Sign up</button>
        </div>
  
      </nav>
     
<img src="https://ridexperts.com/wp-content/uploads/2024/09/RideXperts-Tata-Nexon-EV.jpg" className="h-145 w-1000" ></img>
     

    </div>


   


  );
}

