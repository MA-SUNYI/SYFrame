// 用法
// API().PostRequest(json).then(function(data) {
//     console.log(data);
// });
function API() {
    var apiurl = 'http://h5.demo5.keqida.cn';
    var apikey = 'e08cf9929c2b45219af7c6d6010a3fad';
    var _self = this;
    var api = new Object();

    var HttpHandlePost = function(url, json) {
        var promise = $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(json)
        });
        return promise;
    }

    var HttpHandleGet = function(url, json) {
        var promise = $.ajax({
            type: 'GET',
            url: url,
            data: JSON.stringify(json)
        });
        return promise;
    }

    api.ApiUrl = function() {
        return apiurl;
    }

    // Post请求
    api.PostRequest = function(json) {
        var url = apiurl;
        return HttpHandlePost(url, json);
    }

    // Get请求
    api.GetRequest = function(json) {
        var url = apiurl;
        return HttpHandleGet(url, json);
    }

    return api;
}