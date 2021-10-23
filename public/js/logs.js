const fromDatePicker = document.getElementById("from-picker");
const toDatePicker = document.getElementById("to-picker");
const LOGSUL = document.getElementsByClassName("logs-ul")[0];

fromDatePicker.value = "";
toDatePicker.value = moment().format("YYYY-MM-DD");


function sortLOGSUL(currentDate, result){
    let dateTime = currentDate.toLocaleString('en', {month: "short",day: "2-digit", year: "numeric", hour: "numeric", minute: "numeric"});
    dateTime = `<div class="log-timestamp">${dateTime}</div>`
    
    let url = result.resultURL;
    url =  `<div class="log-url"><a href="${url}">URL</a></div>`
    
    let down = result.downloadBandwidth.toFixed(2);
    down = `<div class="log-download">Down↓:${down}</div>`;
    
    let up = result.uploadBandwidth.toFixed(2);
    up = `<div class="log-upload">Up↑: ${up}</div>`

    let latency = result.latency;
    latency = `<div class="log-latency">Latency: ${latency}</div>`;

    let jitter = result.jitter;
    jitter = `<div class="log-jitter">Jitter: ${jitter}</div>`

    return `<li><div class="log">${dateTime+url+down+up+latency+jitter}</div></li>`
}

fromDatePicker.addEventListener('change', function(event){
    
    if(new Date(fromDatePicker.value).toLocaleString()!=="Invalid Date" && (toDatePicker.value==="" || moment().format("YYYY-MM-DD"))){
        toDatePicker.value = fromDatePicker.value;
        LOGSUL.innerHTML = "";
        let selectedDate = new Date(fromDatePicker.value);
        LOGSUL.innerHTML = "<center><h1 style=\"margin-top: 10vh;\">Loading...</h1></center>";
        let bigString = "";
        results.forEach(result => {
            let currentDate = new Date(result.createdAt);
            if(selectedDate.toDateString() == currentDate.toDateString()){
                bigString+= sortLOGSUL(currentDate, result);
            }
        });
        LOGSUL.innerHTML= bigString;
        if(LOGSUL.innerHTML===""){
            LOGSUL.innerHTML = "<center><h1 style=\"margin-top: 10vh;\">No Results</h1></center>";
        }
    }
    else if(toDatePicker.value==="" || moment().format("YYYY-MM-DD")){
        console.log("Invalid Date!!");
        window.location.reload();
    }
});

toDatePicker.addEventListener("change", function(event){
    if(toDatePicker.value !== "" && fromDatePicker.value === ""){
        let pickedDate = new Date(toDatePicker.value);
        LOGSUL.innerHTML = "<center><h1 style=\"margin-top: 10vh;\">Loading...</h1></center>";
        let bigString = "";
        results.forEach(result => {
            let currentDate = new Date(result.createdAt);
            if(
                currentDate.getDate() <= pickedDate.getDate() &&
                currentDate.getMonth() <= pickedDate.getMonth() &&
                currentDate.getFullYear() <= pickedDate.getFullYear()
            ){
                bigString += sortLOGSUL(currentDate, result);
            }
        });
        LOGSUL.innerHTML = bigString;
        if(LOGSUL.innerHTML===""){
            LOGSUL.innerHTML = "<center><h1 style=\"margin-top: 10vh;\">No Results</h1></center>";
        }
    }
    else if(toDatePicker !== "" && fromDatePicker !== ""){
        let fromDate = new Date(fromDatePicker.value);
        let toDate = new Date(toDatePicker.value);
        LOGSUL.innerHTML = "<center><h1 style=\"margin-top: 10vh;\">Loading...</h1></center>";
        let bigString = "";
        results.forEach(result => {
            let currentDate = new Date(result.createdAt);
            if(
                fromDate.getDate() <= currentDate.getDate() && (currentDate.getDate() <= toDate.getDate()) &&
                fromDate.getMonth() <= currentDate.getMonth() && (currentDate.getMonth() <= toDate.getMonth()) &&
                fromDate.getYear() <= currentDate.getYear() && (currentDate.getYear() <= toDate.getYear())
            ){
                bigString += sortLOGSUL(currentDate, result);
            }
        });
        LOGSUL.innerHTML = bigString;
        if(LOGSUL.innerHTML===""){
            LOGSUL.innerHTML = "<center><h1 style=\"margin-top: 10vh;\">No Results</h1></center>";
        }
    }

});