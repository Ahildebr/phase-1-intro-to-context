//Create Employee records 
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// Create a function createEmployeeRecords
function createEmployeeRecords(array){
    return array.map(employee => createEmployeeRecord(employee))
}


// Create a function createTimeInEvent
function createTimeInEvent(employee, dateStamp){
    let date = dateStamp.slice(0,10)
    let hour = dateStamp.slice(11)
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

// Create a function createTimeOutEvent
function createTimeOutEvent(employee, dateStamp){
    let date = dateStamp.slice(0,10)
    let hour = dateStamp.slice(11)
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }) 
    return employee
}

// Create a function hoursWorkedOnDate
function hoursWorkedOnDate(employee, date){
    let timeInEvent = employee.timeInEvents.find(event => event.date === date)
    let timeOutEvent = employee.timeOutEvents.find(event => event.date === date)
    let hoursworked = (timeOutEvent.hour - timeInEvent.hour) / 100
    return hoursworked
}

//Create a function wagesEarnedOnDate
function wagesEarnedOnDate(employee, date){
    let timeInEvent = employee.timeInEvents.find(event => event.date === date)
    let timeOutEvent = employee.timeOutEvents.find(event => event.date === date)
    let hoursworked = (timeOutEvent.hour - timeInEvent.hour) / 100
    return hoursworked * employee.payPerHour

}

//Create a function allWagesFor 
function allWagesFor(employee){
    let daysWorked = employee.timeInEvents.map(event => event.date)
    let totalWages = daysWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employee, date)
    }, 0)
    return totalWages
}

//Create a function calculatePayroll
function calculatePayroll(array){
    return array.reduce((total, employee) =>{
    return total + allWagesFor(employee)
    }, 0)
    
}