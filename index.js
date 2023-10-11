// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    });

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let inEvent = employeeRecord.timeInEvents.find(e => e.date === date);
    let outEvent = employeeRecord.timeOutEvents.find(e => e.date === date);

    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    let wage = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;

    return parseFloat(wage.toString());
}

function allWagesFor(employeeRecord) {
    let eligibleDates = employeeRecord.timeInEvents.map(e => e.date);

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0);

    return payable;
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}