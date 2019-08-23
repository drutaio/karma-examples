
# Helloworld API

Simple helloworld API End-point using Karma

# Web UI Demonstrating ReactJS Client

This example includes a sample react application created using create-react-app which uses react client generated using KarmaOps utility. Following are steps to integrate react client and build and run the application

1. Register and create/deploy applet
1. Generate client using following command
    `$KARMA.sh/karmaOps.sh -c c generateReactClient -d $PWD/${AppletName}/dev/src/client`
3. `npm install` and `npm start`


## React Web App Details

Client module has `*Actions` classs created which has actions, thunk and reducers generated for you which you can use as follows

### Reducer
- This reducer shows how to write subreducer for service calls. 
- Client module generates four kinds of Action Type : Request, Successful response, Failed Response, Service Error
- Failed Response is application error, its raised when response proto has error property defined by the service
- `isHelloworldAction` and `_helloWorldReducer` are auto-generated. You can write extra sub-reduer to propery modify state as expected by your component consume it
- In below, component expects a single property : message which is populated as per service response
- Reducer also automatically populates four other fields : `error`, `loading` (indicates if network call is active), `serviceError`, `*Response` (raw proto object returned by your service)

```javascript

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
        return {
         ...state,
         ...reducedState
         }; 
    }
    return state;
}
```

### Containers
- React client module generates Thunk `helloWorldThunk` which calls the service with the mapper provided by you : `formToPutProto`
- `formToPutProto` is place where you can prepare your protobuf message from user inputs and redux state

```javascript
const mapDispatchToProps = dispatch => {
  return {
      onHelloWorld: form => {  
        dispatch(helloWorldThunk(form, formToPutProto));
      }    
  };
};
```


## Plain JavScript Client Code

```javascript

sayHello = () => {
        var endPoint = getEndpoint('MyService');
        console.log('endPoint ' + JSON.stringify(endPoint, null, 2))
        var client = new MyServiceClient(endPoint);        
        this.setState({ active: true })
        client.helloWorld2({
          from : 'jsClient'
        }).then(
          pong => {
            console.log('Response ' + JSON.stringify(pong, null, 2))            
            this.setState({ active: false, message: pong.message })
          },
          (error) => {
            this.setState({ active: false, message: error.toString() })
          }
        )
      } 
```

See KARMA in action : 

[![KARMA in action](https://asciinema.org/a/263173.svg)](https://asciinema.org/a/263173)