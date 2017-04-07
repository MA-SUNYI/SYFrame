 var MASlide = function(option) {
     var defaults = {
         container: '',
         refresh: function() {},
         next: function() {}
     }
     var start,
         end,
         direction,
         length,
         isLock = false, //是否锁定整个操作
         isCanDo = false, //是否移动滑块
         isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
         hasTouch = 'ontouchstart' in window && !isTouchPad;
     var obj = document.querySelector(option.container);
     var mobj = document.querySelector(option.movecontainer);
     var bloading = obj.firstElementChild;
     var eloading = obj.lastElementChild;
     var offset = bloading.clientHeight;
     var objparent = obj.parentElement;

     /*操作方法*/
     var fn = {
         //移动容器
         translate: function(diff) {
             obj.style.webkitTransform = 'translate3d(0,' + diff + 'px,0)';
             obj.style.transform = 'translate3d(0,' + diff + 'px,0)';
         },
         //设置效果时间
         setTransition: function(time) {
             obj.style.webkitTransition = 'all ' + time + 's';
             obj.style.transition = 'all ' + time + 's';
         },
         //返回到初始位置
         back: function() {
             fn.translate(0 - offset);
             //标识操作完成
             isLock = false;
         },
         addEvent: function(element, event_name, event_fn) {
             if (element.addEventListener) {
                 element.addEventListener(event_name, event_fn, false);
             } else if (element.attachEvent) {
                 element.attachEvent('on' + event_name, event_fn);
             } else {
                 element['on' + event_name] = event_fn;
             }
         }
     };

     fn.translate(0 - offset);
     fn.addEvent(mobj, 'touchstart', start);
     fn.addEvent(mobj, 'touchmove', move);
     fn.addEvent(mobj, 'touchend', end);
     fn.addEvent(mobj, 'mousedown', start)
     fn.addEvent(mobj, 'mousemove', move)
     fn.addEvent(mobj, 'mouseup', end)

     //滑动开始
     function start(e) {
         if (((mobj.scrollTop <= 0) || (mobj.scrollTop + mobj.clientHeight >= mobj.scrollHeight)) && !isLock) {
             var even = typeof event == "undefined" ? e : event;
             //标识操作进行中
             isLock = true;
             isCanDo = true;
             //保存当前鼠标Y坐标
             start = hasTouch ? even.touches[0].pageY : even.pageY;
             //消除滑块动画时间
             fn.setTransition(0);
             bloading.innerHTML = '刷新数据';
             eloading.innerHTML = '加载数据';
         }
         return false;
     }

     //滑动中
     function move(e) {
         //下拉
         if (mobj.scrollTop <= 0 && isCanDo) {
             var even = typeof event == "undefined" ? e : event;
             //保存当前鼠标Y坐标
             end = hasTouch ? even.touches[0].pageY : even.pageY;

             if (start < end) {
                 even.preventDefault();
                 //消除滑块动画时间
                 fn.setTransition(0);
                 //方向
                 direction = 'down';
                 //移动滑块
                 if ((end - start - offset) / 2 <= 150) {
                     length = (end - start - offset) / 2;
                     fn.translate(length);
                 } else {
                     length += 0.3;
                     fn.translate(length);
                 }
             }
         }
         //上拉
         if (mobj.scrollTop + mobj.clientHeight >= mobj.scrollHeight && isCanDo) {
             var even = typeof event == "undefined" ? e : event;
             //保存当前鼠标Y坐标
             end = hasTouch ? even.touches[0].pageY : even.pageY;
             if (start > end) {
                 even.preventDefault();
                 //消除滑块动画时间
                 fn.setTransition(0);
                 //方向
                 direction = 'up';
                 //移动滑块
                 if ((start - end - offset) / 2 <= 150) {
                     length = (start - end - offset) / 2;
                     fn.translate(0 - length - offset);
                 } else {
                     length -= 0.3;
                     fn.translate(0 - offset - length);
                 }
             }

         }
     }
     //滑动结束
     function end(e) {
         if (isCanDo) {
             isCanDo = false;
             //判断滑动距离是否大于等于指定值
             if (Math.abs(end - start) >= offset) {
                 //设置滑块回弹时间
                 fn.setTransition(1);
                 //保留提示部分
                 switch (direction) {
                     case 'up':
                         fn.translate(0 - offset * 2);
                         eloading.innerHTML = '正在加载数据';
                         if (typeof option.next == "function") {
                             option.next.call(fn, e);
                         }
                         break;
                     case 'down':
                         fn.translate(0);
                         //执行回调函数
                         bloading.innerHTML = '正在刷新数据';
                         if (typeof option.refresh == "function") {
                             option.refresh.call(fn, e);
                         }
                         break;
                 }
             } else {
                 //返回初始状态
                 fn.back();
             }
         }
     }
 }