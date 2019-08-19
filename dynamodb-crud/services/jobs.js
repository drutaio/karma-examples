var drutaVahan =  {
    exec : function(service, method, request) {

        if(method === 'enqueue') {
            print("Request => " + JSON.stringify(request, null, 2))
            return {
                error : false,
                message : 'Job Enqueued',
                jobId : 'UUID'
            }
        }

        if(method === 'get') {
            print("Request => " + JSON.stringify(request, null, 2))
            return {
                job : {
                    id : request.jobId,
                    type : "FIBONACCI",
                    status :'COMPLETED',
                    statusCode : 0,
                    params : '20',
                    output :'1234567890'
                }
            }
        }
    },
    listResources : function() {
        return [
         {
            type: 'dynamodbTable',
            name: 'jobs',
            properties : {
              keySchema : [
                {
                  attributeName: 'id',
                  keyType: 'partition',
                  dateType: 'S'
                },
                {
                  attributeName: 'timestamp',
                  keyType: 'sort',
                  dateType: 'N'
                }
              ]
            }

         }
       ];
    }
}
