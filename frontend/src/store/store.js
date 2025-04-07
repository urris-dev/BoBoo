import { configureStore } from '@reduxjs/toolkit'

import apiReducer from "@/store/apiSlice.js";
import userDataReducer from "@/store/userDataSlice.js";
import authReducer from "@/store/authSlice.js";
import projectsReducer from '@/store/projectsSlice.js'

export default configureStore({
    reducer: {
        api: apiReducer,
        userData: userDataReducer,
        auth: authReducer,
        projects: projectsReducer,
    }
})