function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var path = require("vendor/couchapp/lib/path").init(req);
    var redirect = require("vendor/couchapp/lib/redirect");
    var config = require("config").init();

    var root = config.root;    
    
    if(!doc) return redirect.permanent(root + "/index.html");    
    
    var data = {
        doc : doc,
        css : root + "/style",
        img : root + "/img",
        js : root + "/js",
        loader_js : root + "/js/detailsloader.js"
    };

    return mustache.to_html(this.templates.details, data, this.templates.partials);
}

