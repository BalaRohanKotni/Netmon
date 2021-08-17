// results is declared in index.ejs

const CHART = document.getElementById("chart").getContext("2d");
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


// function getNumByMonthName(month) {
//     return MONTHS.indexOf(month.substr(0, 3)) + 1;
// }

function getObjByDate(date) {
    // Aug 12 2021 - 12:3
    let month = date.split(' - ')[0].split(' ')[0].substr(0, 3);
    let day = date.split(' - ')[0].split(' ')[1];
    let year = date.split(' - ')[0].split(' ')[2];

    let hours = date.split(' - ')[1].split(':')[0];
    let mins = date.split(' - ')[1].split(':')[1];

    return {
        month: parseInt(MONTHS.indexOf(month) + 1),
        day: parseInt(day),
        year: parseInt(year),
        hours: parseInt(hours),
        mins: parseInt(mins),
    };
}
function goBackOneDay(date) {

    date = getObjByDate(date);

    let monthDayNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let month = date.month;
    let day = parseInt(date.day);
    let year = date.year;

    let hour = date.hours;
    let min = date.mins;

    if (day != 1) {
        return `${MONTHS[month - 1]} ${day - 1} ${year} - ${hour}:${min}`
    }
    else if (day == 1 && month != 1) {
        return `${MONTHS[month - 2]} ${monthDayNum[month - 2]} ${year} - ${hour}:${min}`
    }
    else if (day == 1 && month == 1) {
        return `Dec ${monthDayNum[12 - 2]} ${year - 1} - ${hour}:${min}`
    }
}

console.log("Total Speedtests:", results.length);

let last24hrsResults = [];

let currDate = new Date();
let currMonth = currDate.getMonth() + 1;//added 1, cuz: if the month is aug then it returns 7(+1)=8
let currDay = currDate.getDate();
let currYear = currDate.getFullYear();
let currHours = currDate.getHours()
let currMins = currDate.getMinutes();

let startDate = getObjByDate(goBackOneDay(`${MONTHS[currMonth - 1]} ${currDay} ${currYear} - ${currHours}:${currMins}`));
let startMonth = startDate.month;
let startDay = startDate.day;
let startYear = startDate.year;
let startHours = startDate.hours;
let startMins = startDate.mins;
console.log(currHours, startDate);

for (let i = results.length - 1; i > 0; i--) {

    let date = getObjByDate(results[i].time);
    let month = date.month;
    let day = date.day;
    let year = date.year;
    let hours = date.hours;
    let mins = date.mins;


    // console.log({ startMonth, month, currMonth }, { startYear, year, currYear }, { startDay, day, currDay }, { startHours, hours, currHours }, { startMins, mins, currMins });

    if (startHours <= hours <= currHours && startMins <= mins <= currMins) {

        if (startMonth <= month <= currMonth && (startDay == day || currDay == day) && startYear <= year <= currYear) {
            // console.log(results[i]);
            last24hrsResults.push(results[i]);
        }
    }

}

console.log(last24hrsResults);

let labelsTime = [];
let downloadData = [];
let uploadData = [];

for (let i = last24hrsResults.length - 1; i >= 0; i--) {
    let result = last24hrsResults[i];
    downloadData.push(result.downloadBandwidth);
    uploadData.push(result.uploadBandwidth);
    let onlyTime = result.time.split(' - ')[1];
    labelsTime.push(onlyTime);
}

Chart.defaults.scale.ticks.beginAtZero = true;
let barChart = new Chart(CHART,

    {
        type: "bar",
        data: {
            labels: labelsTime,
            datasets: [
                {
                    label: "Download Bandwidth",
                    backgroundColor: "#1fa8e7",
                    data: downloadData,
                },
                {
                    label: "Upload Bandwidth",
                    backgroundColor: "#bd71ff",
                    data: uploadData,
                }
            ],
        },
        options: {
            color: "#fff",
            maintainAspectRatio: false,
        },
    }
);
