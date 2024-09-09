import { useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { createquestion, loadquestions } from "../../Redux/Slices/QuestionSlice";
import { useNavigate } from "react-router";



function CreateQuestion() {

    const authState = useSelector((state) => state.auth);

     const [details,setdetails] = useState({
        user_id: authState.data?._id,
        title : "",
        description: ""
     })

     const navigate = useNavigate();

     const dispatch = useDispatch();

     function changeInput(e){
        const {name,value}= e.target;
        setdetails({...details,
            [name] : value 
        }
        )
     }

     function submitdetails(e){
       e.preventDefault();
       dispatch(createquestion(details));
       if(details){
        dispatch(loadquestions());
        navigate('/');
       }
       console.log(details);
     }

    return (
        <HomeLayout> 
                <div className="flex justify-center ">
                <form 
                    className="h-[75%] w-[35rem] border bg-[#003840] p-10 border-sky-500 rounded-lg hover:bg-sky-900 transition-all ease-in-out duration-300"
                >

                    <h1 className="text-3xl font-semibold text-white text-center">
                        Create question
                    </h1>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-white text-lg" >What is the title of the question?</span>
                        </label>
                        <input 
                        name = "title"
                        type="text" 
                        placeholder="Type here"
                        value = {details.title} 
                        onChange={changeInput}
                        className="input input-bordered input-primary w-full bg-white text-black" />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-white text-lg">Description of the question</span>
                        </label>
                        <textarea 
                            name = "description"
                            placeholder="Type here"
                            rows="8"
                            value = {details.description}
                            onChange={changeInput}
                            className="p-2 resize-none w-full rounded-md bg-white text-black" 
                        ></textarea>

                    </div>

                    <button onClick = {submitdetails} className="mt-4 w-full px-4 py-2 bg-green-500 text-lg font-semibold text-white rounded-md hover:bg-green-600 transition-all ease-in-out duration-300">
                        Submit
                    </button>

                </form>
                </div>
        </HomeLayout>
    );
}

export default CreateQuestion;