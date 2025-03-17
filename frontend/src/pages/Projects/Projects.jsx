import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchProjectsList, fetchProjectsTasks } from '@/pages/Projects/projectsSlice.js'

import Dashboard from "@/components/Dashboard/Dashboard.jsx";
import ProjectsSidebar from "@/components/ProjectsSidebar/ProjectsSidebar.jsx";
import ProjectsHeader from "@/components/ProjectsHeader/ProjectsHeader.jsx";

import './Projects.scss'

export default function Projects() {
    const projects = useSelector((state) => state.projects)
    const dispatch = useDispatch();

    useEffect(() => {
        if (projects.status === 'idle') {
            dispatch(fetchProjectsList());
            dispatch(fetchProjectsTasks());
        }
    }, [projects.status, dispatch]);

    console.log(projects.projectsList)
    console.log(projects.projectsTasks)

    return (
        <>
            <div className="projects-container">
                <div className="sidebar">
                    <ProjectsSidebar />
                </div>
                <div className="header">
                    <ProjectsHeader projectName={"Типа имя"} />
                </div>
                <div className="dashboard">
                    <Dashboard tasks={projects.projectsTasks.tasks} />
                </div>
            </div>
        </>
    )
}