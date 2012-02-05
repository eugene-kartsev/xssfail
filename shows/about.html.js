function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var path = require("vendor/couchapp/lib/path").init(req);
    var config = require("config").init();
    
    var root = config.root;
    var data = {
        css : root + "/style",
        img : root + "/img",
        js : root + "/js"
    };
    
    return mustache.to_html(this.templates.about, data, this.templates.partials);
}
