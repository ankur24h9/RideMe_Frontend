import { useState } from "react";
import { supabase } from "../pages/supabaseclient";
import { Link, useNavigate } from "react-router-dom";

 export default function captionlogin () {

     const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


   const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {

      navigate("/captiondashboard");


    }
  };
    const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setError(error.message);
      console.log("Server Error ");
    }
  };

  const handleResetPassword = async () => {
  if (!email) {
    setError("Please enter your email first.");
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/update-password",
  });

  if (error) {
    setError(error.message);
  } else {
    alert("Password reset link sent to your email.");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen mx-20 opacity-0.4">
      <div className="bg-amber-300  p-4 rounded-4xl opacity-0.9">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8  shadow-md w-full max-w-sm opacity-0.4 rounded-4xl"
          method="POST">
        <h2 className="text-2xl font-bold mb-6 text-center">Caption Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Enter Email/Username"
          className="w-full mb-4 p-2 border rounded  bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border rounded  bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className=" font-bold w-full bg-gray-800 text-white p-2 rounded hover:bg-green-400"
        >
          Login
        </button>
         <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-4 font-bold w-full bg-gray-800 text-white p-2 rounded hover:bg-green-400"
        >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={handleResetPassword}
            className="mt-2 font-medium text-blue-500  mx-20 rounded cursor-pointer"
        
          >
            Forgot Password
          </button>
        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/captionsignup" className="  text-blue-600 px-2 rounded hover:underline font-medium">
            Sign up
          </Link>
        </p>
        
         
    
        
      </form>
      
      </div>
    </div>
  )
}


