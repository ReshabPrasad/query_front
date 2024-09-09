// src/pages/Home.js

import { useDispatch, useSelector } from "react-redux";
import Card from "../../Components/Card";
import HomeLayout from "../../Layout/HomeLayout";
import { loadquestions } from "../../Redux/Slices/QuestionSlice";
import { userlist } from "../../Redux/Slices/AuthSlice";
import { useEffect } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router";

function Home() {
   const dispatch = useDispatch();
   const queState = useSelector((state)=> state.ques);
   const userstate = useSelector((state) => state.auth);
   const navigate = useNavigate();

   useEffect(()=>{
   dispatch(loadquestions());
   dispatch(userlist());
   },[queState.ques])

    
   function create(){
    navigate('/question')
   }
  return (
        <HomeLayout>
          <div className="flex justify-center mt-10">
        <div className="flex flex-col ">
       {queState.question.map((question,key) => {
         return (<Card key={key} userId = {question.userId} title = {question.title} description = {question.description} date = {question.createdAt} questionId = {question._id}/>)
       })}
       </div>
       </div>
       <div className="fixed right-10 bottom-10">
        <RiAddCircleFill className="h-16 w-16 hover:cursor-pointer hover:opacity-50 ease-in-out text-[#3CA6A6]" onClick = {create}/>
       </div>
       </HomeLayout>
  );
}

export default Home;
