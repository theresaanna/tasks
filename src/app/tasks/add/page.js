"use server"
import { stackServerApp } from "@/stack";
import { addTask } from "./form";
import AddFormInner from "./add_form";

export default async function AddTask() {
    const user = await stackServerApp.getUser({ or: 'redirect' });

    return (
        <div>
            <form action={addTask}>
                <AddFormInner user={user} />
            </form>
        </div>
    );
};