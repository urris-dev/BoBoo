import { useSelector, useDispatch } from 'react-redux'

import Dashboard from "@/components/Dashboard/Dashboard.jsx";
import ProjectsSidebar from "@/components/ProjectsSidebar/ProjectsSidebar.jsx";
import ProjectsHeader from "@/components/ProjectsHeader/ProjectsHeader.jsx";

import './Projects.scss'

export default function Projects() {
    const projects = useSelector((state) => state.projects)
    const dispatch = useDispatch();

    console.log(projects)

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