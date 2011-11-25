function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var path = require("vendor/couchapp/lib/path").init(req);
    var redirect = require("vendor/couchapp/lib/redirect");
    var config = require("config").init();

    var root = config.root;
    
    if(!doc) return redirect.permanent(root + "/index.html");    
    
    var trim = function(str) {
        str = (str || "");
        var trimLen = 15;
        return str.length <= trimLen ? str : (str.substring(0,trimLen) + "...");
    };
    
    var headers = doc.headers || [];
    for(var i = 0; i < headers.length; i++) {
        if(headers[i].key.toLowerCase() == "server") {
            doc.server = headers[i].val;
        }
    }
    var data = {
        doc : doc,
        styles : [{css : root + "/style/main.css"}],
        img : root + "/img",
        js : root + "/js",
        loader_js : root + "/js/detailsloader.js",
        detailsUrl : root + "/details.html",
        indexUrl : root + "/index.html",
        mainmenu : [{url:root + "/index.html", title:"Main"}, {url:root+"/test.html", title:"Test injection"}, {url:root + "/xss-injections.html", title:"Other Injections"},{title: "Injection > " + trim(doc.host), active:1}]
    };

    return mustache.to_html(this.templates.details, data, this.templates.partials);
}

