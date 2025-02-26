"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useUser } from "@stackframe/stack";

import supabase from "../../utils/db";

export default function ViewAll() {
    const user = useUser({ or: 'redirect' });
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data, error } =
                await supabase
                    .from('tasks')
                    .select('*')
                    .eq('user_id', user.id);
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
                <ul>
                    {data.map((task) => (
                        <li key={task.id}>{task.task_name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};