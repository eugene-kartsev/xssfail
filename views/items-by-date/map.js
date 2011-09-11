function(doc) {
	if(doc.host && doc.date)
		emit(doc.date, {host:doc.host, url:"", cookies: (doc.cookies || []), date: doc.date });
}