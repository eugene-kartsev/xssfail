function(head, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var list = require("vendor/couchapp/lib/list");
    var config = require("config").init();
    var tools = require("config").tools();

    provides("html", function() {
        var query = req.query;
        var rows = [];

        //send("starting");
        var row;
        while (row = getRow()) {
            /*send("{" +
                "depth:"+row.value.depth+
                ",name:"+row.value.name+
                ",value:"+row.value.value+
                ",path:"+row.value.path+
                ",parent:"+ row.value.parent+
                ",haschild:"+row.value.haschild+
                ",hasparent:"+row.value.hasparent+
                "}<br/>");*/
            rows.push({
                depth:row.value.depth,
                name:row.value.name,
                value:row.value.value,
                path:row.value.path,
                parent: row.value.parent,
                haschild:row.value.haschild,
                hasparent:row.value.hasparent
            });
        }

        return mustache.to_html(
                "{{#rows}}{{>row}}{{/rows}}",
                {rows:rows},
                this.templates.partials,
                list.send
        );
    });
};
