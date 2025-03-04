export default function AddFormInner(user) {
    const weekdays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];

    return (
        <div>
            <input type="hidden" name="user_id" value={user.id}/>
            <input type="hidden" name="task_id" value={user.id + Date.now()}/>
            <input type="text" name="task_name" defaultValue="Title"/>
            <label htmlFor="task_repeat">Should this task repeat?</label>
            <input type="radio" name="task_repeat" value="yes"/><label htmlFor="task_repeat">Yes</label>
            <input type="radio" name="task_repeat" value="no" defaultChecked/><label htmlFor="task_repeat">No</label>
            <label htmlFor="task_frequency_cadence">Reminders: How often?</label>
            <select name="task_frequency_cadence">
                <option value="daily">Days</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <label htmlFor="task_frequency_interval">Reminders: How many times per?</label>
            <input type="number" name="task_frequency_interval"/>
            <fieldset>
                <legend>Reminders: What days?</legend>
                {weekdays.map((day) => (
                    <div key={day}>
                        <label htmlFor={`day_${day}`}>{day}</label>
                        <input type="checkbox"
                               id={`day_${day}`}
                               name="task_frequency_daysofweek"
                               value={day}/>
                    </div>
                ))}
            </fieldset>
            <textarea name="task_notes" defaultValue="Notes"></textarea>
            <input type="text" name="task_folder"/>
            <label htmlFor="task_folder">Folder</label>
            <select name="task_folder"></select>
            <select name="task_parent"></select>
            <button type="submit">Add</button>
        </div>
    )
}