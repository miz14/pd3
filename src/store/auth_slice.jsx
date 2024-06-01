import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',

    initialState: {
        token: localStorage.getItem('token') || null,
        name: localStorage.getItem('name') || null,
        type: 'teacher', //localStorage.getItem('type') || null,
        id: localStorage.getItem('id') || null
    },
    reducers: {
        login(state, action) {
            if (action.payload.token != undefined) {
                state.token = action.payload.token
                localStorage.setItem('token', action.payload.token)
            }
            if (action.payload.name != undefined) {
                state.name = action.payload.name
                localStorage.setItem('name', action.payload.name)
            }
            if (action.payload.type != undefined) {
                state.type = action.payload.type
                localStorage.setItem('type', action.payload.type)
            }
            if (action.payload.id != undefined) {
                state.id = action.payload.id
                localStorage.setItem('id', action.payload.id)
            }
            console.log(
                {
                    token: state.token,
                    name: state.name,
                    id: state.id,
                    type: state.type
                }
            )
        },
        logout(state) {
            state.token = null
            state.name = null
            state.type = null
            state.id = null
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('type')
            localStorage.removeItem('id')
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer