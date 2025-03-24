import { configureStore } from '@reduxjs/toolkit'

import userDataReducer from "@/store/userDataSlice.js";
import authReducer from "@/store/authSlice.js";
import projectsReducer from '@/store/projectsSlice.js'

export default configureStore({
    reducer: {
        userData: userDataReducer,
        auth: authReducer,
        projects: projectsReducer,
    }
})