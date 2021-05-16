// Your code here
function createEmployeeRecord(employeeArr){
    return {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesArr){
    // let employeeRecordsArr = [];
    // employeesArr.forEach(employeeArr => {
    //     employeeRecordsArr.push(createEmployeeRecord(employeeArr))
    // });
    // return employeeRecordsArr
    return employeesArr.map(employeeArr => createEmployeeRecord(employeeArr));
}

function createTimeInEvent(employeeObj, dateStamp){
    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employeeObj;
}

function createTimeOutEvent(employeeObj, dateStamp){
    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employeeObj;
}

function hoursWorkedOnDate(employeeRecord, date){
    let hourOut, hourIn;
    employeeRecord.timeOutEvents.forEach(timeOutObj => {
        if (timeOutObj.date === date){
            hourOut = timeOutObj.hour;
        }
    });
    employeeRecord.timeInEvents.forEach(timeInObj => {
        if (timeInObj.date === date){
            hourIn = timeInObj.hour;
        }
    });
    return (hourOut - hourIn)/100;
}

function wagesEarnedOnDate(employeeRecord, date){
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date);
}

function allWagesFor(employeeRecord){

    // FIRST TRY
    // return employeeRecord.timeOutEvents.reduce((accumulator, currentValue)=>{
    //     return accumulator + wagesEarnedOnDate(employeeRecord, currentValue.date);
    // })

    // SECOND TRY
    // let employeeCopy = Object.assign({}, employeeRecord);
    // let totalWage = 0;
    // employeeCopy.timeOutEvents.forEach((timeOutEvent)=>{
    //     totalWage += wagesEarnedOnDate( employeeCopy, timeOutEvent.date)
    //     // employeeCopy.timeOutEvents.shift();
    // })
    // return totalWage;


    // THIRD TRY
    let totalWage = 0;
    employeeRecord.timeOutEvents.forEach((timeOutEvent)=>{
        totalWage += wagesEarnedOnDate(employeeRecord, timeOutEvent.date)
    })
    return totalWage;
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employeeArr){
    // return employeeArr.reduce((acc, currentValue)=>{
    //     return acc + allWagesFor(currentValue);
    // })
    let total = 0;
    employeeArr.forEach((employee)=>{
        total += allWagesFor(employee);
    })
    return total;
}