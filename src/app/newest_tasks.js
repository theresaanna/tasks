"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import formatDate from './utils/random';

export default function NewestTasks(taskListArr) {
    const [hasMore, setHasMore] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const truncateList = (list, maxLength) => {
            if (list.length <= maxLength) {
                return list;
            }
            setHasMore(true);
            return list.slice(0, maxLength);
        };

        const maxLength = 7;
        const tasks = truncateList((taskListArr.tasks || taskListArr), maxLength);
        setTaskList(tasks);
    }, []);

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