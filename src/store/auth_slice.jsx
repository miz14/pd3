import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',

    initialState: {
        token: localStorage.getItem('token') || null,
        name: localStorage.getItem('name') || null,
        type: 'teacher'
    },
    reducers: {
        login(state, action) {
            state.token = action.payload.token
            state.name = action.payload.name
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('name', action.payload.name)
            console.log(["login", state.token, state.name])
        },
        logout(state) {
            state.token = null
            state.name = null
            console.log(["logout", state.token, state.name])
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer