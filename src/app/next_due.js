import formatDate from "./utils/random";

export default function NextDue(tasks) {
    return (
        <ul>
            {tasks.tasks.map((task) => (
                <li key={task.task_id}>
                    {task.task_name}
                    {task.task_due_date && (
                        <> - {formatDate(task.task_due_date)}</>
                    )}
                </li>
            ))}
        </ul>
    )
}