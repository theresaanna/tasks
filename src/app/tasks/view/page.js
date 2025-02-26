"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useUser } from "@stackframe/stack";

import supabase from "../../utils/db";
import { archiveTask } from "./form";
import { EditForm } from "./form";

export default function ViewAll() {
    const user = useUser({ or: 'redirect' });
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTask, setActiveTask] = useState({});

    const handleEditTask = (task) => {
        setActiveTask(task)
        setIsEditing(true);
    }

    useEffect(() => {
        async function fetchData() {
            const { data, error } =
                await supabase
                    .from('tasks')
                    .select('*')
                    .match({
                        'user_id': user.id,
                        'task_isActive': true
                    });
            if (error) {
                console.error(error);
            } else {
                setData(data);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {data.length === 0 ? (
                <p>No tasks yet! Maybe <Link href="/tasks/add">add one</Link>?</p>
            ) : (
                <div>
                    {isEditing && <EditForm task={activeTask} />}
                    <ul>
                        {data.map((task) => (
                            <li key={task.task_id}>{task.task_name}
                                <a onClick={() => archiveTask(task)}>Archive</a>
                                <a onClick={() => handleEditTask(task)}>Edit</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};