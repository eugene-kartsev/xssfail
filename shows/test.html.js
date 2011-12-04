function(doc, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var path = require("vendor/couchapp/lib/path").init(req);
    var redirect = require("vendor/couchapp/lib/redirect");
    var config = require("config").init();

    var root = config.root;

    var data = {
        styles : [{css : root + "/style/main.css"}],
        img : root + "/img",
        loader_js:root + "/js/loader.js",
        vendorjs : root + "/js/vendor/couchapp",
        xss_js : root + "/xss.js",
        mainmenu : [{url:root + "/index.html", title:"Main"}, {url:root+"/test.html", title:"Test injection", active:1}, {url:root + "/xss-injections.html", title:"Other Injections"}]
    };

    return mustache.to_html(this.templates.test, data, this.templates.partials);
}

