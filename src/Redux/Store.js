import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from '../Redux/Slices/AuthSlice';
import questionliceReducer from '../Redux/Slices/QuestionSlice'


const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        ques:questionliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export default store;