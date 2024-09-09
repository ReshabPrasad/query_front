import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    data: JSON.parse(localStorage.getItem("data")) || undefined,
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    users : []
};

export const signup = createAsyncThunk('auth/signup', async (data) => {
    try {
        const details = await axiosInstance.post('auth/signup', data);
        console.log(details);
        if (!details.data?.userdata) {
            toast.error("Something went wrong. Please try again");
            return undefined;
        }
        toast.success("Signup completed");
        return details;
    } catch (error) {
        console.error(error);
        toast.error("Signup failed");
        return undefined;
    }
});

export const login = createAsyncThunk('auth/login', async (data) => {
    try {
        const details = await axiosInstance.post('auth/signin', data);
        if (!details.data?.userdata) {
            toast.error("Something went wrong. Please try again");
            return undefined;
        }
        toast.success("Login completed");
        return details;
    } catch (error) {
        console.error(error);
        toast.error("Login failed");
        return undefined;
    }
});

export const userlist = createAsyncThunk('/auth',async() => {
    try {
        const users = await axiosInstance.get('/auth');
        if(!users){
            toast.error("Something went wrong");
            return;
        }
        if(users) //toast.success("Loaded all users");
        return users;
    } catch (error) {
        toast.error("Internal Server Error");
        return undefined;
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (!action.payload) return;
            state.data = action.payload.data.userdata;
            state.token = action.payload.data.token;
            state.isLoggedIn = true;
            localStorage.setItem("data", JSON.stringify(action.payload.data.userdata));
            localStorage.setItem("token", action.payload.data.token);
            localStorage.setItem("isLoggedIn", true);
        });
        builder.addCase(userlist.fulfilled, (state, action) => {
            if(!action.payload)return ;
            state.users = action.payload.data.users;
        });
    }
});

export default authSlice.reducer;
