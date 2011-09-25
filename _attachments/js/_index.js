(function($) {
    if(!$) return;

    $(function() {
	    var $db = $.couch.db(config.db);
	    var $table = $("#rows");
	    var $limit = $("#limit");
	    var $page = $("#page-num");
	    var $next = $(".pager .next");
	    var $prev = $(".pager .prev");
	    var $byDate = $("#bydate");
	    var $byHost = $("#byhost");
	    var dbView = "api/items";
        var dbViewByDate = "api/items-by-date";
        var dbViewByHost = "api/items-by-host";

	    var rowsTemplate = null;
	    var promise = $.get(config.templates + '/row.html', function(t) { rowsTemplate = t; });
	
	    var loadPage = function(skip, limit, descending) {
		    var opt = {
			    skip:skip,
			    limit:limit,
			    descending:descending||false,
			    success:function(data){
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
	
	    var pageSize = function() {
		    return $limit.val();
	    };
	
	    var currentPage = function() {
		    return (parseInt($page.val()) - 1) || 0;
	    };
	
	    var currentPageUI = function() {
		    return currentPage() + 1;
	    };
	
	    var skip = function(pageNum) {
		    return pageNum * pageSize();
	    };
	
	    var sort = function(dbview, $el) {
		    dbView = dbview;
		    var desc = $el.hasClass("desc");
		    $el.removeClass().addClass(desc ? "asc" : "desc");
		    loadPage(skip(currentPage()), pageSize(), desc);
	    };
	
	    $limit.change(function() {
		    loadPage(skip(currentPage()), pageSize());
	    });
	
	    $next.click(function() {
		    var page = currentPage();
		    if(page > -1) {
			    $page.val(currentPageUI() + 1);
			    loadPage(skip(++page), pageSize());
		    }
	    });
	
	    $prev.click(function() {
		    var page = currentPage();
		    if(page > 0) {
			    $page.val(currentPageUI() - 1);
			    loadPage(skip(--page), pageSize());
		    }
	    });
	
	    $byDate.click(function() {
		    sort(dbViewByDate, $byDate);
	    });
	
	    $byHost.click(function() {
		    sort(dbViewByHost, $byHost);
	    });
	
	    $limit.change();
    });
})(jQuery);

