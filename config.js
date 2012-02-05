exports.init = function() {
    return {
        db : "xss",
        root : "http://127.0.0.1:5984/xss/_design/api/_rewrite",
        pageSize : 20
    };
};
exports.tools = function() {
    return {
        utcString : function(ms) {
            var two = function(num) {
                return num < 10 ? "0" + num : "" + num;
            };
            
            var utc = new Date(ms);
            var utc_ = utc.getUTCFullYear() + "-" + two(utc.getUTCMonth()+1) + "-" + two(utc.getDate()) + " (" + two(utc.getUTCHours()) + ":" + two(utc.getUTCMinutes())  + ")";
            
            return utc_;
        },
        gmtString : function(offset) {
            var str = offset > 0 ? "-" : "+";
            str += (-offset/60);
            return str;
        }
    };
}

