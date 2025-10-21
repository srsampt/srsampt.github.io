function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

const SUNDAY = 0;
const SATURDAY = 6;

let calendar = function(month, year, tableID) {
    prevMonth = month; // month in JS is 0-indexed
    currMonth = month - 1;
    let currMonthNumDays = daysInMonth(month, year);
    let prevMonthNumDays = daysInMonth(prevMonth, year);
    const startMonthDay = new Date(year, currMonth, 1).getDay();
    const endMonthDay = new Date(year, currMonth, currMonthNumDays).getDay();
    let weeks = {
        week1: []
    }
    if (startMonthDay != SUNDAY) {
        let calendarStartDate = prevMonthNumDays - (startMonthDay - 1);
        for (let i = calendarStartDate; i <= prevMonthNumDays; i++) {
            weeks.week1.push(i)
        }
        if (startMonthDay != SATURDAY) {
            for (let i = 1; i <= 7 - startMonthDay; i++) {
                weeks.week1.push(i)
            }     
        } else {
            weeks.week1.push(1)
        }
    } else {
        for (let i = 1; i <= 7; i++) {
            weeks.week1.push(i)
        }
    }

    let week2FirstDay = (weeks.week1.at(-1))+1
    let weekNum = 1;
    let newWeekStartDate = week2FirstDay;
    let currDay = week2FirstDay;

    for (let i = currDay; i <= currMonthNumDays; i += 7) {
        weekNum += 1;
        weeks[`week${weekNum}`] = [];

        for (let i = newWeekStartDate; i <= newWeekStartDate + 6; i++) {
            if (i > currMonthNumDays) {
                let calEndDate = 6 - endMonthDay;
                for (let j = 1; j <= calEndDate; j++) {
                    weeks[`week${weekNum}`].push(j);
                }
                break;
            }
            weeks[`week${weekNum}`].push(i);
        }
        newWeekStartDate += 7;
    }

  
    let calendar_grid = document.getElementById(tableID);

    Object.entries(weeks).forEach(([key, value]) => {
        let row = document.createElement('tr');
        calendar_grid.appendChild(row);
        value.forEach((day) => {
            let day_td = document.createElement('td');
            day_td.textContent = day;
            if (((key === "week1") && (day > 6)) || ((key === `week${Object.keys(weeks).length}`) && (day < 7))) {
                day_td.style.color = 'lightgray'
            }
            row.appendChild(day_td)

        })
        
    });



}


calendar(11, 2025, "calendar-grid");
