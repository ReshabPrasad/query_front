import { useEffect } from "react";
import UserCard from "../../Components/UserCard";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { loadquestions } from "../../Redux/Slices/QuestionSlice";
import { userlist } from "../../Redux/Slices/AuthSlice";


function Users(){

  const dispatch = useDispatch();
  const queState = useSelector((state) => state.ques);
  const userState = useSelector((state) => state.auth);

  useEffect(()=>{
    dispatch(loadquestions());
    dispatch(userlist());
    },[queState.ques])


    return (
      <HomeLayout>
        <div className="flex flex-col items-center mt-10">
          {userState.users.map((user,key) => {
            return (
              <UserCard key = {key} name = {user.name} profession = {user.profession} />
            )
          })}
        </div>
      </HomeLayout>
    )
}

export default Users