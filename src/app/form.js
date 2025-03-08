"use client"
import { useState } from "react";
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client";
import AddFormInner from "./tasks/add/add_form";
import { useUser } from "@stackframe/stack";
import { addTask } from './tasks/add/form';
import path from "./path";

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [addFormData, setAddFormData] = useState(new FormData());
    const user = useUser({ or: 'redirect' });

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.2,
            },
        },
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 0.5 },
    };

    const handleContinueClick = (e) => {
        const formData = new FormData(e.target.parentElement);
        setAddFormData(formData);
        setIsOpen(true);
    }

    const handleTaskAdd = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget.parentElement);
        addTask(formData);
        setIsOpen(false);
        path();
    }

    return (
        <>
            {!isOpen && (
                <form id="partial_form">
                    <input type="text" name="task_name" defaultValue="Title"/>
                    <input type="datetime-local" name="task_due_date" defaultValue="Date"/>
                    <button type="button" value="Continue" onClick={handleContinueClick}>Continue</button>
                </form>
                )}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black z-40"
                            variants={backdropVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-full"
                        >
                            {isOpen && (
                                <form>
                                    <AddFormInner user={user} addFormData={addFormData} />
                                    <button type="submit" onClick={handleTaskAdd}>Add</button>
                                </form>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

export default function AddTaskPartial() {
    return (
        <Modal></Modal>
    )
}