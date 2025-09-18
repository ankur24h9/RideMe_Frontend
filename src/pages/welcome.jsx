import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../pages/supabaseclient";


export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  

  useEffect(() => {
   
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        navigate("/Dashboard");
      }
    };
    getUser();
  }, [navigate]);

  const handleStart = async () => {
    await supabase.auth.signOut();
    navigate("/Home"); 
  };

  return (
    
    <div className=" bg-amber-200 h-170 justify-center p-4 mx-0"><br />
    
      <nav className="w-340 fiex shadow-sm ">
      <h3 className="text-2xl font-bold text-center mb-4 mx-20 text-violet-700">
         Congrats,You are successfully logged in
        
      </h3>

     
        
{user && (
        <p className="text-lg mb-4 text-violet-800 font-semibold justify-center text-center">
         
          Logged in as: {user.email}
        </p>
      )}

      
</nav>

<img src="https://www.webdevelopmentindia.biz/wp-content/uploads/2024/09/uber-clone-banner.webp" className="max-h-full" ></img>
      

<button
        onClick={handleStart}
        className=" rounded-full w-40 items-center justify-between border-b shadow-sm mx-280 bg-gray-100 text-black px-10 py-2 rounded hover:bg-green-600 font-bold"
      >
        Start Now
      </button>
    </div>
  );
}
