function remind(task){
  
  var args = getargs(task.triggerUid);
  
  var remind_message = []; 
  remind_message.push(
    '予定の１５分前になりました'+
       '予定：'+ args.task +
        '\n' +
       '開始時間： ' +
         args.start +
       '、 終了時間：' +
         args.end +
     '\n'
   );

  remind_message = remind_message.join('');
  return postMessage(remind_message);

}
// プロパティストアからトリガーのidをキーとして引数を取り出す。
function getargs(triggerUid) {
  var obj = JSON.parse(properties.getProperty(triggerUid));
  return obj['args'];
}
 