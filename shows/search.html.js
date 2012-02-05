function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var path = require("vendor/couchapp/lib/path").init(req);
    var config = require("config").init();

    var root = config.root;
    var data = {
        index : root + "/index2.html",
        styles : [{css:root + "/style/main.css"}]
    };

    return mustache.to_html(this.templates.search, data, this.templates.partials);
}
