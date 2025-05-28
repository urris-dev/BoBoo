import search from '@/../src/assets/search.svg'
import notifications from '@/../src/assets/notifications.svg'

import './ProjectsHeader.scss'

export default function ProjectsHeader({projectName}) {
    return (
        <>
            <header className="projects-header">
                <h2 className="project-name">{projectName}</h2>
                <div className="header-menu">
                    <img src={search} alt=""/>
                    <img src={notifications} alt=""/>
                    <div className="avatar"></div>
                </div>
            </header>
        </>
    )
}