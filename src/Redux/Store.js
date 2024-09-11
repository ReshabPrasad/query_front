import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from '../Redux/Slices/AuthSlice';
import questionsliceReducer from '../Redux/Slices/QuestionSlice'
import answersliceReducer from '../Redux/Slices/AnswerSlice'


const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        ques:questionsliceReducer,
        ans:answersliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export default store;