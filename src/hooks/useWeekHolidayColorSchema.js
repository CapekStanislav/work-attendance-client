import useIsWeekday from "./useIsWeekday";
import useIsHoliday from "./useIsHoliday";

export default function useWeekHolidayColorSchema(date) {

    const isWeekday = useIsWeekday();
    const {data: isHoliday} = useIsHoliday(date);
    return {
        bg: isHoliday ? "danger" : isWeekday(date) ? "secondary" : "light",
    }


}