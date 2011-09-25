function(doc) {
    if(doc._id != 'config')
        emit(null, 1);
}
