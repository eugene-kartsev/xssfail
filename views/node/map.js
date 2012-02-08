function(doc) {
    var nodeAsArray = function(obj, parent, depth) {
        if(obj) {
            depth = depth || 1;
            parent = parent || "";
            var result = [];
            for(var name in obj) {
                var node = obj[name];
                var path = (parent ? (parent + "-" + name) : name);
                if(typeof(node) == 'object') {
                    result.push({
                        depth:depth,
                        name:name,
                        value:"",
                        path:path,
                        parent:parent,
                        haschild:1
                    });
                    var inner = nodeAsArray(node, path, (depth+1));
                    if(inner) {
                        for(var i = 0; i < inner.length; i++) {
                            var innerNode = inner[i];
                            result.push({
                                depth:innerNode.depth,
                                name:innerNode.name,
                                value:innerNode.value,
                                path:innerNode.path,
                                parent: innerNode.parent,
                                haschild:innerNode.haschild
                            });
                        }
                    }
                } else {
                    result.push({depth:depth, name:name, value:obj[name], path:path, parent:parent});
                }
            }
            return result;
        }
        return null;
    };

    var nodes = nodeAsArray(doc);
    var len = nodes.length;
    for(var i = 0; i < len; i++) {
        var node = nodes[i];
        if(node.parent) {
            emit([doc._id, node.parent], node);
        }
    }
}
