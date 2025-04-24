import { useParams } from "react-router-dom"

import Stage from "@/components/Stage/Stage.jsx";

import './Dashboard.scss'

export default function Dashboard({tasksArray}) {
    if (tasksArray.length === 0) return (<></>)

    const { id } = useParams()
    const tasks = tasksArray.find(obj => obj.id === id).tasks;

    const toDoTasks = tasks.filter(task => task.stage === "to do")
    const inProgressTasks = tasks.filter(task => task.stage === "in progress")
    const doneTasks = tasks.filter(task => task.stage === "done")

    return (
        <div className="dashboard-container">
            <Stage
                title="To do"
                stage="Todo"
                tasks={toDoTasks}
            />
            <Stage
                title="In progress"
                stage="In progress"
                tasks={inProgressTasks}
            />
            <Stage
                title="Done"
                stage="Done"
                tasks={doneTasks}
            />
        </div>
    );
}