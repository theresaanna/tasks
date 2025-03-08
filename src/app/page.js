"use server"
import { UserButton } from '@stackframe/stack';
import { stackServerApp } from "@/stack";
import { createSupabaseClient } from "@/app/utils/supabase/server";
import AddTaskPartial from "@/app/form";
import {AddFolderForm,FolderList} from "@/app/users/add/[user_id]/folders/page";
import NewestTasks from "@/app/newest_tasks";
import NextDue from "./next_due";

export default async function Home() {
    const user = await stackServerApp.getUser({or: 'redirect' });
    const supabase = await createSupabaseClient();

    const addUserToDb = async (user) => {
        console.log(user);
        const {data, error} =
            await supabase.from('users')
                .insert({'user_id': user.id});
        if (error) {
            return error;
        } else {
            if (data) {
                return data;
            }
        }
    }

    const getUserFromDb = async (user) => {
        const {data, error} =
            await supabase.from('users')
                .select('*')
                .eq('user_id', user.id);
        if (error) {
            return error;
        } else {
            return data;
        }
    }

    const dbUser = await getUserFromDb(user);

    if (Array.isArray(dbUser) && dbUser.length === 0) {
        const userRecord = await addUserToDb(user);
    }

    const getTasks = async (user, operation) => {
        const {data, error} =
            await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', user.id)
                .eq('task_isActive', true);
        if (error) {
            console.error(error);
            return error;
        } else {
            if (operation?.dataArrangement === 'sort') {
                const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                return sortedData;
            }
            else if (operation?.dataArrangement === 'next-due') {
                const sortedData = data.sort((a, b) => {
                    if (a.task_due_date !== null && b.task_due_date !== null) {
                        return new Date(a.task_due_date) - new Date(b.task_due_date)
                    } else {
                        return -1;
                    }
                });
                return sortedData;
            }
        }
    }

    const recentTasks = await getTasks(user, {
        dataArrangement: 'sort'
    });

    const nextDueTasks = await getTasks(user, {
        dataArrangement: 'next-due'
    });

    return (
      <div>
          <nav>
            <UserButton/>
            Hi, {user?.displayName || 'friend'}!
          </nav>

          <div className="pinboard">
              <div className="newest-tasks card">
                  <h2>Newest Tasks:</h2>
                  <NewestTasks tasks={recentTasks} />
              </div>

              <div className="add-task card">
                  <h2>Add Task</h2>
                  <AddTaskPartial />
              </div>

              <div className="manage-folders card">
                  <h2>Manage Folders</h2>
                  <AddFolderForm />
                  <ul>
                    <FolderList user_id={user.id} />
                  </ul>
              </div>

              <div className="due-next card">
                  <h2>Next Due</h2>
                  <NextDue tasks={nextDueTasks} />
              </div>
          </div>
      </div>
  );
}
