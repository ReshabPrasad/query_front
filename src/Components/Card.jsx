import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike, AiOutlinePlus } from "react-icons/ai"; // Like and Add icons
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"; // Comment icon
import { Link, useNavigate } from "react-router-dom";
import { loadquestions, updateQuestion } from "../Redux/Slices/QuestionSlice";

function Card({ userId, title, description, date, questionId ,likes }) {
    const [name, setName] = useState("");
    const userstate = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const queState  = useSelector((state) => state.ques);
    const dispatch = useDispatch();
    const [like,setLike] = useState(false);

    useEffect(() => {
        // Get user name based on userId
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
    }, [userstate.users, userId]);


    function createanswer(){
        navigate(`/answer?question_id=${questionId}`)
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

    return (
        <div className="w-[35rem] p-6 my-2 break-inside hover:shadow-2xl bg-[#176a7d] rounded-lg shadow">
            <div className="flex gap-3">
                <img
                    className="h-14 rounded-full"
                    src="https://cdn5.vectorstock.com/i/1000x1000/43/04/avatar-social-media-isolated-icon-design-vector-10704304.jpg"
                    alt="User Avatar"
                />
                <div>
                    <div className="flex gap-2 items-center">
                        <h1 className="text-lg font-semibold">{name}</h1>
                        <h2 className="text-[#9FC131] cursor-pointer">Follow</h2>
                    </div>
                    <h2 className="text-sm text-gray-400">{date?.split('T')[0].split('-').reverse().join("-")}</h2>
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
