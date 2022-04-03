import { configureStore } from '@reduxjs/toolkit';
import GetUsers from '../reducer/getUser/getUserReducer';

export default configureStore({
    reducer: {
        GetUsers
    }
})