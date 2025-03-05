"use server"
import { stackServerApp } from "@/stack";
import {addFolder, getFolders} from "./form";

export async function AddFolderForm() {
    const user = await stackServerApp.getUser({or: 'redirect' });

    return (
        <form action={addFolder}>
            <input type="hidden" value={user.id} name="user_id" />
            <input type="text" name="user_folder_name" defaultValue="Folder name" required></input>
            <input type="submit" value="Add folder" />
        </form>
    )
}

export async function FolderList() {
    const user = await stackServerApp.getUser({or: 'redirect' });
    const folders = await getFolders(user.id);

    if (folders.length === 0) {
        return null;
    } else {
        return (
            <div>
                {folders.map((folder) => (
                    <li key={folder+Math.random()}>{folder}</li>
                ))}
            </div>
        )
    }
}