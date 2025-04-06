import { useRef, useState } from 'react';
import { Outlet } from "react-router-dom";

import Input from "@/general/Input/Input.jsx";
import Button from "@/general/Button/Button.jsx";
import CloseButton from "@/general/CloseButton/CloseButton.jsx";
import ProjectsSidebar from "@/components/ProjectsSidebar/ProjectsSidebar.jsx";
import ProjectsHeader from "@/components/ProjectsHeader/ProjectsHeader.jsx";

import styles from "./ProjectsLayout.module.scss";

export default function ProjectsLayout() {
    const [projectName, setProjectName] = useState('');
    const createProjectPopup = useRef(null);
    function openCreateProjectPopup() {
        createProjectPopup.current.showModal();
    }

    return (
        <>
            <dialog ref={createProjectPopup} className={styles.popup}>
                <div className={styles.popupContent}>
                    <header className={styles.header}>
                        <h1>Создать проект</h1>
                        <CloseButton onClick={() => createProjectPopup.current.close()}/>
                    </header>
                    <form className={styles.form}>
                        <div className={styles.createProjectInput}>
                            <Input
                                label="Название проекта"
                                name="projectName"
                                required={true}
                                value={projectName}
                                onChange={value => setProjectName(value)}
                            />
                        </div>
                        <div className={styles.button}>
                            <Button
                                text={"Создать проект"}
                            />
                        </div>
                    </form>
                </div>
            </dialog>

            <div className="projects-container">
                <div className="sidebar">
                    <ProjectsSidebar
                        createProject={openCreateProjectPopup}
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