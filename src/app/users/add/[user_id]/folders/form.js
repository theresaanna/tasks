"use server"
import {createSupabaseClient} from "@/app/utils/supabase/server";

async function getFolders(user_id, supabase) {
    const {data, error} =
        await supabase.from('users')
            .select('user_folders')
            .eq('user_id', user_id);
    if (error) {
        console.log(error);
    } else {
        return data?.user_folders;
    }
}

export default async function addFolder(formData) {
    const supabase = await createSupabaseClient();
    const folders = await getFolders(formData.get('user_id'), supabase);
    console.log("folders", folders);
    const foldersUpdateArray = Array.isArray(folders)
        ? folders.push(formData.get('user_folder_name'))
        : [formData.get('user_folder_name')];
console.log(foldersUpdateArray);
console.log(formData.get('user_id'));
    const {data, error} =
        await supabase.from('users')
            .update({user_folders: foldersUpdateArray})
            .eq('user_id', formData.get('user_id'));
    if (error) {
        console.log(error);
    } else {
        console.log("end of addFolder", data);
    }

    return formData.get('user_folder_name');
}