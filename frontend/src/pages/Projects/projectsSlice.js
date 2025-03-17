import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    status: 'idle',
    projectsList: [],
    projectsTasks: {}
}

export const fetchProjectsList = createAsyncThunk('projects/fetchProjectsList', async () => {
    const resp = await fetch('http://localhost:3000/projects');
    return await resp.json();
})

export const fetchProjectsTasks = createAsyncThunk('projects/fetchProjectsTasks', async () => {
    const resp = await fetch('http://localhost:3000/projects-tasks');
    return await resp.json();
})

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
                state.projectsTasks = {...action.payload};
            })
            // .addCase(fetchProjectsList.pending, (state, action) => {
            //     state.status = 'pending'
            // })
            // .addCase(fetchProjectsList.rejected, (state, action) => {
            //     state.status = 'failed'
            // })
    }
})

export default projectSlice.reducer