import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../pages/supabaseclient";

function captiondashboard() {

  const navigate = useNavigate();
  const setUser = null;
  

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
    navigate("/getride"); 
  };

  return (
   <div className=" bg-amber-200 h-10 justify-center p-4 mx-0 max-w-screen"><br />
    
      <nav className="w-340 fiex shadow-sm ">
      
<button
        onClick={handleStart}
        className=" mb-2 w-40 items-center justify-between border-b shadow-sm mx-280 bg-gray-100 text-black px-10 py-2 rounded-2xl hover:bg-green-600 font-bold"
      >
        Start Now
      </button>
     
        

      
</nav>

<img src="https://media.istockphoto.com/id/1272498399/photo/car-dealer-is-selling-car-to-a-customer.jpg?s=1024x1024&w=is&k=20&c=717gqfX5DJpKBmWepuNDzz2cTekJk4jQcxBO2PZ9Y5Y=" className="object-cover" ></img>
      


    </div>
  );
}

export default captiondashboard
