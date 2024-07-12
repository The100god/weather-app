import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth'

const Signup = (props) => {
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  // const [enter, setEnter] = useAtom(enterAtom)
  const {setEnter} = props
  const navigate = useNavigate()

  const handleSignup = async(e)=>{
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      setEnter(true)
      navigate("/")
      let enterToken = "iam" + signupEmail
      localStorage.setItem("enterToken", enterToken)
      // console.log("user Created!")
    } catch (error) {
      alert("user is already exist")
      navigate("/login")
    }
    
  }
  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh]">
      <div className="flex flex-col mt-[10%] items-center w-[100%] h-[100%]">
        <div className="flex justify-center items-center text-center font-semibold text-black text-[2.5rem] mb-8">Signup</div>
        <div className="flex flex-col justify-center items-center sm:w-[70%] lg:w-[40%] ">
        <form action="" className="flex flex-col justify-center items-center w-[100%] gap-3" onSubmit={handleSignup}>

          <input
            type="email"
            name="signupEmail"
            id="signupEmail"
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
            placeholder="Enter Email"
            onChange={(e)=>setSignupEmail(e.target.value)}
          />
          <input
            type="password"
            name="signupPassword"
            id="signupPassword"
            className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
            placeholder="Enter Password"
            onChange={(e)=>setSignupPassword(e.target.value)}
          />
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-black bg-gradient-to-b from-cyan-500 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-5">Signup</button>
        </form>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">or</div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            
              Already have account.{" "}
              <Link className="text-red-600 hover:underline hover:underline-offset-4" to="/login">
                {" "}
                Login
              </Link>{" "}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
