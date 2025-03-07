"use server"
import supabase from "../../utils/supabase/client";

export async function addTask(formData) {
    const { data, error } = await supabase.from('tasks').insert({
        task_name: formData.get("task_name"),
        user_id: formData.get("user_id"),
        task_id: formData.get("task_id"),
        task_isActive: true,
        task_frequency_cadence: formData.get("task_frequency_cadence"),
        task_frequency_interval: formData.get("task_frequency_interval"),
        task_image: formData.get("task_image"),
        task_repeat: formData.get("task_repeat"),
        task_notes: formData.get("task_notes"),
        task_folder: formData.get("task_folder"),
        task_parent: formData.get("task_parent"),
        task_frequency_daysofweek: formData.getAll("task_frequency_daysofweek"),
        task_due_date: formData.get("task_due_date")
    });
    if (error) {
        console.error(error);
    } else {
        return data;
    }
}