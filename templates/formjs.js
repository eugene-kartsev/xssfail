(function($) {
	var getKeyValue = function(item) {
		item = item || "";
		var eqIndex = item.indexOf('=');
		if(eqIndex > -1) {
			var key = item.substring(0, eqIndex);
			var val = item.substring(eqIndex + 1);
			return {key:decodeURIComponent(key), val:decodeURIComponent(val)};
		}
		return null;
	};
	var mappers = {
		host:function(result, host) { result.host = host; },
		cookie:function(result, cookie) {
			var keyVal = getKeyValue(cookie);
			if(keyVal) {
				result.cookies = (result.cookies || []);
				result.cookies.push({key:keyVal.key, val:keyVal.val});
			}
		},
		url:function(result, url) {
			result.url = url || "";
		}
	};
	var bindEvent = function (){
        $(".title").click(function() {
            var $title = $(this);
            $title.find("p").toggle();
        });
	};
	if($ && $.couch) {
		var $db =  $.couch.db("xss");
		if(!$db) return;

		$(function() {
		    bindEvent();
			var query = location.href.split('?')[1] || "";
			query = query.length > 0 ? query.split('&') : [];
			
			var obj = {};
			for(var i=0;i<query.length;i++) {
				var item = query[i];
				var keyVal = getKeyValue(item);
				if(keyVal) {
					var key = (keyVal.key || "").toLowerCase();
					var val = keyVal.val;
					var mapper = mappers[key];
					if(mapper)
						mapper(obj, val);
				}
			}
			if(obj.host && obj.url) {
    			var current = new Date();
    			var twoNum = function(num) {
    			    return num > 9 ? num : ("0" + num);
    			};
			    var date = new Date(
			        current.getUTCFullYear(),
			        current.getUTCMonth(),
			        current.getUTCDate(),
			        current.getUTCHours(),
			        current.getUTCMinutes());
				obj.date = date.getFullYear() + "-" + twoNum(date.getMonth()+1)+"-"+twoNum(date.getDate());
				obj.date += " (" + twoNum(date.getHours()) + ":" + twoNum(date.getMinutes()) + ")";
				$db.saveDoc(obj);
			}
		});
	}
})(jQuery);
