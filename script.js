
var DateTime = luxon.DateTime;

var headerDate = DateTime.now();
headerDate = headerDate.toLocaleString(DateTime.DATE_HUGE);

const workTimes = ['8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm'];
const workTimeNumbers = [8,9,10,11,12,13,14,15,16,17];
const timeBlockEl = $('#time-block');
var currentDayEl = $('#currentDay');
var workdayContent = [];

var retrieveStoredContent = function() {
    var storedWorkdayContent = JSON.parse(localStorage.getItem('workdayTasks'));

    if(storedWorkdayContent) {
        workdayContent = storedWorkdayContent;
    }
}
retrieveStoredContent();
var updateCurrentDay = function() {
    $(currentDayEl).text(headerDate);
};

var buildTimeBlocks = function() {
    var hourTime = DateTime.now().hour;
     for (var i=0; i < workTimes.length; i++) {
        const contentSection = $('<section>');
        contentSection.addClass('row h-auto content-section');
        const hourDiv = $('<div>')
            .addClass('hour col d-flex flex-column justify-content-center text-center')
            .text(workTimes[i]);
        contentSection.append(hourDiv);
         const workdayContentDiv = $('<textarea>')
         .addClass('col-10 text-dark content-task')
         .attr('id', i)
     contentSection.append(workdayContentDiv);
     workdayContent.forEach(function(workdayTask) {
         if(workdayTask.id == i) {
             workdayContentDiv.val(workdayTask.workdayTask)
         }
     });
 const btnElement = $('<button>')
 .addClass('saveBtn col d-flex flex-column justify-content-center align-items-center')
 .text('Save')
 .attr('id', i)
contentSection.append(btnElement);

timeBlockEl.append(contentSection);

if(workTimeNumbers[i] === hourTime) {
 workdayContentDiv.addClass('present');
} 
else if (workTimeNumbers[i] < hourTime) {
 workdayContentDiv.addClass('past');
}
else {
 workdayContentDiv.addClass('future');
}
} 
};

buildTimeBlocks();
updateCurrentDay();

var saveButtonClick = function(event) {
    const id = event.target.id;
    const clickedContent = $(`.content-task[id=${id}]`);

    var textContent = clickedContent.val();
    updateLocalStorage(textContent, id);
};

var updateLocalStorage = function(textContent, id) {
    for(var i = 0; i < workdayContent.length; i++) {
        if(workdayContent[i].id === id) {
            workdayContent[i].workdayTask = textContent;
            break;          
        }
        else {
            workdayContent.push({
                id: id,
                workdayTask: textContent,
            });
            break;
        }
    }
    if(workdayContent.length === 0) {
        workdayContent.push({
            id: id,
            workdayTask: textContent,
        });
    }
    localStorage.setItem('workdayTasks', JSON.stringify(workdayContent));
    
};
