import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"

import { addNewTask } from "@/store/projectsSlice.js";

import ModalForm from "@/general/ModalForm/ModalForm.jsx";
import Input from "@/general/formElements/Input/Input.jsx";
import Textarea from "@/general/formElements/Textarea/Textarea.jsx";
import Select from "@/general/formElements/Select/Select.jsx";
import Button from "@/general/Button/Button.jsx";

import styles from"./AddNewTaskPopup.module.scss";

export default function AddNewTaskPopup({ ref, stage }) {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(stage);
    const [priority, setPriority] = useState("High");
    const [deadline, setDeadline] = useState('');

    function isDataValid() {
        return (
            title.length > 0
            && (priority === "High" || priority === "Middle" || priority === "Low")
            && (status === "Todo" || status === "In progress" || status === "Done")
            && deadline !== ''
        );
    }

    async function addTask(event) {
        event.preventDefault();

        if (isDataValid()) {
            try {
                const resp = await dispatch(
                    addNewTask({ title, description, priority, status, deadline, id })
                );
                if (!resp.ok) {
                    throw new SyntaxError("сервер не доступенз");
                }
                ref.current.close();
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <ModalForm
            ref={ref}
            title="Добавить задачу"
        >
            <form className={styles.form} onSubmit={addTask}>
                <Input
                    label="Название задачи"
                    name="taskTitle"
                    required={true}
                    value={title}
                    onChange={value => setTitle(value)}
                />
                <Textarea
                    label="Описание"
                    name="taskDescription"
                    value={description}
                    onChange={value => setDescription(value)}
                />
                <div className={styles.options}>
                    <Select
                        label="Приоритет"
                        name="priority"
                        options={{
                            "High": "Высокий",
                            "Middle": "Средний",
                            "Low": "Низкий",
                        }}
                        onChange={value => setPriority(value)}
                    />
                    <Select
                        label="Статус"
                        name="status"
                        value={stage}
                        options={{
                            "Todo": "To do",
                            "In progress": "In progress",
                            "Done": "Done",
                        }}
                        onChange={value => setStatus(value)}
                    />
                    <Input
                        label="Дедлайн"
                        type="date"
                        name="deadline"
                        required={true}
                        value={deadline}
                        onChange={value => setDeadline(value)}
                    />
                </div>
                <div className={styles.button}>
                    <Button
                        text="Добавить задачу"
                        type="submit"
                        active={isDataValid()}
                    />
                </div>
            </form>
        </ModalForm>
    );
}