function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var path = require("vendor/couchapp/lib/path").init(req);
    var redirect = require("vendor/couchapp/lib/redirect");
    var config = require("config").init();
    var tools = require("config").tools();

    var root = config.root;
    
    if(!doc) return redirect.permanent(root + "/notfound.html");
    
    var nodeAsArray = function(obj, parent, depth) {
        if(obj) {
            depth = depth || 1;
            var result = [];
            for(var name in obj) {
                var node = obj[name];
                if(typeof(node) == 'object') {
                    result.push({
                        depth:depth,
                        name:name,
                        value:"<...>",
                        haschild:1,
                        path:(parent + "-" + name),
                        loaded:(depth < 1),
                        parent:parent
                    });
                    var inner = nodeAsArray(node, (depth+1));
                    if(inner && depth < 1) {
                        for(var i = 0; i < inner.length; i++) {
                            var innerNode = inner[i];
                            result.push({
                                depth:innerNode.depth,
                                name:innerNode.name,
                                value:innerNode.value,
                                path:innerNode.path,
                                parent: innerNode.parent,
                                haschild:innerNode.haschild,
                                loaded:(innerNode.depth < 1)
                            });
                        }
                    }
                } else {
                    result.push({depth:depth, name:name, value:obj[name], path:name, parent:parent});
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
                arr.push({name:name, node:nodeAsArray(node, name, 2)});
        }
        return arr;
    };

    var pathname = function() {
        var name = doc.location.pathname;
        if(name.indexOf('/') === 0) {
            name = name.replace('/','');
        }
        return name;
    };

    var data = {
        index       : root + "/index.html",
        loadnode    : root + "/nodes.html?key=[\"" + doc._id + "\",\"{path}\"]",
        utc         : tools.utcString(doc.date),
        gmt         : tools.gmtString(doc.dateOffset),
        styles      : [{css : root + "/style/main.css"}],
        breadcrumbs : [{name:"<search>", url:root+"/search.html"},
                       {name:doc.host, url:(root + "/pages.html/" + doc.host)},
                       {name:pathname(), url:(root + "/page.html/" + doc._id)}],
        values      : values()
    };

    return mustache.to_html(this.templates.page, data, this.templates.partials);
}

