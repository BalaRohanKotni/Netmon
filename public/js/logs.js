let textTab = document.getElementById("text-tab");
let graphTab = document.getElementById("graph-tab");
let textContent = document.getElementById("text");
let graphContent = document.getElementById("graph");


textTab.addEventListener("click", () => {
    graphContent.style.display = "none";
    textContent.style.display = "block";
    graphTab.classList.remove("active");
    textTab.classList.add("active");
})

graphTab.addEventListener("click", () => {
    textContent.style.display = "none";
    graphContent.style.display = "block";
    textTab.classList.remove("active");
    graphTab.classList.add("active");
})