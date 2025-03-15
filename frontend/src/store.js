import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from '@/pages/Projects/projectsSlice.js'

export default configureStore({
    reducer: {
        projects: projectsReducer,
    }
})