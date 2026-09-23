import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/auth_service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../../core/hooks/user";

function Login() {
  let context=useContext(userContext)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate()

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    console.log("Login Data:", formData);

    try {
      let userdata = ({
        email: formData.email,
        password: formData.password
      })
      let data =await login(userdata)
      console.log("UserData:", data)
      if (data.status == "success") {
      //   //home
      //token 
      // home api token 
      let {_id,name,email}=data.user
      let userData={_id,name,email}
      console.log('userdata ', data)
      // token  localStorage
      localStorage.setItem('token',data.token)
      localStorage.setItem('user',JSON.stringify(data.user))
      context.setUser(data.user)
      

if(data.user.usertype==="user"){
  navigate('/')
}else{
  navigate('/adminhome')
}
    
      }else{
        toast(data.status)
      }
      

    } catch (e) {
      console.log(e)
      toast("error  :",e )
    }
    // API call can go here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Login to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </button>
            </div>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />

            <label
              htmlFor="remember"
              className="ml-2 text-sm text-gray-600"
            >
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">

            Sign up

          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;