/**
 * Created by sunxuelong on 2017/1/9.
 */
var jsTemplate = window.jsTemplate || {};
jsTemplate.Hello = (function() { // Hello可以不用
    var name = 'world';
    var sayHello = function(_name) {
        return 'Hello ' + (_name || name);
    };
    // return 所有公有接口（方法/变量)的JSON对象
    return {
        sayHello: sayHello,
    };
}());

// 调用
// jsTemplate.Hello.sayHello();