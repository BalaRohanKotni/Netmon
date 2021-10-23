// variable: results  is declared in index.ejs

const CHART = document.getElementById("chart");
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

if (new Date().getFullYear() % 4 == 0) {
  monthDays = 29;
}

let latest50results = results.slice(-50).reverse();

console.log(results.length);

function oneDayBack(theDate) {
  let [month, date, year] = [
    theDate.getMonth(),
    theDate.getDate(),
    theDate.getFullYear(),
  ].map((x) => Number.parseInt(x));

  // date handling
  if (date !== 1) {
    date--;
  } else {
    month--;
    date = monthDays[month];
    if (month == -1) {
      date = monthDays[11];
    }
  }

  // leap year handling
  if (year % 4 == 0) {
    if (month == 1 && date == 28) {
      date = 29;
    }
  }

  // year handling
  if (month == -1) {
    year--;
    month = 11;
  }
  return [month + 1, date, year];
}

let currentTime = new Date();
let oneDayBackDate = new Date(oneDayBack(currentTime));

let labelsTime = [];
let downloadData = [];
let uploadData = [];
let urls = [];

results.forEach((result) => {
  if (
    new Date(result.createdAt).toLocaleDateString() ==
    oneDayBackDate.toLocaleDateString()
  ) {
    if (
      Number.parseInt(currentTime.getHours()) <=
        Number.parseInt(new Date(result.createdAt).getHours()) &&
      Number.parseInt(currentTime.getMinutes()) <=
        Number.parseInt(new Date(result.createdAt).getMinutes())
    ) {
      // labelsTime.push((result.createdAt));
      labelsTime.push(new Date(result.createdAt).toLocaleTimeString());
      downloadData.push(result.downloadBandwidth);
      uploadData.push(result.uploadBandwidth);
      urls.push(result.resultURL);
    }
  }
  if (
    new Date(result.createdAt).toLocaleDateString() ==
    currentTime.toLocaleDateString()
  ) {
    if (
      Number.parseInt(currentTime.getHours()) >=
        Number.parseInt(new Date(result.createdAt).getHours()) &&
      Number.parseInt(currentTime.getMinutes()) >=
        Number.parseInt(new Date(result.createdAt).getMinutes())
    ) {
      // labelsTime.push(result.createdAt);
      labelsTime.push(new Date(result.createdAt).toLocaleTimeString());
      downloadData.push(result.downloadBandwidth);
      uploadData.push(result.uploadBandwidth);
      urls.push(result.resultURL);
    }
  }
});
console.log(labelsTime.length);

// for (let i = latest50results.length - 1; i >= 0; i--) {

//   let result = latest50results[i];

// downloadData.push(result.downloadBandwidth);
//   uploadData.push(result.uploadBandwidth);

//   let dateTime = new Date(result.createdAt);

//   let iTime = dateTime;
//   if(iTime.toLocaleDateString() == oneDayBack.toLocaleDateString){
//     let [iHours, iMinutes] = [iTime.getHours(), iTime.getMinutes()].map(x=>Number.parseInt(x));
//     let [bHours, bMinutes] = [oneDayBack.getHours(), oneDayBack.getMinutes()].map(x=>Number.parseInt(x));
//     console.log(iHours, bHours);
//     if(iHours<=bHours && iMinutes<=bMinutes){
//     }
//   }
//   else if(iTime.toLocaleDateString() == currentTime.toLocaleDateString()){

//   }

//   let onlyTime = dateTime.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   labelsTime.push(onlyTime);

//   urls.push(result.resultURL);
// }

Chart.defaults.scale.ticks.beginAtZero = true;
let barChart = new Chart(
  CHART,

  {
    type: "bar",
    data: {
      labels: labelsTime,
      // labels: "absdafasaasdas",
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
        },
      ],
    },
    events: ["click"],
    options: {
      color: "#fff",
      maintainAspectRatio: false,
      // scales: {
      //   x: {

      //     type: 'time',
      //     ticks: {
      //       source: 'auto'
      //     },
      //     barThickness: 100,
      //   }
      // }
    },
  }
);

function barChartClickHandler(click) {
  const points = barChart.getElementsAtEventForMode(
    click,
    "nearest",
    { intersect: true },
    true
  );
  console.log(urls[points[0].index]);
  window.open(urls[points[0].index]);
}

CHART.onclick = barChartClickHandler;
