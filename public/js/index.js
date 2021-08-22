// variable: results  is declared in index.ejs

// const CHART = document.getElementById("chart").getContext("2d");
const CHART = document.getElementById("chart")
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


function getObjByDate(date) {
    // Test Case: date = Aug 12 2021 - 12:3
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

let latest50results = results.slice(-50).reverse()

console.log(results.length);

let labelsTime = [];
let downloadData = [];
let uploadData = [];
let urls = [];

// iterate the list latest50results backwards to be efficient
for (let i = latest50results.length - 1; i >= 0; i--) {

    let result = latest50results[i];

    downloadData.push(result.downloadBandwidth);
    uploadData.push(result.uploadBandwidth);

    // from dateTime remove date and get only time, eg: Aug 12 2021 - 20:12 = 20:12
    let onlyTime = result.time.split(' - ')[1];
    labelsTime.push(onlyTime);

    urls.push(result.resultURL);
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
        events: ['click'],
        options: {
            color: "#fff",
            maintainAspectRatio: false,
        },
    }
);

function barChartClickHandler(click) {
    const points = barChart.getElementsAtEventForMode(click, 'nearest', { intersect: true }, true);
    console.log(urls[points[0].index]);
    window.open(urls[points[0].index]);
}

CHART.onclick = barChartClickHandler;
