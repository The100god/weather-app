import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {signInWithEmailAndPassword} from 'firebase/auth'
// import { enterAtom } from "../../atom";
// import { useAtom } from "jotai";

const Login = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [enter, setEnter] = useAtom(enterAtom)
  
const { setEnter } = props
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("enterToken");
    if(token){

      navigate("/")
    }else{
      navigate("/login")

    }
    // eslint-disable-next-line 
  },[])

  const handleLogin = async(e)=>{
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setEnter(true)
      // console.log(enter)
      let enterToken = "iam" + email
      localStorage.setItem("enterToken", enterToken)
      navigate("/")
      
      // console.log("login succesfully");
    } catch (error) {
      alert("Please check your email and password. If you don't have account. please create one.")
      navigate("/signup")
    }
    
  }
  return (
    <div className=" flex flex-col justify-center items-center w-[100vw] h-[100vh]">
      <div className="flex flex-col mt-[10%] items-center w-[100%] h-[100%]">
        <div className="flex justify-center items-center text-center font-semibold text-black text-[2.5rem] mb-8">Login</div>
        <div className="flex flex-col justify-center items-center sm:w-[70%] lg:w-[40%] ">
          <form action="" className="flex flex-col justify-center items-center w-[100%] gap-3" onSubmit={handleLogin} >
            <input
              type="email"
              name="loginEmail"
              id="loginEmail"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
              placeholder="Enter Email"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <input
              type="password"
              name="loginPassword"
              id="loginPassword"
              className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
              placeholder="Enter Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-black bg-gradient-to-b from-cyan-500 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-5">Login</button>
          </form>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">or</div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            
              Don't have account.
              <Link className="text-red-600 hover:underline hover:underline-offset-4" to="/signup">
                {" "}
                Signup
              </Link>{" "}
    
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
