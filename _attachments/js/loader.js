
(function couchapp_load(scripts, config) {
    config = config || {};
    var vendorjs = config.vendorjs || "";
    var staticjs = config.staticjs || "";
    for (var i=0; i < scripts.length; i++) {
        document.write('<script src="'+scripts[i].replace('{{vendorjs}}', vendorjs).replace('{{staticjs}}', staticjs)+'"><\/script>')
    };
})([
  "/_utils/script/sha1.js",
  "/_utils/script/json2.js",
  "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js",
  "/_utils/script/jquery.couch.js",
  "{{vendorjs}}/jquery.couch.app.js",
  "{{vendorjs}}/jquery.couch.app.util.js",
  "{{vendorjs}}/jquery.mustache.js",
  "{{staticjs}}/index.js",
], config);

