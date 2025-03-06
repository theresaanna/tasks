"use client"
import { useState } from "react";
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client";
import AddFormInner from "./tasks/add/add_form";
import { useUser } from "@stackframe/stack";
import { addTask } from './tasks/add/form';

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleContinueClick = () => {
        setIsOpen(true);
    }

    const handleTaskAdd = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget.parentElement);
        return addTask(formData);
    }

    return (
        <>
            <form id="partial_form">
                <input type="text" name="task_name" defaultValue="Title"/>
                <label htmlFor="task_repeat">Should this task repeat?</label>
                <input type="radio" name="task_repeat" value="yes"/><label htmlFor="task_repeat">Yes</label>
                <input type="radio" name="task_repeat" value="no" defaultChecked/><label htmlFor="task_repeat">No</label>
                <button type="button" value="Continue" onClick={handleContinueClick}>Continue</button>
            </form>
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
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-full"
                        >
                            <form>
                                <AddFormInner user={user} />
                                <button type="submit" onClick={handleTaskAdd}>Add</button>
                            </form>
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