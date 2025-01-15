


//функция, которая получает дату и возвраащет её в формате "минуту назад", "час назад" и т.д.
export const getTimeAgo = (date: string): string => {
    const dateObj = new Date(date);
    const currentDate = new Date();
    const diff = currentDate.getTime() - dateObj.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;

    if (hours < 1) {
        return `${Math.floor(minutes)} минут назад`;
    } else if (hours < 24) {
        return `${Math.floor(hours)} часов назад`;
    } else {
        return `${Math.floor(hours / 24)} дней назад`;
    }

}