"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { formatDate, truncateList } from './utils/random';
import path from './path';

export default function NewestTasks(taskListArr) {
    const [hasMore, setHasMore] = useState(false);
    const [taskList, setTaskList] = useState(taskListArr.tasks || taskListArr);

    useEffect(() => {
        const maxLength = 7;
        const tasks = truncateList((taskListArr.tasks || taskListArr), maxLength);
        setTaskList(tasks);
        if (tasks.length > 6) {
            setHasMore(true);
        }
        path();
    }, [taskListArr]);

    return (
        <>
            <ul>
                {taskList?.map((task) => (
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
            <>
                {hasMore && (
                    <div className="more-button">
                        <Link href="/tasks">More Tasks</Link>
                    </div>
                )}
            </>
        </>
    )
}