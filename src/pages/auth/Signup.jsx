import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    password: "",
    profession:"",
    about:""
  });

  // Handles input changes
  function onInputChange(e) {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  }

  function resetSignupdetails(){
    setUserDetails({
      email: "",
      name: "",
      password: "",
      profession:"",
      about:""
    })
  }

  // Handles form submission
  async function onFormSubmit(e) {
    e.preventDefault(); // Prevent form from refreshing the page
    if (!userDetails.name || !userDetails.email || !userDetails.password) {
      toast.error("Details missing");
      return;
    }
    console.log(userDetails);

    // Dispatch the signup action and handle the response manually
    const res = await dispatch(signup(userDetails));
    if(res.payload){
      navigate('/login');
    }
    resetSignupdetails();
  }

  return (
    <section className="bg-[#012030] flex flex-col items-center justify-center h-[100vh]">
      <div className="w-[80vw] bg-[#45C4B0] rounded-lg md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={onFormSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <input
                type="email"
                onChange={onInputChange}
                name="email"
                value={userDetails.email}
                className="text-white bg-[#012030] sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                placeholder="Your email here..."
                required
              />
            </div>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                Username
              </label>
              <input
                type="text"
                onChange={onInputChange}
                name="name"
                value={userDetails.name}
                className="text-white bg-[#012030] sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                placeholder="Username..."
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                onChange={onInputChange}
                name="password"
                value={userDetails.password}
                className="text-white bg-[#012030] sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                placeholder="Password..."
                required
              />
            </div>
            <div>
              <label htmlFor="profession" className="block mb-2 text-sm font-medium text-gray-900">
                Profession
              </label>
              <input
                type="text"
                onChange={onInputChange}
                name="profession"
                value={userDetails.profession}
                className="text-white bg-[#012030] sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                placeholder="Profession..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#012030] hover:bg-[#003840] transition-all ease-in-out rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-900">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-[#003840] hover:underline">
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
