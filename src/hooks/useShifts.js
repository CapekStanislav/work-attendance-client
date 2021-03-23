import {useQuery} from "react-query";
import traverson from "traverson-promise";

/**
 *
 * @param url base url
 * @param searchParams year,month, weeklyWorkTime, employee
 * @returns {UseQueryResult<unknown, unknown>}
 */
export default function useShifts(url, searchParams, option) {

    const postShifts = (body, resource) => {
        if (!resource) {
            throw new Error("No resource name specified for POST method.")
        }
        return traverson
            .from(url + "/" + resource)
            .jsonHal()
            .convertResponseToObject()
            .post(body)
            .resultWithTraversal()
            .then(({traversal}) => {
                return traversal
                    .continue()
                    .getResource().result
            })
    }

    const getShifts = (searchParams) => {
        const resource = "work-attendances";
        return traverson
            .from(url)
            .jsonHal()
            .withTemplateParameters(searchParams)
            .follow(
                resource,
                "search",
                "findByYearAndMonthAndEmployee",
                "self",
            )
            .getResource().result
            .catch(() => postShifts(searchParams,resource))
    }

    return useQuery(["shifts", {year: searchParams.year, month: searchParams.month}],
        () => getShifts(searchParams), option)
}