import {useQuery} from "react-query";
import traverson from "traverson-promise"

const HOLIDAY_SEARCH_URL = "http://localhost:8080/api/v1/holidays/search";

export default function useIsHoliday(date) {
    return useQuery(date.toISOString(), () => {
        const dateYMD = date.toISOString().split("T")[0];
        return traverson
            .from(HOLIDAY_SEARCH_URL)
            .jsonHal()
            .withTemplateParameters({date: dateYMD})
            .follow("existsByDate")
            .getResource().result;
    });
}
