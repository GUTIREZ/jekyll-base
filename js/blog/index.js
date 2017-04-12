/**
 * Created by sunxuelong on 2017/1/9.
 */
var index = window.index || {};
index = (function() {
    var name = 'world';
    var blogDetail = function(_name) {

        $('.post-thumb').click(){
            $.getJSON('/'){

            }
        }

        return 'Hello ' + (_name || name);
    };
    // return 所有公有接口（方法/变量)的JSON对象
    return {
        sayHello: sayHello,
    };
}());

// 调用
// jsTemplate.Hello.sayHello();