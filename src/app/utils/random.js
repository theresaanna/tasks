export function formatDate(date) {
    const taskDate = new Date(date);
    const formatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: "short",
        timeStyle: "short"
    });
    return formatter.format(taskDate);
}

export function truncateList(list, maxLength) {
    if (list.length <= maxLength) {
        return list;
    }
    return list.slice(0, maxLength);
}