// 引数に指定した時間にremindトリガーを設定
function setRemindTrigger(date) {
  /*var triggerDay = new Date();
  triggerDay.setDate(day);
  triggerDay.setHours(hour);
  triggerDay.setMinutes(minute);*/
  return ScriptApp.newTrigger("remind").timeBased().at(date).create();
  
}

//今日のそれぞれの予定の１５分前にremindを流すトリガーを設定
function setTodayTrigger(){

  deleteRemindTrigger();
  deleteTodayTrigger();
  
 for(var i=0;i<2;i++){    //今日、明日の２日間の予定を探す
  
    var today = new Date();　　//カレンダーから取る今日の日付
 
    today.setDate(today.getDate()+i);  //繰り返し分で今日(Date+0) と　明日(Date+1)の2回カレンダーから読み込む

    var myCalendar = CalendarApp.getCalendarById(calendarId);
    var remindTime = 15;  //リマインドの時間をイベント開始１５分前として設定 

    var myEvents = myCalendar.getEventsForDay(today);
    myEvents.forEach(function (event) {   //myEventsにある今日のイベントすべてをそれぞれforで参照
        
        
        var eventDate = event.getStartTime();
        var eventBeforeDate = event.getStartTime();
        eventBeforeDate.setMinutes(eventDate.getMinutes()-remindTime);
       

      if(today<eventBeforeDate){
        postMessage('today<event');
        eventStartTime = Utilities.formatDate(event.getStartTime(), 'JST', 'HH:mm');
        eventEndTime = Utilities.formatDate(event.getEndTime(), 'JST', 'HH:mm');

        trigger = setRemindTrigger(eventBeforeDate);
        var triggerUid = trigger.getUniqueId();
        var obj = {};
        obj['args']= {task: event.getTitle(),start:eventStartTime,end:eventEndTime};  // 「args」は単なる目印。削除の時に便利なので。
        properties.setProperty(triggerUid, JSON.stringify(obj));
      }
    })
  }

  setTomorrowTrigger();
}

//明日以降の0時にその日の予定のリマインダートリガーを設定
function setTomorrowTrigger(){
  var triggerDay = new Date();
  triggerDay.setDate(triggerDay.getDate()+1);
  triggerDay.setHours(0);
  triggerDay.setMinutes(0);
  console.log(triggerDay);
  ScriptApp.newTrigger("setTodayTrigger").timeBased().at(triggerDay).create();
}

function setTriggerByUpdateSchedule(){
  if(trigger_check==true){
    setTodayTrigger();
  }
}

//各予定のリマインダートリガーの全削除
function deleteRemindTrigger(){
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "remind") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

//今日の予定のリマインダー設定をするトリガーの全削除
function deleteTodayTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "setTodayTrigger") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

//明日の予定を読み込むトリガーの全削除
function deleteTomorrowTrigger(){
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "setTomorrowTrigger") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

