
import {_helloWorldReducer, isHelloworldAction} from '../client/MyServiceActions'
import { REQUEST_HELLOWORLD_T, RECEIVE_HELLOWORLD_RESPONSE_T } from '../client/MyServiceActions'
import {RECEIVE_HELLOWORLD_ERROR_RESPONSE_T, RECEIVE_HELLOWORLD_FAILED_RESPONSE_T} from '../client/MyServiceActions'


//This reducer shows how to write subreducer for service calls
//Client module generates four kinds of Action Type : Request, Successful response, Failed Response, Service Error
//Failed Response is application error, its raised when response proto has error property defined by the service
export default function helloWorldReducer(state = {}, action) { 
    console.log('Action ==> ' + JSON.stringify(action))
    if(isHelloworldAction(action.type)) {
        var reducedState = _helloWorldReducer(action, {
            [REQUEST_HELLOWORLD_T] : function(action) {
                return { 
                    message : 'Requesting hello ' + action.requestPayload.sender                    
                }                
            },
            [RECEIVE_HELLOWORLD_RESPONSE_T] : function(action) {
                return { 
                    message : 'Server responsed with message ' + action.helloWorldResponse.message + ' successfully!'
                }
            },
            [RECEIVE_HELLOWORLD_ERROR_RESPONSE_T] : function(action) {
                return {
                    message : 'Error ' + action.errorText
                }
            },
            [RECEIVE_HELLOWORLD_FAILED_RESPONSE_T] : function(action) {
                return {
                    message : 'Error ' + action.helloWorldResponse.error 
                }
            }
        })
        console.log(reducedState)
        var x = {
         ...state,
         ...reducedState
         }; 
        console.log(x)
        return x
    }
    return state;
}