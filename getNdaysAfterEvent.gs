function getNDaysAfterEvent(nDaysAfter){
  var eventInformation = getCalendar(nDaysAfter);
  
  var eventMessage = '';
  
  //何日後かで場合分け
  if(nDaysAfter == 0){
    eventMessage += '今日の予定は、\n';
  }else if(nDaysAfter == 1){
    eventMessage += '明日の予定は、\n';
  }else{
    eventMessage +=  nDaysAfter + '日後の予定は、\n';
  }

  if(eventInformation.length == 0){
    eventMessage += '特にありません。';
  }else{
    for(var k in eventInformation){
      eventMessage += eventInformation[k] + "\n";
    }
    eventMessage += 'です。';
  }

  return eventMessage;
}

