import { useDispatch, useSelector } from "react-redux";
import AnswerCard from "../../Components/AnswerCard";
import HomeLayout from "../../Layout/HomeLayout";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { loadanswers } from "../../Redux/Slices/AnswerSlice";

function ShowAnswer() {
    const answerState = useSelector((state) => state.ans);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('question_id');
    const dispatch = useDispatch();
    const [answers, setAnswers] = useState([]);

    // Load all answers when the component mounts
    async function load() {
        await dispatch(loadanswers());
    }

    useEffect(() => {
        load();
    }, [id]);

    // Filter answers based on the question ID
    useEffect(() => {
        const filteredAnswers = answerState.answer.filter((ans) => ans.questionId === id);
        setAnswers(filteredAnswers);
    }, [answerState.answer, id]);

    return (
        <HomeLayout>
            <div className="flex justify-center mt-10">
                <div className="flex flex-col">
                { answers.length > 0 ? (
                    answers.map((answ, key) => (
                        <AnswerCard
                            key={key}
                            userId={answ.userId}
                            title={answ.title}
                            description={answ.description}
                            likes={answ.likes}
                            answerId = {answ._id}
                        />
                    ))
                ) : (
                    <p>No answers available</p>
                )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default ShowAnswer;
