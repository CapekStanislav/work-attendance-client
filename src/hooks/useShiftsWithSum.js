import useWorkTimeSum from "./useWorkTimeSum";
import usePremiumPayments from "./usePremiumPayments";
import useShifts from "./useShifts";
import {useQueryClient} from "react-query";

export default function useShiftsWithSum(url, searchParams, option) {
    const queryClient = useQueryClient()

    const result = useShifts(url, searchParams, {
        ...option,
        onSuccess: (workAttendance) => {
            let secondaryKey = {year:searchParams.year,month: searchParams.month};
            queryClient.invalidateQueries(
                ["workTimeSum",secondaryKey]
            )
            queryClient.invalidateQueries(
                ["premiumPaymentsSum", secondaryKey]
            )
        }
    })

    const {data: workTimeSum} = useWorkTimeSum(
        result?.data || {},
        {enabled: !!result?.data}
    )
    const {data: premiumPaymentsSum} = usePremiumPayments(
        result?.data || {},
        {enabled: !!result?.data}
    )

    return result.isSuccess ?
        {...result, data: {...result.data, workTimeSum, premiumPaymentsSum}}
        : result
}
