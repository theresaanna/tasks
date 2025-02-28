import { createSupabaseClient } from "@/app/utils/supabase/server";

export default async function EditForm({ task }) {
    const weekdays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];

    const editTask = async (formData) => {
        "use server"
        const taskObj = {
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
            task_frequency_daysofweek: formData.getAll("task_frequency_daysofweek")
        };

        const updateTask = async (taskObj) => {
            const supabase = await createSupabaseClient();
            const { data, error } = await supabase.from('tasks')
                .update(taskObj)
                .eq('task_id', taskObj.task_id);
            if (error) {
                console.error(error);
            } else {
                return data;
            }
        }

        updateTask(taskObj);
    }

    return (
        <div>
            <form action={editTask}>
                <input type="hidden" name="user_id" defaultValue={task.user_id} />
                <input type="hidden" name="task_id" defaultValue={task.task_id} />
                <label>Title:</label>
                <input type="text" name="task_name" defaultValue={task.task_name} />
                <label htmlFor="task_repeat">Should this task repeat?</label>
                <input type="radio" name="task_repeat" value="yes" defaultChecked={task.task_repeat === "yes"}/>
                <label htmlFor="task_repeat">Yes</label>
                <input type="radio" name="task_repeat" value="no" defaultChecked={task.task_repeat === "no"}/>
                <label htmlFor="task_repeat">No</label>
                <label htmlFor="task_frequency_cadence">Reminders: How often?</label>
                <select name="task_frequency_cadence" defaultValue={task.task_frequency_cadence}>
                    <option>None</option>
                    <option value="daily">Days</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                <label htmlFor="task_frequency_interval">Reminders: How many times per?</label>
                <input type="number" name="task_frequency_interval" defaultValue={task.task_frequency_interval}/>
                <fieldset>
                    <legend>Reminders: What days?</legend>
                    {weekdays.map((day) => (
                        <div key={day}>
                            <label htmlFor={`day_${day}`}>{day}</label>
                            <input type="checkbox"
                                   id={`day_${day}`}
                                   name="task_frequency_daysofweek"
                                   value={day}
                                   defaultChecked={
                                       JSON.parse(task.task_frequency_daysofweek).includes(day)
                                   }
                            />
                        </div>
                    ))}
                </fieldset>
                <textarea name="task_notes" defaultValue={task.task_notes || "Notes"}></textarea>
                <label htmlFor="task_folder">Folder</label>
                <select name="task_folder" defaultValue={task.task_folder}></select>
                <label htmlFor="task_parent">Parent Task</label>
                <select name="task_parent" defaultValue={task.task_parent}></select>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}