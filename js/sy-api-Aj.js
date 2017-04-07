angular
    .module('SYApp')
    .factory('API', function($resource, $state, config) {

        var HttpHandlePost = function(url, data) {
            var promise = $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/x-www-form-urlencoded',
                data: data
            });
            promise.done(function(data) {});
            promise.fail(function(data) {});
            promise.always(function(data) {});
            return promise;
        }

        var HttpHandleGet = function(url, data) {
            var promise = $.ajax({
                type: 'GET',
                url: url,
                contentType: 'application/x-www-form-urlencoded',
                data: data
            });
            promise.done(function(data) {});
            promise.fail(function(data) {});
            promise.always(function(data) {});
            return promise;
        }

        return {
            // POST请求
            PostRequest: function(data) {
                var url = 'url';
                return HttpHandlePost(url, data);
            },
            // GET请求
            GetRequest: function(json) {
                var url = 'url';
                return HttpHandleGet(url, json);
            }
        }

    });