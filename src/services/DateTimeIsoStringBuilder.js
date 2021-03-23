const DEFAULT_DATE = "0000-00-00"
const DEFAULT_TIME = "00:00:00"
const DEFAULT_JOIN = "T"

export default function DateTimeIsoStringBuilder() {
    this.date = DEFAULT_DATE
    this.time = DEFAULT_TIME
}

function timeToString(hours = 0, minutes = 0, seconds = 0) {
    let arr = [hours, minutes, seconds]
    arr = arr.map(num => conditionallyAddZero(num))
    return arr.join(":")
}

function stringToTime(timeString) {
    // need checking for wrong string or missing values
    let [hours, minutes, seconds] = timeString.split(":")
    hours = resolveTemporalConversion(hours)
    minutes = resolveTemporalConversion(minutes)
    seconds = resolveTemporalConversion(seconds)
    return [hours, minutes, seconds]
}

function dateToString(date) {
    // need checking if date is the date
    const arr = []
    arr.push(date.getFullYear())
    arr.push(conditionallyAddZero(date.getMonth() + 1))
    arr.push(conditionallyAddZero(date.getDate()))
    return arr.join("-")
}

function getIsoDateString(date, timeString) {
    return date + DEFAULT_JOIN + timeString
}

function resolveTemporalConversion(numAsString) {
    const parsedInt = parseInt(numAsString)
    return isNaN(parsedInt) ? 0 : parsedInt
}

function conditionallyAddZero(number) {
    return number < 10 ? "0" + number : number.toString()
}

DateTimeIsoStringBuilder.prototype.withDate = function (date) {
    this.date = dateToString(date)
    return this
}

DateTimeIsoStringBuilder.prototype.withTime = function (hours, minutes, seconds) {
    this.time = timeToString(hours, minutes, seconds)
    return this
}
DateTimeIsoStringBuilder.prototype.withTimeAsString = function (timeString) {
    const [hours, minutes, seconds] = stringToTime(timeString)
    this.time = timeToString(hours, minutes, seconds)
    return this
}

DateTimeIsoStringBuilder.prototype.build = function () {
    return getIsoDateString(this.date, this.time)
}