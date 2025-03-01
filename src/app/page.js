import React from "react";
import Link from "next/link";
import { UserButton } from '@stackframe/stack';
import { stackServerApp } from "@/stack";
import { createSupabaseClient } from "@/app/utils/supabase/server";
import AddTask from "./tasks/add/page";

export default async function Home() {
    const user = await stackServerApp.getUser({ or: 'redirect' });
    const supabase = await createSupabaseClient();

    const getNewestTasks = async (user) => {
        const {data, error} =
            await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', user.id)
                .eq('task_isActive', true);
        if (error) {
            console.error(error);
        } else {
            const sortedDataDesc = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            return sortedDataDesc;
        }
    }

    const recentTasks = await getNewestTasks(user);

    return (
      <div>
          <nav>
            <UserButton/>
            Hi, {user?.displayName || 'friend'}!
          </nav>

          <div className="newest-tasks">
            <h2>Newest Tasks:</h2>
              <ul>
                  {recentTasks?.map((task) => (
                      <li key={task.task_id}>{task.task_name}</li>
                  ))}
              </ul>
          </div>

          <div className="manage-folders">
              <h2>Manage Folders</h2>
          </div>

          <div className="add-task">
              <h2>Add Task</h2>
              <AddTask />
          </div>
      </div>
  );
}
