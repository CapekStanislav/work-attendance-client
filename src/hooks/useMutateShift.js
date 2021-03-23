import {useMutation, useQueryClient} from "react-query";
import traverson from "traverson-promise";

export default function useMutateShift() {
    const queryClient = useQueryClient()
    const patchShift = (newShift) => {
        return traverson
            .from(newShift._links.self.href)
            .jsonHal()
            .convertResponseToObject()
            .patch(newShift).result
            .then(shift => {
                return shift
            })
    }

    const extractKey = (start) => {
        const startDate = new Date(start)
        const year = startDate.getFullYear()
        const month = startDate.getMonth() + 1
        return {year, month}
    }
    const extractIndex = (shift) => {
        const date = new Date(shift.start)
        return date.getDate() - 1
    }

    return useMutation(patchShift,
        {
            onSuccess: (fromServerShift) => {
                const key = extractKey(fromServerShift.start)
                const index = extractIndex(fromServerShift)
                queryClient.setQueryData(["shifts", key], (oldShifts) => {
                    oldShifts[index] = fromServerShift
                    return oldShifts
                })
            },
            onSettled: (fromServerShift) => {
                const key = extractKey(fromServerShift.start)
                queryClient.invalidateQueries(["shifts", key])
            }
        }
    )
}