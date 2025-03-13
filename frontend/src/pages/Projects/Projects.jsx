import Dashboard from "@/components/Dashboard/Dashboard.jsx";
import ProjectsSidebar from "@/components/ProjectsSidebar/ProjectsSidebar.jsx";
import ProjectsHeader from "@/components/ProjectsHeader/ProjectsHeader.jsx";

import { tasks } from '@/data.js'

import './Projects.scss'

export default function Projects() {
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
                    <Dashboard tasks={tasks} />
                </div>
            </div>
        </>
    )
}