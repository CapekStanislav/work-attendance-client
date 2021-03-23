import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import SumSection from "./SumSection";

function Summarization({className, fluid, sumInfo}) {

    const workTimeSum = sumInfo?.workTimeSum
    const premiumPaymentsSum = sumInfo?.premiumPaymentsSum

    const defaultWorkTimeSum = {
        workedOut: "N/A",
        holiday: "N/A",
        notWorkedOut: "N/A",
        previousMonth: "N/A",
        nextMonth: "N/A"
    }

    const defaultPremiumPaymentsSum = {
        night: "N/A",
        holiday: "N/A",
        weekend: "N/A"
    }

    const xsCol = 4;
    const smCol = 6;
    const rowStyle = "border-bottom py-1 justify-content-center"

    const workedHoursMap = (sum) => {
        const map = new Map()
        map.set("Odprac.:", sum.workedOut)
        map.set("Dovolená:", sum.holiday)
        map.set("Neodprac.:", sum.notWorkedOut)
        return map
    }

    const premiumPaymentsMap = (sum) => {
        const map = new Map();
        map.set("Noční:", sum.night)
        map.set("Svátek:", sum.holiday)
        map.set("Víkend:", sum.weekend)
        return map
    }

    const sumMap = (sum) => {
        const map = new Map();
        map.set("Převod:", sum.previousMonth)
        map.set("Celkem:", sum.workedOut + sum.holiday + sum.notWorkedOut)
        map.set("Další měsíc:", sum.nextMonth)
        return map
    }

    return (
        <Container fluid={fluid} className={className}>
            <Row xs={xsCol} sm={smCol} className={rowStyle}>
                <SumSection
                    map={workedHoursMap(workTimeSum || defaultWorkTimeSum)}
                />
            </Row>
            <Row xs={xsCol} sm={smCol} className={rowStyle}>
                <SumSection
                    map={premiumPaymentsMap(premiumPaymentsSum || defaultPremiumPaymentsSum)}
                />
            </Row>
            <Row xs={xsCol} sm={smCol} className={rowStyle}>
                <SumSection
                    map={sumMap(workTimeSum || defaultWorkTimeSum)}
                />
            </Row>
        </Container>
    )
}

export default Summarization