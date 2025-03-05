"use server"
import { stackServerApp } from "@/stack";
import { createSupabaseClient } from "@/app/utils/supabase/server";
import addFolder from "./form";

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
    const supabase = await createSupabaseClient();

    const getFolders = async (user) => {
        const {data, error} =
            await supabase.from('users')
                .select('user_folders')
                .eq('user_id', user.id);
        if (error) {
            return error;
        } else {
            return data;
        }
    }

    const folders = await getFolders(user);

    if (folders.length === 0) {
        return null;
    } else {
        return (
            <div>
                {folders.map((folder) => (
                    <li key={folder.name}>{folder.name}</li>
                ))}
            </div>
        )
    }
}