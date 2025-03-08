export default function formatDate(date) {
    const taskDate = new Date(date);
    const formatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: "short",
        timeStyle: "short"
    });
    return formatter.format(taskDate);
}