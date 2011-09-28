function(head, req) {
    var mustache = require("vendor/couchapp/lib/mustache");
    var list = require("vendor/couchapp/lib/list");
    var config = require("config").init();

    provides("html", function() {
        var winners = [];
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
            winners.push(row.value);
        }

        var root = config.root;
        var data = {
            css : root + "/style",
            img : root + "/img",
            js : root + "/js",
            xss_js : root + "/xss.js",
            loader_js : root + "/js/loader.js",
            vendorjs : root + "/js/vendor/couchapp",
            has_winners : winners.length > 0,
            nextUrl : root + "/index.html/" + desc + "/" + nextPageSkip + "/" + pageSize,
            prevUrl : root + "/index.html/" + desc + "/" + prevPageSkip + "/" + pageSize,
            currentUrl : root + "/index.html",
            detailsUrl : root + "/details.html",
            indexUrl : root + "/index.html",
            winners : winners,
            pager : {
                pageSize : pageSize,
                pages : totalPages,
                current : currentPage
            }
        };

        return mustache.to_html(
                this.templates.index,
                data, 
                this.templates.partials,
                list.send
        );
    });
};
