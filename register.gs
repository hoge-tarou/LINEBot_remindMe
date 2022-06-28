var scriptProperties = PropertiesService.getScriptProperties();

function register(e) {    
  //予定の登録が始まったとき
  if(registerMode==0){
    registerMode=1;
    properties.setProperty("RegisterMode",registerMode);     //次の予定の名前を入力するフェーズへ移行(registerMode=1)
    return '予定の名前を入力してください';
  
  //予定の名前受け取りフェーズ
  }else if(registerMode　==　1){
    scriptProperties.setProperty("Name",e.message.text);  //予定の名前をＮａｍｅに格納
    registerMode=2;
    properties.setProperty("RegisterMode",registerMode);     //次の予定の開始時間を入力するフェーズへ移行(registerMode=2)
    replyMessage(e.replyToken,createQuickReplyMsg('開始'));
  
  //開始時刻受け取りフェーズ
  }else if(registerMode　==　2){
    if (e.type == "postback"){
      //ポストバックされたデータを取得
      var data = e.postback.data;
      //カンマ区切りで配列に分解
      var dataAry = data.split(",");
      
      var actType = dataAry[0];  //"開始"または"終了"
      var actTime = dataAry[1];  //何時何分
      var actYear = new Date().getFullYear();
      var actMonth = new Date().getMonth()+1;
      var actDate = new Date().getDate();

      //時刻選択ダイアログからの時刻選択の場合
      if (actTime == "時刻選択"){
        //選択された時刻を取得
        
        var dateTimeAry = e.postback.params.datetime.split('T');
        date = dateTimeAry[0].split('-');
        actYear = Number(date[0]);
        actMonth = Number(date[1]);
        actDate = Number(date[2]);
        actTime = dateTimeAry[1];
      }
      
      //timeAry==xx:xxの時刻表示のため、「:」で区切り時間と分を分ける　　　←ここまでは確認済み
      var timeAry = actTime.split(":");
      var eventDate=new Date();
      eventDate.setFullYear(Number(actYear));
      eventDate.setMonth(Number(actMonth)-1);
      eventDate.setDate(Number(actDate));
      eventDate.setHours(Number(timeAry[0]));  //「ｘ時」の取得
      eventDate.setMinutes(Number(timeAry[1])); //「ｘ分」の取得
     
     }else{
      postMessage('ポストバッグではありません'); 
      replyMessage(e.replyToken,createQuickReplyMsg('開始'));
    }
    scriptProperties.setProperty("Start",eventDate); //予定の開始時間をStartに格納
    registerMode=3;
    properties.setProperty("RegisterMode",registerMode);              ////次の予定の終了時間を入力するフェーズへ移行(registerMode=3)
    replyMessage(e.replyToken,createQuickReplyMsg('終了'));
 
  
  //終了時刻受け取りフェーズ
  }else if(registerMode==3){
    if (e.type == "postback"){
      
      //ポストバックされたデータを取得
      var data = e.postback.data;
      //カンマ区切りで配列に分解
      var dataAry = data.split(",");
      
      var actType = dataAry[0];  //"開始"または"終了"
      var actTime = dataAry[1];  //何時何分
      var actYear = new Date().getFullYear();
      var actMonth = new Date().getMonth();
      var actDate = new Date().getDate();

      //時刻選択ダイアログからの時刻選択の場合
      if (actTime == "時刻選択"){
        //選択された時刻を取得
        
        var dateTimeAry = e.postback.params.datetime.split('T');
        date = dateTimeAry[0].split('-');
        actYear = date[0];
        actMonth = date[1];
        actDate = date[2];
        actTime = dateTimeAry[1];

      }
      
      //timeAry==xx:xxの時刻表示のため、「:」で区切り時間と分を分ける　　　←ここまでは確認済み
      var timeAry = actTime.split(":");
      var eventDate=new Date();
      eventDate.setFullYear(Number(actYear));
      eventDate.setMonth(Number(actMonth)-1);
      eventDate.setDate(Number(actDate));
      eventDate.setHours(Number(timeAry[0]));  //「ｘ時」の取得
      eventDate.setMinutes(Number(timeAry[1])); //「ｘ分」の取得

     }else{
      postMessage('ポストバッグではありません'); 
      replyMessage(e.replyToken,createQuickReplyMsg('終了'));
    }
    /*実装途中
    if(new Date(scriptProperties.getProperty("Start")) < new Date(eventDate)){
      postMessage('終了時刻が開始時刻より前です。');
      replyMessage(e.replyToken,createQuickReplyMsg('終了'));
    }*/
    scriptProperties.setProperty("End",eventDate);  //予定の終了時間をEndに格納
    registerMode=4;
    properties.setProperty("RegisterMode",registerMode);              ////次の予定のメモを入力するフェーズへ移行(registerMode=4)
    return '予定メモを入力してください';
  
  //メモ受け取りフェーズ
  }else if(registerMode==4){   

    //それぞれの値を取り出す      
    var taskMemo=e.message.text;
    var taskName=scriptProperties.getProperty("Name");
    var taskStart=new Date(scriptProperties.getProperty("Start"));
    var taskEnd=new Date(scriptProperties.getProperty("End"));    
    
    /*//カレンダーに登録する情報の確認を流す
    postMessage('name='+taskName);
    postMessage('start='+taskStart);
    postMessage('end='+taskEnd);
    postMessage('taskMemo='+taskMemo);*/

    //カレンダーに登録する
    var myCalendar = CalendarApp.getCalendarById(calendarId);
    myCalendar.createEvent(taskName,taskStart, taskEnd,{description:taskMemo});
    registerMode=0;
    properties.setProperty("RegisterMode",registerMode);              ////予定の登録が完了したので、初期フェーズへ移行(registerMode=0)
    if(checkTrigger==1){
      setTodayTrigger();
    }
    return '予定の登録を受け付けました';
 
  //任意の意向フェーズから外れた場合
  }else{
    registerMode=0;
    properties.setProperty("RegisterMode",registerMode);     //registerModeを初期フェーズに修正
    return '予定入力をキャンセルします';
  }
}

