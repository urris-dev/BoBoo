import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {

    },
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