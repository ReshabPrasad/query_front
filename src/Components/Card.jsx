import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike, AiOutlinePlus } from "react-icons/ai"; 
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { deleteQuestion, loadquestions, updateQuestion } from "../Redux/Slices/QuestionSlice";
import { BsThreeDotsVertical } from "react-icons/bs";

function Card({ userId, title, description, date, questionId ,likes }) {
    const [name, setName] = useState("");
    const userstate = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const queState  = useSelector((state) => state.ques);
    const dispatch = useDispatch();
    const [like,setLike] = useState(false);
    const [open,setOpen] = useState(false);
    const [follow,setFollow] = useState(true);

    useEffect(() =>{
        userstate.users.forEach((user) => {
            if (user._id === userId) {
                setName(user.name);
            }
        });
         queState.question.filter((ques) => ques._id===questionId)[0].likes.map((userid) => {
            if(userid==userstate.data._id){
                setLike(true);
            }
         })
         if(userId===userstate.data._id){
            setFollow(false);
         }
    }, [userstate.users, userId]);


    function createanswer(){
        navigate(`/Createanswer?question_id=${questionId}`)
    }

    async function UpdateQuestion(){
        const response = await dispatch(updateQuestion({
            id: questionId,
            data: {
                user_id: userstate.data?._id
            }
        }
        ));
        if(response){
            setLike(!like)
            dispatch(loadquestions());
        }
    }

    function change(){
        setOpen(!open)
    }
    
    async function deleteQue(){
        const response = await dispatch(deleteQuestion(questionId));
        if(response){
            dispatch(loadquestions());
        }
        setOpen(!open)
    }

    function ShowAnswer(){
        navigate(`/answer/?question_id=${questionId}`)
    }

    return (
        <div className="w-[35rem] p-6 my-2 break-inside hover:shadow-2xl bg-[#176a7d] rounded-lg shadow">
            <div className="flex gap-3">
                <img
                    className="h-14 rounded-full"
                    src="https://cdn5.vectorstock.com/i/1000x1000/43/04/avatar-social-media-isolated-icon-design-vector-10704304.jpg"
                    alt="User Avatar"
                />
                <div className="flex justify-between w-full">
                    <div>
                        <div className="flex gap-2 items-center">
                            <h1 className="text-lg font-semibold">{name}</h1>
                            {follow && <h2 
                            className="text-[#9FC131] cursor-pointer"
                            onClick={follow}
                            >Follow</h2>}
                        </div>
                        <h2 className="text-sm text-gray-400">{date?.split('T')[0].split('-').reverse().join("-")}</h2>
                    </div>
                    <div className="relative inline-block text-left z-[0]" >
                            <div>
                                <button
                                className="inline-flex justify-center w-full shadow-sm px-4 py-2 focus:outline-none"
                                >
                                <BsThreeDotsVertical onClick = {change}  className="h-8 w-8 p-2 rounded-full hover:bg-gray-950" />
                                </button>
                            </div>

                                {open && <div
                                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 focus:outline-none z-10"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex="-1"
                                >
                                    <div className="py-1" role="none">
                                        <h2
                                            className="block px-4 py-2 text-sm text-white hover:bg-gray-700 font-semibold hover:cursor-pointer"
                                            role="menuitem"
                                            tabIndex="-1"
                                            onClick={ShowAnswer}
                                        >
                                        View Answers
                                        </h2>
                                        
                                        {(userId===userstate.data._id) && <h2
                                            className="block px-4 py-2 text-sm text-white hover:bg-gray-600 font-semibold"
                                            role="menuitem"
                                            tabIndex="-1" 
                                            onClick = {deleteQue}
                                            >
                                            
                                        Delete 
                                        </h2>}
                                    </div>
                                </div>
                            } 
                            
                        </div>
                </div>
            </div>
            <div className="w-full">
                <h5 className="mb-2 text-2xl font-semibold text-gray-300">{title}</h5>
                <p className="text-gray-400 mb-3 break-words">{description}</p>
            </div>
            <div className="flex justify-between mt-4">
                <div className="flex items-center gap-4">
                    <div className="flex">
                    {like ? <FaThumbsUp
                        className="transition-transform transform hover:scale-125 cursor-pointer text-gray-300"
                        size={20}
                        onClick = {UpdateQuestion}
                    /> : <FaRegThumbsUp className="transition-transform transform hover:scale-125 cursor-pointer text-gray-300"
                    size={20}
                    onClick = {UpdateQuestion}/>}

                    <span className="ml-1">{queState.question.filter((ques) => ques._id===questionId)[0].likes?.length}</span> {/* Example number of likes */}
                    </div>
                    <div className="flex items-center gap-2">
                    <FaRegComment size={20} className="text-gray-300" />
                    <span className="text-gray-400">2</span> {/* Example number of comments */}
                </div>
                </div>
                <button className="bg-[#035C6E] text-white py-1 px-3 rounded-lg hover:bg-[#0487A7] transition-colors flex items-center gap-1">
                    <AiOutlinePlus size={20} />
                    <span className="ml-1" onClick={createanswer}>
                        Add Answer
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Card;
