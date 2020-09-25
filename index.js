// Your code here


function createEmployeeRecord(arr){

    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}



function createEmployeeRecords(arr){
    return arr.map(element => createEmployeeRecord(element));
}

function createTimeInEvent(record, date){
    let splitDate = date.split(' ')
    let dayMonthYear = splitDate[0]
    let time = parseInt(splitDate[1])
    record['timeInEvents'].push({
        type: 'TimeIn',
        hour: time,
        date: dayMonthYear
    });
    return record
}


function createTimeOutEvent(record, date){
    let splitDate = date.split(' ')
    let dayMonthYear = splitDate[0]
    let time = parseInt(splitDate[1])
    record['timeOutEvents'].push({
        type: 'TimeOut',
        hour: time,
        date: dayMonthYear
    });
    return record
}

function hoursWorkedOnDate(record, date){
    let findDate = (element) =>{
        return element.date == date
    }
    let timeInEvent = record.timeInEvents.find(findDate)
    let timeOutEvent = record.timeOutEvents.find(findDate)
    
    return (timeOutEvent.hour - timeInEvent.hour) / 100
}

function wagesEarnedOnDate(record, date){
    let hoursWorked = hoursWorkedOnDate(record, date)
    let salary = record.payPerHour

    return hoursWorked * salary
}


function allWagesFor(record){
    let dates = record.timeInEvents.map(element => element.date);
    let totalSalary = 0
    dates.forEach(element => {
        totalSalary += wagesEarnedOnDate(record, element)
    });
    return totalSalary
}


function findEmployeeByFirstName(srcArray, firstName){
    let findEmployee = (element => element.firstName == firstName)
    return srcArray.find(findEmployee)
}

function calculatePayroll(employeeRec){
    let payRoll = employeeRec.reduce(( accumulator, currentValue)=>{
        return accumulator += allWagesFor(currentValue)
    },0)
    return payRoll
}



