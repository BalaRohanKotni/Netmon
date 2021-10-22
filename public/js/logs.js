const fromDatePicker = document.getElementById("from-picker");

fromDatePicker.value = "";

fromDatePicker.addEventListener('change', function(event){
    console.log(event);
    if(new Date(fromDatePicker.value).toLocaleString()!=="Invalid Date"){
        const LOGSUL = document.getElementsByClassName("logs-ul")[0];
        LOGSUL.innerHTML = "";
        let selectedDate = new Date(fromDatePicker.value);
        results.forEach(result => {
            let currentDate = new Date(result.createdAt);
            if(selectedDate.toDateString() == currentDate.toDateString()){
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

                LOGSUL.innerHTML+= `<li><div class="log">${dateTime+url+down+up+latency+jitter}</div></li>`
            }
        });
        if(LOGSUL.innerHTML===""){
            LOGSUL.innerHTML = "<center><h1 style=\"margin-top: 10vh;\">No Results</h1></center>";
        }
    }
    else{
        console.log("Invalid Date!!");
        window.location.reload();
    }
});