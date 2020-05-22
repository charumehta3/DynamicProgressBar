function createProgressbar() {
    let barsCounter = 0;
    return function generateBars() {
        barsCounter++; 
        document.getElementById("showCount").innerHTML = "Number of clicks:::" + barsCounter;
        var myProgressDiv = document.createElement('div');
        myProgressDiv.className = "myProgress";
        var myBarDiv = document.createElement('div');
        myBarDiv.id = 'myBar' + barsCounter;
        myBarDiv.className = 'myBar';
        myProgressDiv.appendChild(myBarDiv);
        document.getElementById("progressbarContainer").appendChild(myProgressDiv);
        moveProgressBars(barsCounter);
    }
}


var completedPreviousBar = true;
var toBeCompletedBars = []

function moveProgressBars(count) {
    toBeCompletedBars.push(count);
    let interval = setInterval(function fn() {
        while (toBeCompletedBars.length > 0 && completedPreviousBar) {
            completedPreviousBar = false
            let elem = document.getElementById("myBar" + toBeCompletedBars.shift());
            let width = 1;
            let id = setInterval(function f() {
                if (width >= 100) {
                    console.log("clear internal timer !!!");
                    clearInterval(id);
                    completedPreviousBar = true;
                } else {
                    width++;
                    elem.style.width = width + "%";
                }
            }, 50);
        }
        if (toBeCompletedBars.length == 0) {
            console.log("clear main timer !!!");
            clearInterval(interval);
        }
    }, 500);
}
var showProgressbar = createProgressbar();
