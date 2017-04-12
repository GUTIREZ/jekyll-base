/**
 * Created by sunxuelong on 2017/1/9.
 */

/*ajax 请求返回json格式
    {"flag" : boolean,  // true:请求成功 false: 请求失败
     "msg" : "message", // 返回消息
     "object1" : object1,  // 返回的数据 字段、对象、对象数组等
     "object2" : object2   // 返回的数据 字段、对象、对象数组等
    }
*/

'use strict';
var Common = window.Common || {};
Common.Ajax = (function() {
    /**
     * AJAX异步加载数据
     * @param url：请求地址
     * @param data：参数
     * @param callBack：回调方法
     * @returns {String}
     */
    var getObjectAsync = function(url, type, data, callback) {
        var obj = {};
        $.ajax({
            type : type, // "post" / "get"
            url : url,
            async : false,
            data : data,
            // 默认: 'application/x-www-form-urlencoded;charset=UTF-8'
            contentType : 'application/json',
            error : function(data) {
                alert("数据加载失败(url:" + url+")");
            },
            success : function(data) {
                if (data) {
                    obj = data;
                    if (obj) {
                        if (typeof callback === "function"){
                            //alert(callback);
                            callback(obj);
                        }
                        return obj;
                    }
                }
            }
        });
        return obj;
    };

    /**
     * AJAX同步加载数据
     * @param url：请求地址
     * @param data：参数
     * @param callBack：回调方法
     * @returns {String}
     */
    var getObjectSync = function(url,type, data, callback) {
        var obj = {};
        $.ajax({
            type : type, // "post" / "get"
            url : url,
            async : false,
            data : data,
            // 默认: 'application/x-www-form-urlencoded;charset=UTF-8'
            contentType : 'application/json',
            error : function(data) {
                alert("数据加载失败(url:" + url+")");
            },
            success : function(data) {
                // setTimeout(300);
                if (data) {
                    obj = data;
                    // obj = eval('(' + data + ')');
                    if (obj) {
                        if (typeof callback === "function"){
                            //alert(callback);
                        	callback(obj);
                        }
                        return obj;
                    }
                }
            }
        });
        return obj;
    };
    
    // ajax 测试方法
    var ajaxTemplate = function(url,data,callback){
        var obj = {};
        $.ajax({
            type: "post",
            dataType: "json",// 返回json格式的数据
            url: url,// 要访问的后台地址
            async : false,  // true:异步 / false:同步
            data: data,// 要发送的数据
            // timeout: 1000,
            // cache: false, // 缓存
            // beforeSend: function(){}, // 发送前执行方法
            // error:function(XMLHttpRequest, textStatus, errorThrown){
            //     alert(XMLHttpRequest.status);
            //     alert(XMLHttpRequest.readyState);
            //     alert(textStatus);
            //     // alert("error");
            // }, // ajax执行发生异常后执行
            // complete :function(){...}, // AJAX请求完成后执行
            success: function(data){// data为返回的数据，在这里做数据绑定
                if (data) {
                    obj = data; // 使用同步的情况，可以将返回值赋值给外部变量
                    // obj = eval('(' + data + ')'); 服务器返回json字符串，有时需要用eval解析成对象
                    if (obj) {
                        if (obj.msg) {
                            $.messager.alert("信息", obj.msg, 'info', function() {
                                if (callBack && typeof callback === "function"){
                                    //alert(callback);
                                    callback();
                                }
                            });
                        }
                        return obj;
                    }
                }
            }
        });
        
        return obj;
    };

    // $.getJSON 示例
    /*
    $.getJSON("url", "", function(obj){
        console.info(obj.user);
        console.info(obj.user.name);
        console.info(obj.msg);
        console.info(obj.flag);

        if(obj.flag){
            $('#loginname').val(obj.user.name);
            // $('#manageMessageH').text(obj.msg);
            $('#manageMessageH').text(Common.Number.formatDiff(12341341));
            $('#mymodal').modal('show');
        }else{
            $('.modal-title').text("错误信息");
            $('#manageMessageH').text(obj.msg);
            $('#mymodal').modal('show');
        }
    });
    */
    
    // return 所有公有接口（方法/变量)的JSON对象
    return {
        getObjectSync: getObjectSync,
        getObjectAsync: getObjectAsync
    };
}());

// ajax 方法
/*
 (1)：load() 
 	方法从服务器加载数据，并把返回的数据放入被选元素中
 	语法：$(选择器).load(地址，[参数]，[回调函数])
 	参数：可选。是键：值的形式
 	回调函数：参数可以是返回的结果，调用的状态，XMLHttpRequest对象。
 	回调函数参数：只写一个参数，是返回的结果
 
 (2)：$.get() 
 	方法通过 HTTP GET 请求从服务器上请求数据
 	语法：$.get(地址，[回调函数])
 	回调函数：参数可以是返回的结果，调用的状态，XMLHttpRequest对象。
 	回调函数参数：只写一个参数，是返回的结果
    $.get(); 返回服务端原始数据，比如服务端返回的是字符串则是字符串，返回的是JSON对象就是JSON对象；

 (3)：$.post()
 	方法通过 HTTP POST 请求从服务器上请求数据。
 	语法：$.post(地址，[参数]，[回调函数]）
 	参数：可选。是键：值的形式
 	回调函数：参数可以是返回的结果，调用的状态，XMLHttpRequest对象。
 	回调函数参数：只写一个参数，是返回的结果
    $.get(); 返回服务端原始数据，比如服务端返回的是字符串则是字符串，返回的是JSON对象就是JSON对象；

 (4)：$.ajax() 
 	方法通过 HTTP 请求加载远程数据，是jQuery底层Ajax的实现。
 	调用方式：参考 ajaxTest
 	
 (5)：$.getJSON(url,paramData,function(data){}); 
 	方法通过 HTTP 请求加载远程服务器返回的json数据，默认异步
    $.getJSON(); 返回JSON对象或者报错，无论服务端返回的是字符串还是JSON对象。如果服务端返回的数据不符合JSON规格则会报错；
 */

// ajax 常用
/*
 (1)：jQuery.parseJSON(data)
 	ajax返回的json字符串解析成json对象
 	var json = jQuery.parseJSON(data);

 (2)：eval("("+data+")")
 	将服务器返回数据解析成对象

 (3)：$.each()
 	与eval联合使用，循环遍历对象
 	$.each(data,function(index,item){
 		... 
 	})
 	index:序号  item:data的单笔对象

 (4)：$.ajaxSettings
 	设置ajax参数
 	设置后全局生效，如果局部使用，修改后请立即恢复
 	$.ajaxSettings.async = false;
 		... // ajax方法
 	$.ajaxSettings.async = true;

 (5)：type: get、post 区别
    get请求时,参数在URL中显示,而使用Post方式,则不会显示出
    get请求发送数据量小,Post请求发送数据量大
    get请求需注意缓存问题,post请求不需担心这个问题
    post请求必须设置Content-Type值为application/x-form-www-urlencoded
    get请求的目的是给予服务器一些参数,以便从服务器获取列表
    post请求的目的是向服务器发送一些参数,例如表单的提交.
 */
