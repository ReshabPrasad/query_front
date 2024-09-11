import { useLocation, useNavigate } from "react-router";
import HomeLayout from "../../Layout/HomeLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadquestions } from "../../Redux/Slices/QuestionSlice";
import { userlist } from "../../Redux/Slices/AuthSlice";
import { createanswer, loadanswers } from "../../Redux/Slices/AnswerSlice";
import toast from "react-hot-toast";

function CreateAnswer() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const questionId = params.get('question_id');
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const userstate = useSelector((state) => state.auth);
  const queState = useSelector((state) => state.ques);
  const dispatch = useDispatch();


  const [details,setDetails] = useState({
    user_id :  userstate.data._id,
    question_id : questionId,
    description : ""
  })

  useEffect(() => {
    if (!userstate.isLoggedIn) {
      navigate('/login');
      return;
    }
    dispatch(loadquestions());
    dispatch(userlist());
  }, [queState.ques]);

  useEffect(() => {
    if (queState.question.length > 0 && questionId) {
      const foundQuestion = queState.question.find((q) => q._id === questionId);
      if (foundQuestion) {
        setDescription(foundQuestion.description);
      }
    }
  }, [queState.question]);

  function changeAnwer(e){
    const {name,value} = e.target;
    setDetails({
        ...details,
        [name] : value
    })
  }

  async function submitAnswer(){
    console.log(details);
    const response = await dispatch(createanswer(details));
    console.log("response",response);
    if(response.payload){
        dispatch(loadanswers());
    }else{
        toast.error("Something went wrong Please try again")
    }
  }

  

  return (
    <HomeLayout>
      <div className="mt-20 flex justify-center">
        <div className="bg-[#024959] text-white w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Write an Answer</h2>
          
          {/* Question */}
          <div className="mb-6">
            <h3 className="text-gray-300 text-xl font-semibold text-[#]">{description || "Loading the description...."}</h3>
          </div>
          
          {/* Answer Input */}
          <textarea
            className="w-full h-48 p-4 bg-gray-200 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write your answer here..."
            name = "description" 
            value = {details.description}
            onChange = {changeAnwer}
          ></textarea>
          
          {/* Submit Button */}
          <div className="mt-6 text-right">
            <button onClick ={submitAnswer} className="bg-[#9FC131] text-white px-6 py-3 rounded-lg hover:bg-[#566526] transition duration-200 ease-in-out">
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CreateAnswer;
