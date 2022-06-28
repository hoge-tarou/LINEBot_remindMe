function messageReply(e) {
  var message=[]; 


  if(e.message.text == 'その他の設定'){
    getOtherQuickReply(e);
    return;
  }

  if(e.message.text == '選択をやめる'){
    postMessage('中断しました。');
    return;
  }
  if(properties.getProperty("FixMode")==1){
    if(e.message.text=='中断'){
      postMessage('中断しました。');
    }else{
      setCalendarId(e);
    }
    properties.setProperty("FixMode",0);
    return;
  }

  if(e.message.text == 'カレンダーIDの修正'){
    postMessage('新しいカレンダーIDを入力してください。現在のIDは'+calendarId+'です。');
    properties.setProperty("FixMode",1);
    return ;
  }

  if(e.message.text=='カレンダーIDの確認'){
    if(properties.getProperty(userId)==null){
      postMessage("カレンダーIDは登録されていません。");
    }else{
      postMessage("現在のカレンダーIDは"+properties.getProperty(userId)+"です。");
    }
    return;
  }
  
  if(properties.getProperty(userId)==null){
    setCalendarId(e);
    return;
  }else{
    try {
      var calendarTest = CalendarApp.getCalendarById(calendarId);
      var getCalenderTest = calendarTest.getEventsForDay(new Date());

    } catch (e) {
      postMessage('カレンダーの情報が読み取れませんでした。\n・カレンダーの設定で、「dounyukensyu026」とカレンダーが共有されているか\n・登録したカレンダーIDが正しいかご確認ください。\n現在のID：'+calendarId);
      return ;
    }
  }


  if(e.message.text == '予定の表示'){
    //クイックリプライ呼び出し
    getQuickReply(e);
    return;
  
  //クイックリプライの選択肢に沿う分岐1
  }else if(e.message.text == '今日の予定'){  //今日の予定一覧を表示する
    message.push(getNDaysAfterEvent(0));

  //クイックリプライの選択肢に沿う分岐2
  }else if(e.message.text == '明日の予定'){
    message.push(getNDaysAfterEvent(1));
  
  //今日のこれからの予定と、明日以降の予定をリマインドさせる
  }else if(e.message.text == 'リマインド機能オン'){
    checkTrigger=1;
    properties.setProperty('checkTrigger',checkTrigger);
    setTodayTrigger();
    message.push("リマインド機能をオンにしました");
  }else if(e.message.text == 'リマインド機能オフ'){
    checkTrigger=0;
    properties.setProperty('checkTrigger',checkTrigger);
    deleteRemindTrigger();
    deleteTodayTrigger();
    deleteTomorrowTrigger();
    message.push('リマインド機能をオフにしました');

  }else if(e.message.text == "リマインド機能の確認"){
    var checkTriggerMessage;
    if(checkTrigger==1){
      checkTriggerMessage="オン";
    }else{
      checkTriggerMessage="オフ";
    }
    message.push("現在のリマインド機能は"+checkTriggerMessage+"になっています。");
  }
  else if(e.message.text == '予定の登録'){
    registerMode=0;
    message.push(register(e));
  
  }else if(!(registerMode == NaN||registerMode == 0)){
    if(e.message.text == '中断'){
      registerMode=100;
      message.push(register(e));
    }else{
      message.push(register(e));
    }  

  }else{
    message.push('そのほかの文字を入力してください。');
  }
  message = message.join('');

  return postMessage(message);
}

