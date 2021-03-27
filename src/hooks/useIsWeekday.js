const SATURDAY = 6;
const SUNDAY = 0

export default function useIsWeekday() {
    return (date) => {
        const day = date.getDay();
        return day === SATURDAY || day === SUNDAY;
    }

}