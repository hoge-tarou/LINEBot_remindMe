function setCalendarId(e) {
  properties.deleteProperty(userId);
  properties.setProperty(userId,e.message.text);
  postMessage('カレンダーIDを'+e.message.text+'で受け付けました。');
}
