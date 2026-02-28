export const formatTime = (date) => {
    return date.getHours() + ":" + date.getMinutes().toString().padStart(2, '0');
};