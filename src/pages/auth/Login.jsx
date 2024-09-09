import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


function Login(){
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userDetails,setuserDetails] = useState({
        email : "",
        password: ""
    })

    function onInputChange(e){
        const {name,value} = e.target;
        setuserDetails({
            ...userDetails,
            [name] : value
        })
    }

    function resetlogin(){
      setuserDetails({
        email : "",
        password: ""
      })
    }

    async function handleLogin(){
        if(!userDetails.email || !userDetails.password){
            toast.error("Details missing");return;
        }
        const response = await dispatch(login(userDetails));
        console.log("hello" , response);
        if(response.payload){
          navigate('/');
        }
        resetlogin();
    }


    return (
        <section className="bg-[#012030] flex flex-col items-center justify-center h-[100vh]">
  <div className="w-[80vw] bg-[#45c0c4] rounded-lg md:mt-0 sm:max-w-md xl:p-0">
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Login
      </h1>
      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input type="email"  name="email"  onChange={onInputChange} value = {userDetails.email} id="name"  className="text-white bg-[#012030] sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none" placeholder="Emelia Erickson" required=""/>
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input type="password"  name="password" onChange={onInputChange} value = {userDetails.password} id="password" placeholder="••••••••" className="bg-[#012030] text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none" required=""/>
        </div>
        <button type="submit" onClick = {handleLogin} className="font-bo w-full text-white  bg-[#012030] hover:bg-[#003840] transition-all ease-in-out rounded-lg text-sm px-5 py-2.5 text-center ">Login</button>
        <p className="text-sm font-light text-gray-900">
              Didn't have an account?{" "}
              <Link to="/signup" className="font-medium text-[#003840] hover:underline">
                Register here
              </Link>
            </p>
      </div>
    </div>
  </div>
</section>
    )
}

export default Login