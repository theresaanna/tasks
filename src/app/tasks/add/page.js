"use server"
import { stackServerApp } from "@/stack";
import supabase from "../../utils/db";
import { addTask } from "./form";

export default async function AddTask() {
    const user = await stackServerApp.getUser({ or: 'redirect' });

    return (
        <div>
            <form action={addTask}>
                <input type="hidden" name="user_id" value={user.id} />
                <label>Title:</label>
                <input type="text" name="task_name" />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};