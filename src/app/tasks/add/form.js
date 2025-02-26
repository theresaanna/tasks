"use server"
import supabase from "../../utils/db";

export async function addTask(formData) {
    const { data, error } = await supabase.from('tasks').insert({
        task_name: formData.get("task_name"),
        user_id: formData.get("user_id"),
        task_id: formData.get("task_id"),
        task_isActive: 1
    });
    if (error) {
        console.error(error);
    } else {
        console.log(data);
        return data;
    }
}