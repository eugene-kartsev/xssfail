function(doc) {
  if(doc.visible)
    emit([doc.host, doc.date], {id:doc._id, host: doc.host, page: doc.location.pathname, date:doc.date, dateOffset:doc.dateOffset});
    //emit([doc.date, doc.date], {id:doc._id, page: doc.location.pathname});
//    [0,0]&endkey=[9999999999999,9999999999999]
}
