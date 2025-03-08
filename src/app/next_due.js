import { formatDate, truncateList } from "./utils/random";
import Link from "next/link";

export default function NextDue(tasks) {
    return (
        <>
            <ul>
                {truncateList(tasks.tasks, 7).map((task) => (
                    <li key={task.task_id}>
                        {task.task_name}
                        {task.task_due_date && (
                            <> - {formatDate(task.task_due_date)}</>
                        )}
                    </li>
                ))}
            </ul>
            <div className="more-button">
                <Link href="/tasks">More Tasks</Link>
            </div>
        </>
    )
}