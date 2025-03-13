import './Task.scss'
import icon from "@/assets/progress-icon.svg"

export default function Task({task}) {
    const completedSubtaskCount = task.subtasks.filter(subtask => subtask.completionStatus === true).length;
    const subtaskCount = task.subtasks.length;
    const progress = completedSubtaskCount / subtaskCount * 100;

    return (
        <div className="task-card-container">
            <div className="task-card-content">
                <div className="text-container">
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-description">{task.description}</p>
                </div>

                <div className="progress-container">
                    <div className="progress-label">
                        <img className="progress-icon" src={icon} alt=""/>
                        <p>Progress</p>
                    </div>
                    <p className="right-text">{completedSubtaskCount}/{subtaskCount}</p>
                    <div className="progress">
                        <div
                            className="progress-fill"
                            style={{width: `${progress}%`}}
                        ></div>
                    </div>
                </div>

                <div className="deadline">
                    <p>{task.deadline}</p>
                </div>
            </div>
        </div>
    );
}