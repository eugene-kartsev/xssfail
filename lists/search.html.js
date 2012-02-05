function(head, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var list = require("vendor/couchapp/lib/list");
    var config = require("config").init();

    provides("html", function() {
        var hosts = [];
        var query = req.query;
        var pageSize = config.pageSize;
        var skip = parseInt(query.skip) || 0;
        var totalRows = parseInt(head.total_rows);
        var desc = !query.descending ? false : true;
        var totalPages = parseInt(totalRows / pageSize) + 1;
        var currentPage = totalPages - parseInt(skip / pageSize);
        var currentPageSize = (totalRows - (totalRows - (parseInt(totalRows/pageSize)))) || pageSize;
        var nextPageSkip = (skip - pageSize) <= 0 ? 0 : (skip - pageSize);
        var prevPageSkip = (skip + pageSize) > totalRows ? skip : (skip + pageSize);

        var row;
        while (row = getRow()) {
            hosts.push({host:row.key, num:row.value});
        }

        var root = config.root;
        var data = {
            hosts : hosts,
            root :root,
            index : root + "/index.html",
            styles : [{css:root + "/style/main.css"}],
            breadcrumbs : [{name:"<search>", url:root+"/search.html"}]
        };

        return mustache.to_html(
                this.templates.search,
                data,
                this.templates.partials,
                list.send
        );
    });
};
