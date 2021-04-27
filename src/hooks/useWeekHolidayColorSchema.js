import useIsWeekday from "./useIsWeekday";
import useIsHoliday from "./useIsHoliday";

const WEEKDAY_COLOR = "secondary";
const HOLIDAY_COLOR = "warning";
const WEEKEND_AND_HOLIDAY_COLOR = "success"
const DEFAULT_COLOR = "light";

export default function useWeekHolidayColorSchema(date) {

    const isWeekday = useIsWeekday();
    const {data: isHoliday} = useIsHoliday(date);

    const _resolveColor = (isWeekday, isHoliday) => {
        if (isWeekday && isHoliday) {
            return WEEKEND_AND_HOLIDAY_COLOR;
        } else if (isWeekday) {
            return WEEKDAY_COLOR;
        } else if (isHoliday) {
            return HOLIDAY_COLOR;
        } else {
            return DEFAULT_COLOR;
        }
    }

    return {
        bg: _resolveColor(isWeekday(date), isHoliday)
    }

}