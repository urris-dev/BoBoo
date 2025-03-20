import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
    fetchProjectsList, fetchProjectsTasks,
    selectProjectsStatus, selectProjectsTasks,
} from '@/pages/Projects/projectsSlice.js';

import ProjectsLayout from "@/layouts/ProjectsLayout/ProjectsLayout.jsx";
import Dashboard from "@/components/Dashboard/Dashboard.jsx";

import './Projects.scss'

export default function Projects() {
    const projectsStatus = useSelector(selectProjectsStatus)
    const projectsTasks = useSelector(selectProjectsTasks)
    const dispatch = useDispatch();

    useEffect(() => {
        if (projectsStatus === 'idle') {
            dispatch(fetchProjectsTasks());
            dispatch(fetchProjectsList());
        }
    }, [projectsStatus, dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={<ProjectsLayout />}>
                    <Route index element={<div>эбля</div>} />
                    <Route path=":id" element={<Dashboard tasksArray={projectsTasks}/>} />
                </Route>
            </Routes>

            {/*<div className="projects-container">*/}
            {/*    <div className="sidebar">*/}
            {/*        <ProjectsSidebar projectsList={projectsList} />*/}
            {/*    </div>*/}
            {/*    <div className="header">*/}
            {/*        <ProjectsHeader projectName={"Типа имя"} />*/}
            {/*    </div>*/}
            {/*    <Routes>*/}
            {/*        <Route path='/:id' element={<Dashboard tasks={projectsTasks}/>} />*/}
            {/*    </Routes>*/}
            {/*</div>*/}
        </>
    )
}