import EditForm from "./form";
import { stackServerApp } from "@/stack";
import { createSupabaseClient } from "@/app/utils/supabase/server";

export default async function EditTask({ params }) {
    await stackServerApp.getUser({ or: 'redirect' });
    const { task_id } = await params;
    const supabase = await createSupabaseClient();

    const getTask = async (task_id) => {
        const { data, error } =
            await supabase
                .from('tasks')
                .select('*')
                .eq('task_id', task_id)
                .single();
        if (error) {
            console.error(error);
            return null;
        } else {
            return data;
        }
    }

    const task = await getTask(task_id);

    return (
        <div>
            <EditForm task={task} />;
        </div>
    )
}
