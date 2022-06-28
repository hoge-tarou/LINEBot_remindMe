//トリガー設定の有効・無効変数
var properties = PropertiesService.getUserProperties();
var registerMode=Number(properties.getProperty("RegisterMode"));
var fixCalenderIdMode=(properties.getProperty("FixMode"));
var checkTrigger = properties.getProperty('checkTrigger');

function doPost(e) {
  
  var jsonData = JSON.parse(e.postData.contents);
  userId = jsonData.events[0].source.userId;
  
  calendarId=String(properties.getProperty(userId));

  var events = JSON.parse(e.postData.contents).events;
  events.forEach(function(event) {
    // デバッグ用
    // postMessage(event.type);
    
    if(event.type == "message") {
      messageReply(event);
    }else if(event.type == "follow") {
      follow(event);
    } else if(event.type == "unfollow") {
      unFollow(event);
    }else if(event.type == "postback"){
      if(registerMode == 2 || registerMode == 3){
        postMessage(register(event));
      }else{
        postbackReply(event);
      }
    }else{
      postMessage('イベントタイプが識別できませんでした。');
    }
  });
}


