
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

