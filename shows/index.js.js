function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var config = require("config").init();
    
    var root = config.root;
    var data = {
        db : config.db,
        js : root + "/js",
        vendorjs : root + "/vendor/couchapp",
        templates : root + "/templates",
        detailsUrl : root + "/details.html"
    };
    
    return mustache.to_html(this.templates.indexjs, data);
}
