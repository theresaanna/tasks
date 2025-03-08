"use server"
import {createSupabaseClient} from "@/app/utils/supabase/server";
import {revalidatePath} from "next/cache";
import {truncateList} from "@/app/utils/random";

export async function getFolders(user_id) {
    const supabase = await createSupabaseClient();
    const {data, error} =
        await supabase.from('users')
            .select('user_folders')
            .eq('user_id', user_id);
    if (error) {
        console.log(error);
        return error;
    } else {
        return (data.length > 0 ? truncateList(data[0].user_folders, 7) : []);
    }
}

export async function addFolder(formData) {
    const supabase = await createSupabaseClient();
    const folders = await getFolders(formData.get('user_id'));
    folders.push(formData.get('user_folder_name'));

    const {error} =
        await supabase.from('users')
            .update({user_folders: folders})
            .eq('user_id', formData.get('user_id'));
    if (error) {
        console.log(error);
    }
    revalidatePath('/');
    return formData.get('user_folder_name');
}