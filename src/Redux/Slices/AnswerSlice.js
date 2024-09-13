import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";



const initialState = {
    answer : []
}


export const createanswer = createAsyncThunk('answer',async(data)=> {
    try {
        console.log(data);
        const details = await axiosInstance.post('answer',data,{
            headers : {
                'x-access-token' : localStorage.getItem('token')
            }
        })
        console.log("hii",details);
        if(details){
            toast.success("Successfully created the answer");
            return details;
        }
        console.log(details);
    } catch (error) {
        console.log(error);
    }
})

export const loadanswers = createAsyncThunk('.answer', async (data) => {
    try {
        const details = await axiosInstance.get('answer', 
            {
                headers : {
                    'x-access-token' : localStorage.getItem('token')
                }
            }
        )
        console.log(details);
        if(!details)
        toast.error("No answers available");
        return details;
    } catch (error) {
        console.error(error);
        return undefined;
    }
});


export const updateAnswer = createAsyncThunk('update' , async({id , data}) => {
    try {
        console.log("hello " ,id,data)
        const details  = await axiosInstance.put(`/answer/${id}`,data ,{
            headers : {
                'x-access-token' : localStorage.getItem('token')
            }
        })
        if(details){
            console.log(details);
            return details;
        }
    } catch (error) {
        console.log(error);
    }
})





const answerSlice = createSlice({
    name: 'ans',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadanswers.fulfilled, (state, action) => {
            console.log("action",action);
            state.answer = action.payload.data.answers
        });
    }
});

export default answerSlice.reducer
