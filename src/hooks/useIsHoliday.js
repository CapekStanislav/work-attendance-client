import {useQuery} from "react-query";
import traverson from "traverson-promise"
import dayjs from "dayjs";


const HOLIDAY_SEARCH_URL = "http://localhost:8080/api/v1/holidays/search";

export default function useIsHoliday(date) {
    const dateYMD = dayjs(date).format("YYYY-MM-DD");
    return useQuery(dateYMD, () => {
        return traverson
            .from(HOLIDAY_SEARCH_URL)
            .jsonHal()
            .withTemplateParameters({date: dateYMD})
            .follow("existsByDate")
            .getResource().result;
    }, {
        staleTime: 300000
    });
}
