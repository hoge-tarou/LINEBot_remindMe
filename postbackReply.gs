function postbackReply(e) {
  //ポストバックされたデータを取得
  var data = e.postback.data;
  //カンマ区切りで配列に分解
  //var dataAry = data.split(",");
  if(data == '明後日以降'){
    var selectedDate = e.postback.params.date;
  }

  var replyToken = e.replyToken;
  // Send broadcast message API (all following users without user_id)
  //var url = 'https://api.line.me/v2/bot/message/push'; 
  // Sends a push message to a user, group, or room API
  var url = 'https://api.line.me/v2/bot/message/broadcast';  

  //選択した日付を、返すmessageに追加
  var message = '選択した日付 : ' + selectedDate + '\n';

  //選択した日付を渡す。イベントをメッセージに追加
  var selectedDayEventInformation = getSelectedDayEvent(selectedDate);

  //getSelectedDayEvent関数から戻ってきた文字列配列で分岐
  if(selectedDayEventInformation.length == 0){
    message += '予定は特にありません。'
  }else{
    for(var k in selectedDayEventInformation){
      message += selectedDayEventInformation[k] + '\n';
    }
    message += 'です。'
  }

  //postするための記述
  var headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: 'Bearer ' + accessToken,
  };

  var postData = {
    to: userId,
    "replyToken": replyToken,
    messages: [
      {
        type: 'text',
        text: message
      },
    ],
  };

  var options = {
    method: 'post',
    headers: headers,
    payload: JSON.stringify(postData),
  };

  return UrlFetchApp.fetch(url, options);
}
