function getSelectedDayEvent(selectedDate){
  
  var selectedDateAry = [];
  selectedDateAry = selectedDate.split('-');
  const targetDay = new Date(selectedDateAry[0], selectedDateAry[1] - '1', selectedDateAry[2]);
  
  var calendarGet = CalendarApp.getCalendarById(calendarId);
  var targetDayEvents = calendarGet.getEventsForDay(targetDay);
  
  var returnEventInformation = [];
 
  for(var i in targetDayEvents){
    var eventTitle = targetDayEvents[i].getTitle();
    returnEventInformation.push(eventTitle);

    var eventStartTime = targetDayEvents[i].getStartTime();
    eventStartTime = Utilities.formatDate(eventStartTime, 'JST', 'HH:mm');
    returnEventInformation.push('開始時間： ' + eventStartTime);

    var eventEndTime = targetDayEvents[i].getEndTime();          
      eventEndTime = Utilities.formatDate(eventEndTime, 'JST', 'HH:mm');
    returnEventInformation.push('終了時間： ' + eventEndTime);
  }

  return returnEventInformation;
}