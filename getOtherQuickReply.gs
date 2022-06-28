function getOtherQuickReply(e) {
  var postData = {
    to: userId,
      "replyToken": e.replyToken,
      "messages": [{
              "type": "text",
              "text": "メッセージを選択してください。",
              "quickReply": {
                  "items": 
                    [
                      {
                          "type": "action",
                          "action": {
                              "type": "message",
                              "label": "カレンダーIDの確認",
                              "text": "カレンダーIDの確認"
                          }
                      },
                      {
                          "type" : "action",
                          "action" : {
                              "type" : "message",
                              "label" : 'カレンダーIDの修正',
                              "text" : "カレンダーIDの修正"
                          }
                      },
                      {
                          "type": "action",
                          "action": {
                              "type": "message",
                              "label": "リマインド機能オン",
                              "text": "リマインド機能オン"
                          }
                      },
                      {
                          "type": "action",
                          "action": {
                              "type": "message",
                              "label": "リマインド機能オフ",
                              "text": "リマインド機能オフ"
                          }
                      },
                      {
                          "type": "action",
                          "action": {
                              "type": "message",
                              "label": "リマインド機能の確認",
                              "text": "リマインド機能の確認"
                          }
                      },
                      {
                          "type": "action",
                          "action": {
                              "type": "message",
                              "label": "選択をやめる",
                              "text": "選択をやめる"
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
