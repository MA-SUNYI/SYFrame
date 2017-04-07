 var weekday = new Array(7);
 weekday[0] = "周日";
 weekday[1] = "周一";
 weekday[2] = "周二";
 weekday[3] = "周三";
 weekday[4] = "周四";
 weekday[5] = "周五";
 weekday[6] = "周六";

 function InterviewWeek(start, end, week, time) {
     var today = new Date();
     var todayTime = today.getTime();
     var todayDay = today.getDate();
     var todayWeek = today.getDay()
     var endTime = (new Date(end)).getTime();
     var todayFormat = (new Date(todayTime).format("yyyy-MM-dd"));

     var interviewweek = [];
     var days = endTime - todayTime;
     var count = parseInt(days / (1000 * 60 * 60 * 24));

     for (var i = 1; i <= count + 1; i++) {
         var witem = { item: '', day: '' };
         var countdate = addDate(todayTime, i);
         witem.day = countdate;
         var countweek = (new Date(countdate)).getDay();
         witem.item = countdate + '(' + weekday[countweek] + ')' + time;

         week.forEach(function(wwitem, wwindex) {
             if (countweek == wwitem) {
                 interviewweek.push(witem);
             }
         });
     }
     return interviewweek;
 }

 // 日期，在原有日期基础上，增加days天数，默认增加1天
 function addDate(date, days) {
     if (days == undefined || days == '') {
         days = 1;
     }
     var date = new Date(date);
     date.setDate(date.getDate() + days);
     var month = date.getMonth() + 1;
     var day = date.getDate();
     return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
 }

 // 日期月份/天的显示，如果是1位数，则在前面加上'0'
 function getFormatDate(arg) {
     if (arg == undefined || arg == '') {
         return '';
     }
     var re = arg + '';
     if (re.length < 2) {
         re = '0' + re;
     }
     return re;
 }

 function DaysInterval(yy, mm, dd, prenext, interval) {
     var s, d, d2, t, t2;
     var str = yy + '/' + mm + '/' + dd
     t = new Date(str);
     t2 = interval * 1000 * 3600 * 24;
     if (prenext == 'pre') {
         t -= t2;
     } else {
         t += t2;
     }
     d = new Date(t);

     s = d.getFullYear() + "-";
     s += ("00" + (d.getMonth() + 1)).slice(-2) + "-";
     s += ("00" + d.getDate()).slice(-2);

     return s.replace(/\-/g, "/");
 }

 function getNowFormatDate() {
     var date = new Date();
     var seperator1 = "-";
     var seperator2 = ":";
     var month = date.getMonth() + 1;
     var strDate = date.getDate();
     if (month >= 1 && month <= 9) {
         month = "0" + month;
     }
     if (strDate >= 0 && strDate <= 9) {
         strDate = "0" + strDate;
     }
     var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
         " " + date.getHours() + seperator2 + date.getMinutes() +
         seperator2 + date.getSeconds();
     return currentdate;
 }


 //时间重载  (new Date(todayTime).format("yyyy-MM-dd"))
 Date.prototype.format = function(fmt) {
     var o = {
         "M+": this.getMonth() + 1, //月份 
         "d+": this.getDate(), //日 
         "h+": this.getHours(), //小时 
         "m+": this.getMinutes(), //分 
         "s+": this.getSeconds(), //秒 
         "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
         "S": this.getMilliseconds() //毫秒 
     };
     if (/(y+)/.test(fmt)) {
         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
     }
     for (var k in o) {
         if (new RegExp("(" + k + ")").test(fmt)) {
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
         }
     }
     return fmt;
 }