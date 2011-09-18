function(doc, req) {
    var lib="vendor/couchapp/lib";
    var mustache = require(lib + "/mustache");
    var path = require(lib + "/path").init(req);
    
    var data = {
        static : path.asset()
    };
    
    return mustache.to_html(this.templates.about, data, this.templates.partials);
}
