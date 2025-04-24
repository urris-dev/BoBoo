import { createSlice } from "@reduxjs/toolkit";

const baseApiURL = import.meta.env.VITE_BASE_API_URL;

const apiSlice = createSlice({
    name: "api",
    initialState: {
        authApiURL: new URL('api/users/', baseApiURL).href,
        projectsApiURL: new URL('api/projects/', baseApiURL).href,
        tasksApiURL: new URL('api/tasks/', baseApiURL).href,
    },
    reducers: {},
});

export default apiSlice.reducer;