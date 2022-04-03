import { createSlice } from '@reduxjs/toolkit';
import request from "../../config/request";

//-------------------------> REDUCER <-------------------------

const slice = createSlice({
    name: 'Users',
    initialState: {
        allUsers: [],
        thisUser: ''
    },
    reducers:{
        GetAllUsers:(state, action) => {
            state.allUsers = action.payload;
            let email = localStorage.getItem('email');
            state.allUsers.map(item => {
                if (item.email === email) {
                    state.thisUser = item
                }
            });
        },
        oneUser: (state, action) => {

        }
    }
});

//-------------------------> ACTIONS <-------------------------

export function GetUsers() {
    return (dispatch)=> {
        request.call('users').then(res => {
            dispatch({
                type: GetAllUsers.type,
                payload: res
            })
        })
    }
}

export function getOneUser(data) {
    return (dispatch)=> {
        dispatch({
            type: oneUser.type,
            payload: data
        })
    }
}


export const {GetAllUsers, oneUser} = slice.actions;
export default slice.reducer