import supabase from "@/app/utils/supabase/client";

export async function archiveTask(task) {
    const { data, error } = await supabase
        .from('tasks')
        .update({task_isActive: false})
        .eq('task_id', task.task_id);
    if (error) {
        console.error(error);
    } else {
        return data;
    }
}