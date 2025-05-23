import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectProjectsList } from "@/store/projectsSlice.js";

import AddButton from "@/general/AddButton/AddButton.jsx";

import './ProjectsSidebar.scss'

export default function ProjectsSidebar({ createProject }) {
    const projectsList = useSelector(selectProjectsList)

    return (
        <>
            <div className="projects-sidebar-container">
                <div className="projects-sidebar-header">
                    <Link to="/"><h1>Projects</h1></Link>
                    <AddButton onClick={createProject} />
                </div>
                <div className="projects-sidebar-menu">
                    <p>Projects</p>
                    <nav>
                        {projectsList.map(project =>
                            <Link to={project.id} key={project.id}>{project.title}</Link>
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
}