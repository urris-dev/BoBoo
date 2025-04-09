import { useRef } from 'react';

import AddNewTaskPopup from "@/components/AddNewTaskPopup/AddNewTaskPopup.jsx";
import AddButton from "@/general/AddButton/AddButton.jsx";
import Task from "@/components/Task/Task.jsx";

import styles from "./Stage.module.scss";

export default function Stage({ title, stage, tasks }) {
    const addNewTaskPopup = useRef(null);

    return (
        <>
            <AddNewTaskPopup ref={addNewTaskPopup} stage={stage} />

            <div className={styles.stage}>
                <div className={styles.stageHeader}>
                    <p className={styles.stageTitle}>{title} ({tasks.length})</p>
                    <div
                        onClick={() => addNewTaskPopup.current.showModal()}
                        className={styles.addNewTask}
                    >
                        <AddButton width={18}/>
                        <p>Add new task</p>
                    </div>
                </div>
                <div className={styles.tasksList}>
                    {tasks.map(task =>
                        <Task
                            key={task.id}
                            task={task}
                        />
                    )}
                </div>
            </div>
        </>
    );
}