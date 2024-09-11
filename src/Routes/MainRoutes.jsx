import { Route, Routes } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import CreateQuestion from "../pages/Questions/CreateQuestion";
import User from '../pages/Users/Users'
import CreateAnswer from "../pages/Answer/CreateAnswer";

function MainRoutes(){
    return(
        <Routes>
            <Route path ='/signup' element = {<Signup/>}/>
            <Route path ='/login' element = {<Login/>}/>
            <Route path ='/' element = {<Home/>}/>
            <Route path ='/profile' element = {<Profile/>}/>
            <Route path ='/question' element = {<CreateQuestion/>}/>
            <Route path ='/users' element = {<User/>}/>
            <Route path ='/answer' element = {<CreateAnswer/>}/>
        </Routes>
    )
}

export default MainRoutes;


