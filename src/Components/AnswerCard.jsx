import { BsThreeDotsVertical } from "react-icons/bs";
import { FaThumbsUp, FaRegThumbsUp, FaRegComment } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadanswers, updateAnswer } from "../Redux/Slices/AnswerSlice";
import { loadquestions } from "../Redux/Slices/QuestionSlice";

function Card({ answerId , userId, date, title, description, likes, comments }) {

    const userstate = useSelector((state) => state.auth);
    const [name ,setName] = useState("");
    const [like,setLike] = useState(false);
    const dispatch = useDispatch();
    const ansState = useSelector((state) => state.ans);
    const [open,setOpen]  =useState(false);
    useEffect(() => {
        userstate.users.map((user) => {
            if(user._id==userId){
                setName(user.name);
            }
        });
        ansState.answer.filter((ans) => (ans._id===answerId))[0].likes.map((userid) => {
            if(userid===userstate.data._id)setLike(true);
        })
    },[userstate.users,userId]);

    async function UpdateAnswer(){
        const response = await dispatch(updateAnswer({
            id: answerId,
            data: {
                user_id: userstate.data?._id
            }
        }
        ));
        if(response){
            dispatch(loadanswers());
            setLike(!like);
        }
    }

    function change(){
        setOpen(!open)
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
                            <h2 className="text-[#9FC131] cursor-pointer">Follow</h2>
                        </div>
                        <h2 className="text-sm text-gray-400">
                            {date?.split("T")[0].split("-").reverse().join("-")}
                        </h2>
                    </div>
                    <div className="relative inline-block text-left z-[0]">
                        <button className="inline-flex justify-center w-full shadow-sm px-4 py-2 focus:outline-none">
                            <BsThreeDotsVertical 
                            className="h-8 w-8 p-2 rounded-full hover:bg-gray-950"
                            onClick = {change} 
                            />
                        </button>
                        {open && <div
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 focus:outline-none z-10"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                        >
                            <div className="py-1" role="none">
                                        
                                        {(userId===userstate.data._id) && <h2
                                            className="block px-4 py-2 text-sm text-white hover:bg-gray-600 font-semibold"
                                            role="menuitem"
                                            tabIndex="-1" 
                                            //onClick = {deleteQue}
                                            >
                                            
                                        Delete 
                                        </h2>}
                                    </div> 
                        </div> }
                    </div> 
                </div>
            </div>

            <div className="w-full">
                <h5 className="mb-2 text-2xl font-semibold text-gray-300">
                    {title}
                </h5>
                <p className="text-gray-400 mb-3 break-words">{description}</p>
            </div>

            <div className="flex justify-between mt-4">
                <div className="flex items-center gap-4">
                    <div className="flex">
                    {like ? <FaThumbsUp
                        className="transition-transform transform hover:scale-125 cursor-pointer text-gray-300"
                        size={20}
                        onClick = {UpdateAnswer}
                    /> : <FaRegThumbsUp className="transition-transform transform hover:scale-125 cursor-pointer text-gray-300"
                    size={20}
                    onClick = {UpdateAnswer}/>}
                    <span className="ml-1">{ansState.answer.filter((answ) => answ._id===answerId)[0].likes?.length}</span> 
                        
                    </div>
                    <div className="flex items-center gap-2">
                        <FaRegComment size={20} className="text-gray-300" />
                        <span className="text-gray-400">{comments}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
