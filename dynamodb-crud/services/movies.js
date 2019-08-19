var drutaVahan =  {
    exec : function(service, method, argument) {
        if(method === 'getActors') {
            var x = DynamoDB.GetItem({
                type: 'druta.MovieProto',
                shape: 'js',
                table: 'movies',
                key: {
                    hash : { year : argument.year } ,
                    range : { title : argument.title }
                }
            })
            console.log('UPDATED2 Return item = ' + JSON.stringify(x, null, 2))
            return { actors : x.info.actors };
        }

        if(method === 'createMovie') {
            var x = DynamoDB.PutItem({
                table: 'movies',
                type: 'druta.MovieProto',
                shape: 'native',
                item : argument.item
            });
            console.log('UPDATED2 Return item = ' + JSON.stringify(x, null, 2))
            return { success : true };
        }

        if(method === 'queryByTitle') {
            var query = {
                keyConditionExpression : '#title = :letter1',
                expressionAttributeNames : {
                    ["#title"]: 'title',
                    ["#year"]: 'year'
                },
                expressionAttributeValues : {
                    [':letter1'] : {
                        string : argument.title
                    }
                },
                projectionExpression : '#year, #title, info.actors, info.directors, info.rating, info.plot, info.running_time_secs',
                querySelect : 'SPECIFIC_ATTRIBUTES'
            }
            var x = DynamoDB.QueryItems({
                table: 'movies',
                type: 'druta.MovieProto',
                shape: 'js',
                query : query
            });
            console.log('UPDATED2 Return item = ' + JSON.stringify(x, null, 2))
            return { items : x };
        }

        if(method === 'queryByYear') {
            var query = {
                keyConditionExpression : '#yr = :yyyy',
                expressionAttributeNames : {
                    ["#yr"]: 'year'
                },
                expressionAttributeValues : {
                    [':yyyy'] : {
                        ['int'] : argument.year
                    }
                },
                projectionExpression : '#yr, title, info.actors, info.directors, info.rating, info.plot, info.running_time_secs',
                querySelect : 'SPECIFIC_ATTRIBUTES'
            }
            var x = DynamoDB.QueryItems({
                table: 'movies',
                type: 'druta.MovieProto',
                shape: 'js',
                query : query
            });
            console.log('UPDATED2 Return item = ' + JSON.stringify(x, null, 2))
            return { items : x };
        }

        if(method === 'scanByYear') {
            var scanQuery = {
                projectionExpression : '#yr, #title, info.actors, info.directors, info.rating, info.plot, info.running_time_secs',
                querySelect : 'SPECIFIC_ATTRIBUTES',
                filterExpression : '#yr between :start_yr and :end_yr',
                expressionAttributeNames : {
                  ["#yr"]: 'year',
                  ['#title']: 'title'
                },
                expressionAttributeValues : {
                  [':start_yr'] : {
                    ['int'] : argument.year1,
                  },
                  [':end_yr'] : {
                    ['int']: argument.year2,
                  }
                }
            }
            var x = DynamoDB.ScanItems({
                table: 'movies',
                type: 'druta.MovieProto',
                shape: 'js',
                query : scanQuery
            });
            console.log('UPDATED2 Return item = ' + JSON.stringify(x, null, 2))
            return { items : x };
        }
    },
    listResources : function() {
        return [
            {
                type: 'dynamodbTable',
                name: 'movies',
                properties : {
                    keySchema : [
                        {
                            attributeName: 'year',
                            keyType: 'partition',
                            dateType: 'N'
                        },
                        {
                            attributeName: 'title',
                            keyType: 'sort',
                            dateType: 'S'
                        }
                    ]
                }
            }
        ];
    }
}
