import { Route, Routes } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import CreateQuestion from "../pages/Questions/CreateQuestion";
import User from '../pages/Users/Users'
import CreateAnswer from "../pages/Answer/CreateAnswer";
import ShowAnswer from "../pages/Answer/ShowAnswer";
import Explore from "../pages/Explore/Explore";

function MainRoutes(){
    return(
        <Routes>
            <Route path ='/signup' element = {<Signup/>}/>
            <Route path ='/login' element = {<Login/>}/>
            <Route path ='/' element = {<Home/>}/>
            <Route path ='/profile' element = {<Profile/>}/>
            <Route path ='/Createquestion' element = {<CreateQuestion/>}/>
            <Route path ='/users' element = {<User/>}/>
            <Route path ='/Createanswer' element = {<CreateAnswer/>}/>
            <Route path ='/answer' element = {<ShowAnswer/>}/>
            <Route path ='/explore' element = {<Explore/>}/>
        </Routes>
    )
}

export default MainRoutes;


