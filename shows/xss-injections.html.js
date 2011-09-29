function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var path = require("vendor/couchapp/lib/path").init(req);
    var config = require("config").init();
    
    return mustache.to_html(this.templates["xss-injections"], {}, this.templates.partials);
}
