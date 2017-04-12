/**
 * Created by sunxuelong on 2017/1/10.
 */
Common.Util = (function() {
    var publicV="publicV";  // 共有变量
    var _privateV="_privateV"; // 私有变量
    // 共有方法
    var publicF = function(){

    };
    // 私有方法
    var _privateF = function(){

    };

    var formToObject = function()
    {
        var o = {};
        var a = this.serializeArrayId();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    // return 所有公有接口（方法/变量)的JSON对象
    return {
        publicF: publicF,
        publicV:publicV,
        formToObject:formToObject
    };
}());