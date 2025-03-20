import { Outlet } from "react-router-dom";

import ProjectsSidebar from "@/components/ProjectsSidebar/ProjectsSidebar.jsx";
import ProjectsHeader from "@/components/ProjectsHeader/ProjectsHeader.jsx";


export default function ProjectsLayout() {
    return (
        <>
            <div className="projects-container">
                <div className="sidebar">
                    <ProjectsSidebar/>
                </div>
                <div className="header">
                    <ProjectsHeader projectName={"Типа имя"}/>
                </div>
                <div className="dashboard">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}