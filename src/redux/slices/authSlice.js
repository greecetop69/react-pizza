import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


export const fetchAuth = createAsyncThunk("fetchAuth", async (params) => {
    const { data } = await axios.post('https://dummyjson.com/auth/login', params);
    return data
})

const initialState = {
    // Тут к примеру можно поставить поле isAuth: false и от него чекать зареган или нет.
    // может в будущем понадобится а то по токенку проверять такое себе думаю
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username')
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        logout(state) {
            state.token = null
            state.username = null

            localStorage.removeItem("token");
            localStorage.removeItem("username");
        }
    },
    extraReducers: {
        [fetchAuth.fulfilled]: (state, action) => {
            state.token = action.payload.token
            state.username = action.payload.username

            localStorage.setItem("token", state.token);
            localStorage.setItem("username", state.username);
        },
    }

}
)
export const { logout } = authSlice.actions
export const authSliceReducer = authSlice.reducer
export const selectIsAuth = (state) => Boolean(state.auth.token)