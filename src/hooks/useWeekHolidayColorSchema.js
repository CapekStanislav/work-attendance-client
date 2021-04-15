import useIsWeekday from "./useIsWeekday";
import useIsHoliday from "./useIsHoliday";

export default function useWeekHolidayColorSchema(date) {
    const weekdayColor = "secondary";
    const holidayColor = "warning";
    const weekendAndHolidayColor = "success"
    const defaultColor = "light";

    const isWeekday = useIsWeekday();
    const {data: isHoliday} = useIsHoliday(date);

    const _resolveColor = (isWeekday, isHoliday) => {
        if (isWeekday && isHoliday) {
            return weekendAndHolidayColor;
        } else if(isWeekday) {
            return  weekdayColor;
        } else if(isHoliday) {
            return holidayColor;
        } else {
            return defaultColor;
        }
    }

    return {
        bg: _resolveColor(isWeekday(date),isHoliday)
    }

}