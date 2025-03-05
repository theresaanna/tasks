"use server"
import { UserButton } from '@stackframe/stack';
import { stackServerApp } from "@/stack";
import { createSupabaseClient } from "@/app/utils/supabase/server";
import AddTaskPartial from "@/app/form";
import {AddFolderForm,FolderList} from "@/app/users/add/[user_id]/folders/page";

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

    const getNewestTasks = async (user) => {
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

          <div className="pinboard">
              <div className="newest-tasks card">
                <h2>Newest Tasks:</h2>
                  <ul>
                      {recentTasks?.map((task) => (
                          <li key={task.task_id}>{task.task_name}</li>
                      ))}
                  </ul>
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
          </div>
      </div>
  );
}
