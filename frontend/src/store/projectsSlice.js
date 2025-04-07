import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import store from "@/store/store.js";

const initialState = {
    status: 'idle',
    projectsList: [],
    projectsTasks: []
}

export const fetchProjectsList = createAsyncThunk(
    'projects/fetchProjectsList',
    async () => {
        const resp = await fetch('http://localhost:3000/projects');
        return await resp.json();
    }
)

export const fetchProjectsTasks = createAsyncThunk(
    'projects/fetchProjectsTasks',
    async () => {
        const resp = await fetch('http://localhost:3000/projects-tasks');
        return await resp.json();
    },
    {
        condition(arg, thunkApi) {
            const { projects } = thunkApi.getState()
            const projectsStatus = projects.status
            if (projectsStatus !== 'idle') {
                return false
            }
        }
    }
)

export const createProject = createAsyncThunk(
    'projects/createProject',
    async ({ projectName }) => {
        const state = store.getState();
        const apiData = state.api;

        return fetch(new URL('create-project', apiData.projectsApiURL).href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: projectName,
            }),
            credentials: "same-origin",
        });
    },
);

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProjectsList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projectsList.push(...action.payload);
            })
            .addCase(fetchProjectsTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projectsTasks.push(...action.payload);
            })
    }
})

export default projectSlice.reducer
export const selectProjectsStatus = (state) => state.projects.status
export const selectProjectsList = (state) => state.projects.projectsList
export const selectProjectsTasks = (state) => state.projects.projectsTasks