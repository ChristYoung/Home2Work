var now = new Date(),
min = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()),
minPluse = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()+5),
startDateTell = null,
endDateTell = null;
var startTimeSelector,endTimeSelector;
startTimeSelector = mobiscroll.datetime('#startTime', {
    lang: 'zh',
    display: 'bottom',
    dateWheels: 'yy M d DD',
    min: min,
    onSet: function (event, inst) {
      var valueText = event.valueText,
          dateText = valueText.substring(0,valueText.indexOf(' ')),
          timeText = valueText.substring(valueText.indexOf(' '));
          dateArr = dateText.split('/'),
          timeArr = timeText.split(':');
          //dateArr[0]*100000+dateArr[1]*100000+dateArr[1]*10000+timeArr[0]*1000+timeArr[1]*100
      startDateTell = new Date(dateArr[0],dateArr[1]-1,dateArr[2],timeArr[0],timeArr[1]);  
      startDateTell.setMinutes(parseInt(timeArr[1])+5); //结束时间始终要比开始时间大5分钟
      endTimeSelector.option({min:startDateTell});
    }
});
endTimeSelector = mobiscroll.datetime('#endTime', {
    lang: 'zh',
    display: 'bottom',
    dateWheels: 'yy M d DD',
    min:minPluse,
    onSet: function (event, inst) {
      var valueText = event.valueText,
          dateText = valueText.substring(0,valueText.indexOf(' ')),
          timeText = valueText.substring(valueText.indexOf(' ')),
          dateArr = dateText.split('/'),
          timeArr = timeText.split(':');
          endDateTell = new Date(dateArr[0],dateArr[1]-1,dateArr[2],timeArr[0],timeArr[1]);
          endDateTell.setMinutes(parseInt(timeArr[1]-5));
          startTimeSelector.option({max:endDateTell});
    }
});