import { useRef } from 'react';
import { Outlet } from "react-router-dom";

import CreateProjectModal from "@/components/CreateProjectModal/CreateProjectModal.jsx";
import ProjectsSidebar from "@/components/ProjectsSidebar/ProjectsSidebar.jsx";
import ProjectsHeader from "@/components/ProjectsHeader/ProjectsHeader.jsx";

export default function ProjectsLayout() {
    const createProjectPopup = useRef(null);

    return (
        <>
            <CreateProjectModal ref={createProjectPopup} />

            <div className="projects-container">
                <div className="sidebar">
                    <ProjectsSidebar
                        createProject={() => createProjectPopup.current.showModal()}
                    />
                </div>
                <div className="header">
                    <ProjectsHeader projectName={"Типа имя"}/>
                </div>
                <div className="dashboard">
                    <Outlet/>
                </div>
            </div>
        </>
    );
}