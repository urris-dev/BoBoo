import styles from "./Stage.module.scss";

import AddButton from "@/general/AddButton/AddButton.jsx";
import Task from "@/components/Task/Task.jsx";

export default function Stage({ title, tasks }) {
    return (
        <div className={styles.stage}>
            <div className={styles.stageHeader}>
                <p className={styles.stageTitle}>{title} ({tasks.length})</p>
                <div className={styles.addNewTask}>
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
    );
}