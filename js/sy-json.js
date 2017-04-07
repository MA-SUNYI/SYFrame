 //清除JSON字符串中的回车
 function JsonClear(json) {
     var resultStr = json.replace(/\ +/g, "");
     resultStr = json.replace(/[ ]/g, "");
     resultStr = json.replace(/[\r\n]/g, "");
     return resultStr;
 }

 //JSON对象拼接字符串
 //{ name:'test', item:'sunyi'}  ==> name=test&item=sunyi&
 function JsonObjToStr(json) {
     var post = '';
     for (var ever in json) {
         post = post + ever + '=' + json[ever] + '&';
     }
     return post;
 }