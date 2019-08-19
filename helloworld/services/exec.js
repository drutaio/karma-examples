var drutaVahan =  {
    exec : function(service, method, request) {
        print("Request => " + JSON.stringify(request, null, 2))
        return {
            message : 'Hello World! from ' + request.from
        }
    },
    listResources : function() {
        return []
    }
}
