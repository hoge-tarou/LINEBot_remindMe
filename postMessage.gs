// method for post message to LINE
function postMessage(message) {
 //var url = 'https://api.line.me/v2/bot/message/push'; // Send broadcast message API (all following users without user_id)
  var url = 'https://api.line.me/v2/bot/message/broadcast';  // Sends a push message to a user, group, or room API

  var headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: 'Bearer ' + accessToken,
  };

  var postData = {
    to: userId,
    // to: user_id,
    messages: [
      {
        type: 'text',
        text: message,
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