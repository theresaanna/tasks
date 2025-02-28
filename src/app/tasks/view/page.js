"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import {useUser} from "@stackframe/stack";

import supabase from "../../utils/supabase/client";
import { archiveTask } from "./form";

export default function ViewAll() {
    const user = useUser({ or: 'redirect' });
    const [data, setData] = useState([]);
    const TaskWrapper = ({ task }) => {
        return (
            <Link href={`/tasks/edit/${encodeURIComponent(task.task_id)}`}>Edit</Link>
        )
    };

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

                    <ul>
                        {data.map((task) => (
                            <li key={task.task_id}>{task.task_name}
                                <a onClick={() => archiveTask(task)}>Archive</a>
                                <TaskWrapper task={task} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};