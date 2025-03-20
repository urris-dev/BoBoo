import plus from "@/../public/plus.svg"

import { useSelector } from "react-redux";

import { selectProjectsList } from "@/pages/Projects/projectsSlice.js";

import './ProjectsSidebar.scss'

export default function ProjectsSidebar() {
    const projectsList = useSelector(selectProjectsList)

    if (projectsList.length === 0) return <></>

    return (
        <>
            <div className="projects-sidebar-container">
                <div className="projects-sidebar-header">
                    <h1>Projects</h1>
                    <button><img className="plus" src={plus} alt=""/></button>
                </div>
                <div className="projects-sidebar-menu">
                    <p>Projects</p>
                    {projectsList.map(project =>
                        <li key={project.id}>{project.title}</li>
                    )}
                </div>
            </div>
        </>
    )
}