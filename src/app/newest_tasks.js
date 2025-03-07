import Link from 'next/link';

export default function NewestTasks(taskList) {
    const tasks = (taskList.tasks || taskList);
    const formatDate = (date) => {
        const taskDate = new Date(date);
        return taskDate.toLocaleDateString();
    }
    return (
        <ul>
            {tasks?.map((task) => (
                <li key={task.task_id}>
                    <Link href={`/tasks/view/${task.task_name}`}>
                        {task.task_name}
                    </Link>
                    {task.task_due_date && (
                        <> - {formatDate(task.task_due_date)} </>
                    )}
                </li>
            ))}
        </ul>
    )
}