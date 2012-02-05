function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var path = require("vendor/couchapp/lib/path").init(req);
    var redirect = require("vendor/couchapp/lib/redirect");
    var config = require("config").init();

    var root = config.root;
    
    if(!doc) return redirect.permanent(root + "/notfound.html");
    
    var nodeAsArray = function(obj, depth) {
        if(obj) {
            depth = depth || 1;
            var result = [];
            for(var name in obj) {
                var node = obj[name];
                if(typeof(node) == 'object') {
                    result.push({depth:depth, name:name, value:"<...>", haschild:1, path:name});
                    var inner = nodeAsArray(node, (depth+1));
                    if(inner) {
                        for(var i = 0; i < inner.length; i++) {
                            var innerNode = inner[i];
                            result.push({
                                depth:innerNode.depth,
                                name:innerNode.name,
                                value:innerNode.value,
                                path:(name + "-" + innerNode.path),
                                parent: (name + (innerNode.parent ? ("-" + innerNode.parent) : "")),
                                haschild:innerNode.haschild,
                                hasparent:1
                            });
                        }
                    }
                } else {
                    result.push({depth:depth, name:name, value:obj[name], path:name});
                }
            }
            return result;
        }
        return null;
    };
    
    var values = function() {
        var nodeNames = ['location', 'cookies', 'navigator', 'headers', 'localStorage'];
        var arr = [];
        for(var i = 0; i < nodeNames.length; i++) {
            var name = nodeNames[i];
            var node = doc[name];
            if(node)
                arr.push({name:name, node:nodeAsArray(node)});
        }
        return arr;
    };
    
    var two = function(num) {
        return num < 10 ? "0" + num : "" + num;
    };
    
    var pathname = function() {
        var name = doc.location.pathname;
        if(name.indexOf('/') === 0) {
            name = name.replace('/','');
        }
        return name;
    };
    
    var gmtString = doc.dateOffset > 0 ? "-" : "+";
    gmtString += (-doc.dateOffset/60);
    var utc = new Date(doc.date);
    var utcString = utc.getUTCFullYear() + "-" + two(utc.getUTCMonth()+1) + "-" + two(utc.getDate()) + " (" + two(utc.getUTCHours()) + ":" + two(utc.getUTCMinutes())  + ")";
    var data = {
        index : root + "/index.html",
        doc : doc,
        utc : utcString,
        gmt : gmtString,
        styles : [{css : root + "/style/main.css"}],
        breadcrumbs : [{name:"<search>", url:root+"/search.html"},
                       {name:doc.host, url:(root + "/pages.html/" + doc.host)},
                       {name:pathname(), url:(root + "/page.html/" + doc._id)}],
        values : values()
    };

    return mustache.to_html(this.templates.page, data, this.templates.partials);
}

