(function($) {
    if(!$ || !$.couch) return;

    $(function() {
        var $db = $.couch.db("{{db}}");
        var $table = $("#rows");
        var $page = $("#page-num");
        var $pager = $("#pager");
        var $next = $pager.find(".next");
        var $prev = $pager.find(".prev");
        var $byDate = $("#bydate");
        var $byHost = $("#byhost");
        var dbView = "api/items";
        var dbViewByDate = "api/items-by-date";
        var dbViewByHost = "api/items-by-host";
        var desc = true;

        var rowsTemplate = null;
        var promise = $.get('{{templates}}/row.html', function(t) { rowsTemplate = t; });

        var loadPage = function(skip, limit) {
            var opt = {
                skip:skip,
                limit:limit,
                descending:desc,
                success:function(data) {
                    promise.done(function() {
                        var html = [];
                        for(var i in data.rows) {
                            var view = data.rows[i].value;
                             html.push($.mustache(rowsTemplate, view));
                        }
                        $table.find("tr:not(.head)").remove();
                        $table.append(html.join(''));
                        $(".total").text(parseInt(data.total_rows / limit + 1));
                    });
                }
            };
            $db.view(dbView, opt);
        };

        var totalPages = function() {
            return parseInt($pager.attr("totalpages"));
        };

        var pageSize = function() {
            return $pager.attr("pagesize");
        };

        var currentPage = function() {
            return (totalPages() - parseInt($page.val())) || 0;
        };

        var currentPageUI = function() {
            return totalPages() - currentPage();
        };

        var skip = function(pageNum) {
            return (pageNum) * pageSize();
        };

        var sort = function(dbview, $el) {
            dbView = dbview;
            desc = $el.hasClass("desc");
            $el.removeClass().addClass(desc ? "asc" : "desc");
            loadPage(skip(currentPage()), pageSize());
        };

        $next.click(function() {
            var newPage = currentPage() - 1;
            if(newPage > -1) {
                $page.val(currentPageUI() + 1);
                loadPage(skip(newPage), pageSize());
            }
        });

        $prev.click(function() {
            var newPage = currentPage() + 1;
            if(newPage < totalPages()) {
                $page.val(currentPageUI() - 1);
                loadPage(skip(newPage), pageSize());
            }
        });

        $byDate.click(function() {
            sort(dbViewByDate, $byDate);
        });

        $byHost.click(function() {
            sort(dbViewByHost, $byHost);
        });

        $pager.find("a").click(function() { return false; });
        
        $pager.find("form").submit(function() {
            var newPage = totalPages() - parseInt($pager.find("#page-num").val());
            if((newPage || newPage==0) && newPage < totalPages() && newPage > -1) {
                loadPage(skip(newPage), pageSize());
            }
            return false;
        });
    });
})(jQuery);
