function(head, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var list = require("vendor/couchapp/lib/list");
    var config = require("config").init();
    var tools = require("config").tools();

    provides("html", function() {
        var pages = [];
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
            pages.push({
                host   : row.value.host,
                page   : row.value.page,
                pageId : row.value.id,
                date   : tools.utcString(row.value.date),
                gmt    : tools.gmtString(row.value.dateOffset)
            });
        }

        var root = config.root;
        var data = {
            root : root,
            pages : pages,
            index : root + "/index.html",
            styles : [{css:root + "/style/main.css"}],
            breadcrumbs : [{name:"<search>", url:root+"/search.html"}]
        };

        if(pages.length) {
            data.breadcrumbs.push({name:pages[0].host, url:(root + "/pages.html/" + pages[0].host)});
        }
        
        return mustache.to_html(
                this.templates.pages,
                data,
                this.templates.partials,
                list.send
        );
    });
};
