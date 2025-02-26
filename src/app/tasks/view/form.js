import React, { useState } from 'react';
import supabase from "@/app/utils/db";
import {useUser} from "@stackframe/stack";

export async function archiveTask(task) {
    const { data, error } = await supabase
        .from('tasks')
        .update({task_isActive: false})
        .eq('task_id', task.task_id);
    if (error) {
        console.error(error);
    } else {
        return data;
    }
}

async function editTask(formData) {
    const taskObj = {
        task_name: formData.get("task_name"),
        user_id: formData.get("user_id"),
        task_id: formData.get("task_id"),
        task_isActive: 1
    };

    const updateTask = async (taskObj) => {
        const { data, error } = await supabase.from('tasks')
            .update(taskObj)
            .eq('task_id', taskObj.task_id);
        if (error) {
            console.error(error);
        } else {
            return data;
        }
    }

    updateTask(taskObj);

}

export function EditForm({ task }) {
    const user = useUser({ or: 'redirect' });

    return (
        <div>
            <form action={editTask}>
                <input type="hidden" name="user_id" defaultValue={user.id} />
                <input type="hidden" name="task_id" defaultValue={task.task_id} />
                <label>Title:</label>
                <input type="text" name="task_name" defaultValue={task.task_name} />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}