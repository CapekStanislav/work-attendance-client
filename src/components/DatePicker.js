function DatePicker({date, onDateChange}) {

    const convertToDate = (e) => {
        const yearMonthString = e.target.value;
        const date = new Date(yearMonthString)
        onDateChange(date);
    }

    let dateString = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}`;
    return (
        <input
            className={"ml-3"}
            type={"month"}
            value={dateString}
            onChange={(e) => convertToDate(e)}
        />
    )
}

export default DatePicker