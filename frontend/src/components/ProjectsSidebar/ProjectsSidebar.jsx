import plus from "@/../public/plus.svg"

import './ProjectsSidebar.scss'

export default function ProjectsSidebar() {
    return (
        <>
            <div className="projects-sidebar-container">
                <div className="projects-sidebar-header">
                    <h1>Projects</h1>
                    <button><img className="plus" src={plus} alt=""/></button>
                </div>

            </div>
        </>
    )
}