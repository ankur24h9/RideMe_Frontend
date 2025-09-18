import { useState } from "react";
import { supabase } from "../pages/supabaseclient";

import { Link, useNavigate } from "react-router-dom";

export default function captionsignup() {
  const [email, setEmail] = useState("");
  const [name, setName]= useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [signupDone, setSignupDone] = useState(false);
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSignupDone(false);

    const { data, error } = await supabase.auth.signUp({
      email,
      name,
      password,
       
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email to confirm your account!");
      setSignupDone(true); 
    }
  };

const handleResend = async () => {
  setError("");
  setMessage("");

  const { error } = await supabase.auth.signUp({
    email,
    name,
    password,
  });

  if (error) {
    setError(error.message);
  } else {
    setMessage("Confirmation email resent. Check your inbox!");
  }
};


  return (
    <div>
    
      <div className=" opacity-0.6 bg-amber-300 rounded-2xl flex items-center justify-center mt-20 mx-115 my-2 py-5 md-18 ">
        <form
          onSubmit={handleSignup}
          className="bg-gray-100 p-8 rounded-4xl shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">New Caption Sign Up</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-600 mb-4">{message}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

 <input
            type="text"
            placeholder="Username (Optional)"
            className="w-full mb-4 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />



          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full  bg-gray-800 text-white p-2 rounded-2xl hover:bg-green-400 font medium"
          >
            Sign Up
          </button>

         
          {signupDone && (
            <button
              type="button"
              onClick={handleResend}
              className="w-full mt-3 bg-yellow-500 text-pink-700 p-2 rounded hover:bg-yellow-600"
            >
              Resend Confirmation Email
            </button>
          )}

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/captionlogin" className="text-blue-500 hover:underline font-medium">
              Log in
            </Link>
          </p>

          
          <p className="mt-4 text-center">
            Sign up as user ?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline font-medium">
              Sign Up
            </Link>
          </p>

           
        </form>
      </div>
    </div>
  );
}


