import dayjs from 'dayjs';

export const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
    const date = dayjs().year(year).month(month);
    const firstDateOfMonth = date.startOf('month');
    const lastDateOfMonth = date.endOf('month');

    const arrayOfDate = [];

    // Create prefix date
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
        arrayOfDate.push({ currentMonth: false, date: firstDateOfMonth.day(i) });
    }

    // Generate current date
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDate.push({
            date: firstDateOfMonth.date(i),
            currentMonth: true,
            today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString()
        });
    }

    const remaining = 42 - arrayOfDate.length;

    for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
        arrayOfDate.push({ currentMonth: false, date: lastDateOfMonth.date(i) });
    }

    return arrayOfDate;
};
export const months = [
    "January",
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'

];
