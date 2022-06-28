function getQuickReply(e) {
  var date = new Date();
  
  var maxDate = new Date();
  maxDate.setDate(date.getDate() + 60);
  
  var minDate = new Date();
  minDate.setDate(date.getDate() + 2);

  var postData = {
    to: userId,
      "replyToken": e.replyToken,
      "messages": [{
              "type": "text",
              "text": "表示する予定の日付を選択してください。",
              "quickReply": {
                  "items": 
                    [
                      {
                          "type": "action",
                          "action": {
                              "type": "message",
                              "label": "今日の予定",
                              "text": "今日の予定"
                          }
                      },
                      {
                          "type" : "action",
                          "action" : {
                              "type" : "message",
                              "label" : '明日の予定',
                              "text" : "明日の予定"
                          }
                      },
                      {
                        "type": "action",
                        "action": {
                          "type": "datetimepicker",
                          "label": "明後日以降",
                          "mode": "date",
                          "data": "明後日以降",
                          "initial": Utilities.formatDate(date, "JST", "yyyy-MM-dd"),
                          "max": Utilities.formatDate(maxDate, "JST", "yyyy-MM-dd"),
                          "min": Utilities.formatDate(date, "JST", "yyyy-MM-dd")
                          }
                      }
                    ]
              }
          }

      ]
  };

  var options = {
      "method": "post",
      "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
      },
      "payload": JSON.stringify(postData)
  };

  var url = 'https://api.line.me/v2/bot/message/push'; // Send broadcast message API (all following users without user_id)
  //var url = 'https://api.line.me/v2/bot/message/broadcast';  // Sends a push message to a user, group, or room API
  UrlFetchApp.fetch(url, options);
  
}
