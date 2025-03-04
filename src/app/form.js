"use client"
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client";
import AddFormInner from "./tasks/add/add_form";

export default function AddTaskPartial() {
    const [formData, setFormData] = useState({
        task_name: "",
        task_repeat: false
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleSubmitClick = (e) => {
            e.preventDefault();
            setFormData({
                task_name: formData.task_name,
                task_repeat: formData.task_repeat
            });
            setIsModalOpen(true);
        }

        const form = document.getElementById("partial_form");
        form?.addEventListener('submit', handleSubmitClick);

        return () => {
            form?.removeEventListener('submit', handleSubmitClick);
        };
    });

    return (
        <div>
            <AnimatePresence>
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {isModalOpen === false && (
                                <form id="partial_form">
                                    <input type="text" name="task_name" defaultValue="Title"/>
                                    <label htmlFor="task_repeat">Should this task repeat?</label>
                                    <input type="radio" name="task_repeat" value="yes"/><label htmlFor="task_repeat">Yes</label>
                                    <input type="radio" name="task_repeat" value="no" defaultChecked/><label htmlFor="task_repeat">No</label>
                                    <input type="submit" value="Continue" id="submit_button" />
                                </form>
                            )}

                            {isModalOpen && (
                                <form>
                                    <AddFormInner />
                                </form>
                            )}
                        </motion.div>
            </AnimatePresence>
        </div>
    )
}