//ポストバック処理関数

function postbackData(e){
    //ポストバックされたデータを取得
      var data = e.postback.data;
      //カンマ区切りで配列に分解
      var dataAry = data.split(",");
      
      var actType = dataAry[0];  //"開始"または"終了"
      var actTime = dataAry[1];  //何時何分
      var actYear = new Date().getFullYear();
      var actMonth = new Date().getMonth();
      var actDate = new Date().getDate();

      //時刻選択ダイアログからの時刻選択の場合
      if (actTime == "時刻選択"){
        //選択された時刻を取得
        
        var dateTimeAry = e.postback.params.datetime.split('T');
        date = dateTimeAry[0].split('-');
        actYear = date[0];
        actMonth = date[1];
        actDate = date[2];
        actTime = dateTimeAry[1];

      }
      
      //timeAry==xx:xxの時刻表示のため、「:」で区切り時間と分を分ける　　　←ここまでは確認済み
      var timeAry = actTime.split(":");
      var eventDate=new Date();
      eventDate.setFullYear(Number(actYear));
      eventDate.setMonth(Number(actMonth)-1);
      eventDate.setDate(Number(actDate));
      eventDate.setHours(Number(timeAry[0]));  //「ｘ時」の取得
      eventDate.setMinutes(Number(timeAry[1])); //「ｘ分」の取得
      postMessage(eventDate);

      return eventDate;
}
//クイックリプライ関数
function createQuickReplyMsg(actType){
  // 現在時刻を15分単位で取得
  var dt_now = new Date();
  dt_now.setMinutes(dt_now.getMinutes() - (dt_now.getMinutes() % 15) );
  // 15分前の時刻を取得
  var dt_before15 = new Date();
  dt_before15.setMinutes(dt_now.getMinutes() - 15);
  // 15分後の時刻を取得
  var dt_after15 = new Date();
  dt_after15.setMinutes(dt_now.getMinutes() + 15);

  var msg = [
    {
      "type": "text",
      "text": "下のボタンより、予定の" + actType + "時間を選択してください。",
      "quickReply": {
        "items": [
          {
            "type": "action",
            "action": {
              "type": "postback",
              "label": Utilities.formatDate(dt_before15, 'Asia/Tokyo', 'HH:mm'),
              "displayText": Utilities.formatDate(dt_before15, 'Asia/Tokyo', 'HH:mm'),
              "data": actType + "," + Utilities.formatDate(dt_before15, 'Asia/Tokyo', 'HH:mm')
            }
          },
          {
            "type": "action",
            "action": {
              "type": "postback",
              "label": Utilities.formatDate(dt_now, 'Asia/Tokyo', 'HH:mm'),
              "displayText": Utilities.formatDate(dt_now, 'Asia/Tokyo', 'HH:mm'),
              "data": actType + "," + Utilities.formatDate(dt_now, 'Asia/Tokyo', 'HH:mm')
            }
          },
          {
            "type": "action",
            "action": {
              "type": "postback",
              "label": Utilities.formatDate(dt_after15, 'Asia/Tokyo', 'HH:mm'),
              "displayText": Utilities.formatDate(dt_after15, 'Asia/Tokyo', 'HH:mm'),
              "data": actType + "," + Utilities.formatDate(dt_after15, 'Asia/Tokyo', 'HH:mm')
            }
          },
          {
            "type": "action",
            "action": {
              "type": "datetimepicker",
              "label": "時刻選択",
              "mode": "datetime",
              "data": actType + "," + "時刻選択"
            }
          }
        ]
      }
    }
  ];

  return msg;
}

function deleteProperty(){
  properties.deleteAllProperties();
  scriptProperties.deleteAllProperties();
}