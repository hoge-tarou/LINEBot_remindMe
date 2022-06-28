//n日後のカレンダー情報へアクセス
function getCalendar(nDaysAfter){
  //今日
  var today = new Date();
  //予定を取得したい日にち
  var targetDay = new Date();
  targetDay.setDate(today.getDate() + nDaysAfter);
  
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