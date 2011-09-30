function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var path = require("vendor/couchapp/lib/path").init(req);
    var redirect = require("vendor/couchapp/lib/redirect");
    var config = require("config").init();

    var root = config.root;
    
    if(!doc) return redirect.permanent(root + "/index.html");    
    
    var data = {
        doc : doc,
        styles : [{css : root + "/style/main.css"}],
        img : root + "/img",
        js : root + "/js",
        loader_js : root + "/js/detailsloader.js",
        detailsUrl : root + "/details.html",
        indexUrl : root + "/index.html",
        mainmenu : [{url:root + "/index.html", title:"Main"}, {url:root + "/xss-injections.html", title:"Other Injections"}]
    };

    return mustache.to_html(this.templates.details, data, this.templates.partials);
}

