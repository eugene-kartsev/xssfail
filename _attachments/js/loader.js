
(function couchapp_load(scripts, config) {
    config = config || {};
    var vendorjs = config.vendorjs || "";
    for (var i=0; i < scripts.length; i++) {
        document.write('<script src="'+scripts[i].replace('{{vendorjs}}', vendorjs)+'"><\/script>')
    };
})([
  "/_utils/script/sha1.js",
  "/_utils/script/json2.js",
  "/_utils/script/jquery.js",
  "/_utils/script/jquery.couch.js",
  "{{vendorjs}}/jquery.couch.app.js",
  "{{vendorjs}}/jquery.couch.app.util.js",
  "{{vendorjs}}/jquery.mustache.js",
  "{{vendorjs}}/jquery.evently.js"
], config);

