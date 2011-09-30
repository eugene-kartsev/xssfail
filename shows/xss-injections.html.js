function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var path = require("vendor/couchapp/lib/path").init(req);
    var config = require("config").init();
    
    var root = config.root;
    
    var data = {
        styles : [{css : root + "/style/main.css"}, {css : root + "/style/injections.css"}]
    };
    
    return mustache.to_html(this.templates["xss-injections"], data, this.templates.partials);
}
