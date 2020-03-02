export const timestampToDateString = timestamp => {
    var date = new Date(timestamp)
    return date.toLocaleString()
}