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
        if(!details)
        toast.error("No questions available");
        return details;
    } catch (error) {
        console.error(error);
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

export const updateQuestion = createAsyncThunk('update' , async({id , data}) => {
    try {
        console.log('Sai', data)
        const details  = await axiosInstance.put(`/question/${id}` ,data ,{
            headers : {
                'x-access-token' : localStorage.getItem('token')
            }
        })
        if(details){
            console.log(details);
            return details;
        }
    } catch (error) {
        console.log('Dealer', error);
    }
})

export const deleteQuestion = createAsyncThunk('delete' , async(id) => {
    try {
        console.log("id",id);
        const response = await axiosInstance.delete(`/question/${id}`,{
            headers : {
                'x-access-token' : localStorage.getItem('token')
            }
        })
        console.log("response",response);
        if(response){
            toast.success("Succesfully deleted the question");
            return response;
        }
        toast.error("Something went wrong Pls try again")
    } catch (error) {
        console,log(error);
    }
})

const questionSlice = createSlice({
    name: 'ques',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadquestions.fulfilled, (state, action) => {
            console.log("Hello");
            state.question = action.payload?.data?.questions.reverse();
        });
    }
});

export default questionSlice.reducer
