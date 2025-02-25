"use client"
import { useUser } from "@stackframe/stack";

export default function AddTask() {
    useUser({ or: 'redirect' });

    return (
        <div>
            <form>
                <label>Title:</label>
                <input type="text" id="title" />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};