import {useQuery} from "react-query";
import traverson from "traverson-promise";

export default function useWorkTimeSum({year,month,_links},option) {

    const getWorkTimeSum = (url) => {
        return traverson
            .from(url)
            .jsonHal()
            .follow("work-time-sum")
            .getResource().result
    }

    return useQuery(
        ["workTimeSum", {year, month}],
        ()=> getWorkTimeSum(_links?.self?.href),
        option
    )
}