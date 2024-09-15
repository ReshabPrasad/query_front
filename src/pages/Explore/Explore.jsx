import { RiAddCircleFill } from "react-icons/ri";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { loadquestions } from "../../Redux/Slices/QuestionSlice";
import { userlist } from "../../Redux/Slices/AuthSlice";

function Explore() {
    const userState = useSelector((state) => state.auth); 
    const [followArray, setFollowArray] = useState([]);
    const [questions, setQuestions] = useState([]); 
    const queState = useSelector((state) => state.ques);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userState.data && userState.users) {
            const currentUser = userState.users.find(user => user._id === userState.data._id);
            if (currentUser) {
                setFollowArray(currentUser.following);
            }
        }
    }, [userState.users.length]);

    useEffect(() => {
        if (followArray.length > 0 && queState.question) {
            followArray.forEach((id) => {
                queState.question.forEach((que) => {
                    if (que.userId === id) {
                        setQuestions(prevQuestions => [...prevQuestions, que]); 
                    }
                });
            });
        }
    }, [followArray.length]);


    async function loadU(){
        const res =  await dispatch(userlist());
    }


    async function loadQ(){
        const res = await dispatch(loadquestions());
    }

    useEffect(() => {
        loadQ();
        loadU();
    },[userState.users.length]);




    return (
        <HomeLayout>
            <div className="flex justify-center mt-10">
                <div className="flex flex-col ">
                    {questions.map((ques, key) => (
                        <Card 
                            key={key} 
                            userId={ques.userId} 
                            title={ques.title} 
                            description={ques.description} 
                            date={ques.createdAt} 
                            questionId={ques._id} 
                            likes={ques.likes} 
                        />
                    ))}
                </div>
            </div>
            <div className="fixed right-10 bottom-10">
                <RiAddCircleFill className="h-16 w-16 hover:cursor-pointer hover:opacity-50 ease-in-out text-[#3CA6A6]" />
            </div>
        </HomeLayout>
    );
}

export default Explore;
