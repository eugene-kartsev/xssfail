function(doc) {
	if(doc.host && doc.date)
		emit(doc.host, {host:doc.host, url:"", cookies: (doc.cookies || []), date: doc.date });
}