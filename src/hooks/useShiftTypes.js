import {useQuery} from "react-query";
import traverson from "traverson-promise"

export default function useShiftTypes(links, option) {

    const getTypes = (url) => {
        return traverson
            .from(url)
            .getResource().result
    }

    return useQuery("shiftTypes",()=> getTypes(links?.types?.href), option)
}