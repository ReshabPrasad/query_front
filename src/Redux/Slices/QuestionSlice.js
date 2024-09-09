import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";



const initialState = {
    question : []
}

export const loadquestions = createAsyncThunk('.question', async (data) => {
    try {
        const details = await axiosInstance.get('question', 
            {
                headers : {
                    'x-access-token' : localStorage.getItem('token')
                }
            }
        )
        console.log(details);
        if(details)
        //toast.success("Questions loaded");
        return details;
    } catch (error) {
        console.error(error);
        toast.error("Server error");
        return undefined;
    }
});

export const createquestion  = createAsyncThunk('question',async(data)=> {
    try {
        const details = await axiosInstance.post('/question',data,{
            headers : {
                'x-access-token' : localStorage.getItem('token')
            }
        })
        if(details){
            toast.success("Successfully created the question")
        }
        console.log(details);
    } catch (error) {
        console.log(error);
    }
})

const questionSlice = createSlice({
    name: 'ques',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadquestions.fulfilled, (state, action) => {
            console.log("Hello");
            state.question = action.payload.data.questions.reverse();
        });
    }
});

export default questionSlice.reducer
