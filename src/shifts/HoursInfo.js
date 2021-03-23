import Table from "react-bootstrap/Table";


function HoursInfo({workTime,premiumPayments}) {

    return (
        <Table responsive>
            <thead>
            <tr>
                <th>Odprac.</th>
                <th>Noční</th>
                <th>Svátek</th>
                <th>Dovolená</th>
                <th>Víkend</th>
                <th>Neodprac.</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{workTime.workedOut}</td>
                <td>{premiumPayments.night}</td>
                <td>{premiumPayments.holiday}</td>
                <td>{workTime.holiday}</td>
                <td>{premiumPayments.weekend}</td>
                <td>{workTime.notWorkedOut}</td>
            </tr>
            </tbody>
        </Table>
    )
}

export default HoursInfo