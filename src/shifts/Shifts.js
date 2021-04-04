import Container from "react-bootstrap/Container";
import ShiftsTable from "./ShiftsTable";
import Summarization from "./Summarization";
import traverson from "traverson-promise"
import JsonHalAdapter from "traverson-hal";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import useMutateShifts from "../hooks/useMutateShifts";
import useShiftTypes from "../hooks/useShiftTypes";
import useShiftsWithSum from "../hooks/useShiftsWithSum";

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter)


export default function Shifts({user, date}) {
    const url = "http://localhost:8080/api/v1"
    const searchParams = user ? {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        weeklyWorkTime: 37.5,
        employee: user._links.self.href
    } : {}

    const {data, isSuccess: isShiftsLoaded, isError: isErrorShifts, error} = useShiftsWithSum(
        url,
        searchParams,
        {enabled: !!user}
    )

    const {data: types} = useShiftTypes(data?._links, {enabled: !!data})

    const shiftsMutation = useMutateShifts()

    const handleShiftChange = (changedShift) => {
        console.log("HandleShiftChange: ", changedShift);

        const tempShifts = [...data.shifts]
        tempShifts.splice(changedShift.index, 1, changedShift)
        shiftsMutation.mutate({...data, shifts: tempShifts})
    }

    const success = (<>
            <Container fluid className={"mb-5 pb-5"}>
                <ShiftsTable
                    types={types ? types : []}
                    shifts={data?.shifts}
                    onShiftChange={handleShiftChange}
                />
            </Container>
            <Summarization
                sumInfo={
                    isShiftsLoaded &&
                    {
                        premiumPaymentsSum: data.premiumPaymentsSum,
                        workTimeSum: {
                            ...data.workTimeSum,
                            previousMonth: data.previousMonth,
                            nextMonth: data.nextMonth
                        },
                    }
                }
                fluid={true}
                className={"fixed-bottom bg-light px-5"}
            />
        </>
    )
    return (
        <>
            {(isErrorShifts) &&
            <ErrorMessage title={"Objevila se chyba"}
                          message={"Při načítání směn se vyskytla chyba! Zkuste aktualizovat stránku. " +
                          error.doc.message}
                          variant={"danger"}
            />}
            {isShiftsLoaded ?
                success
                : <LoadingSpinner text={"Načítám směny ..."} variant={"success"}/>}
        </>
    )

}
