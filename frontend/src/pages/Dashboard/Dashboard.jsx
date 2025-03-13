import './Dashboard.scss'

import Task from '@/components/Task/Task.jsx'

export default function Dashboard({tasks}) {
    const toDoTasks = tasks.filter(task => task.stage === "to do");
    const inProgressTasks = tasks.filter(task => task.stage === "in progress");
    const doneTasks = tasks.filter(task => task.stage === "done");

    return (
        <div className="dashboard-container">
            <div className="stage">
                <p className="stage-title">To do ({toDoTasks.length})</p>
                <div className="tasks-list">
                    {toDoTasks.map(task =>
                        <Task
                            key={task.id}
                            task={task}
                        />
                    )}
                </div>
            </div>
            <div className="stage">
                <p className="stage-title">In progress ({inProgressTasks.length})</p>
                <div className="tasks-list">
                    {inProgressTasks.map(task =>
                        <Task
                            key={task.id}
                            task={task}
                        />,
                    )}
                </div>
            </div>
            <div className="stage">
                <p className="stage-title">Done ({doneTasks.length})</p>
                <div className="tasks-list">
                    {doneTasks.map(task =>
                        <Task
                            key={task.id}
                            task={task}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}