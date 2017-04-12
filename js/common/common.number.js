/**
 * Created by sunxuelong on 2017/1/10.
 */
'use strict';
var Common = window.Common || {};
Common.Number = (function() {

    //数字字典显示百分比
    var formatPercent = function(value){
        return String(+(value*100).toFixed(10))+"%";
    };

    //数字转换为千分位
    var formatDiff = function(s){
        var n=2;
        s=parseFloat((s+"").replace(/[^\d\.-]/g,"")).toFixed(n)+"";
        var l = s.split(".")[0].split("").reverse(),
            r= s.split(".")[1];
        var t= "";
        for(var i = 0;i<l.length;i++){
            t+=l[i]+((i+1)%3==0 && (i+1) != l.length ? "," :"");
        }
        var v=t.split("").reverse().join("")+"."+r;
        if(v.match("-,")){
            return v.replace("-,","-");
        }else{
            return v;
        }
    };

    // return 所有公有接口（方法/变量)的JSON对象
    return {
        formatPercent: formatPercent,
        formatDiff:formatDiff
    };
}());