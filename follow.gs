function follow(e) {
  postMessage('初めまして！まず始めに予定を表示したいカレンダーのidを教えてください。(例：xxxxxx@gmail.com');
  
  properties.deleteProperty(userId);
  checkTrigger=0;
  properties.setProperty("checkTrriger",checkTrigger);
  properties.setProperty("registerMode",0);
}
