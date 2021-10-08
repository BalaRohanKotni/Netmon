let logsTab = document.getElementById("logs-tab");
let graphTab = document.getElementById("graph-tab");
let textContent = document.getElementById("logs");
let graphContent = document.getElementById("graph");


logsTab.addEventListener("click", () => {
    graphContent.style.display = "none";
    textContent.style.display = "block";
    graphTab.classList.remove("active");
    logsTab.classList.add("active");
})

graphTab.addEventListener("click", () => {
    textContent.style.display = "none";
    graphContent.style.display = "block";
    logsTab.classList.remove("active");
    graphTab.classList.add("active");
})


