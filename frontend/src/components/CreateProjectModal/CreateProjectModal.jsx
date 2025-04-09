import { useState } from "react";
import { useDispatch } from "react-redux";

import { createProject } from "@/store/projectsSlice.js";

import ModalForm from "@/general/ModalForm/ModalForm.jsx";
import Input from "@/general/formElements/Input/Input.jsx";
import Button from "@/general/Button/Button.jsx";

import styles from "./CreateProjectModal.module.scss";

export default function CreateProjectModal({ ref }) {
    const dispatch = useDispatch();

    const [projectName, setProjectName] = useState('');

    async function submitCreateProjectForm(event) {
        event.preventDefault();
        try {
            const resp = await dispatch(createProject({projectName}));
            if (!resp.ok) {
                throw new SyntaxError("сервер не доступенз");
            }
            setProjectName('');
            ref.current.close();
        } catch (error) {
            alert(error);
        }
    }

    return (
        <ModalForm
            ref={ref}
            title="Создать проект"
        >
            <form className={styles.form} onSubmit={submitCreateProjectForm}>
                <Input
                    label="Название проекта"
                    name="projectName"
                    required={true}
                    value={projectName}
                    onChange={value => setProjectName(value)}
                />
                <div className={styles.button}>
                    <Button
                        text={"Создать проект"}
                        type="submit"
                        active={projectName.length > 0}
                    />
                </div>
            </form>
        </ModalForm>
    );
}