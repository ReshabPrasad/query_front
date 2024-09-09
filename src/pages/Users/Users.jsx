import UserCard from "../../Components/UserCard";
import HomeLayout from "../../Layout/HomeLayout";


function Users(){
    return (
      <HomeLayout>
        <div className="flex justify-center">
            <UserCard/>
        </div>
      </HomeLayout>
    )
}

export default Users