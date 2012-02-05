function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var path = require("vendor/couchapp/lib/path").init(req);
    var config = require("config").init();

    var root = config.root;
    
    var data = {
        index : root + "/index.html",
        styles : [{css:root + "/style/main.css"}],
        xss_js : root + "/xss.js",
        search_html : root + "/search.html"
    };

    return mustache.to_html(this.templates.index, data, this.templates.partials);
}
