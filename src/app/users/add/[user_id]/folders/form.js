"use server"
import {createSupabaseClient} from "@/app/utils/supabase/server";

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
        console.log('data', data)
        return (data.length > 0 ? data[0].user_folders : []);
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

    return formData.get('user_folder_name');
}