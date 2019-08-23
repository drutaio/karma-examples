import { connect } from 'react-redux';
import ReduxHelloWorldView from '../components/ReduxHelloWorldView';
import { helloWorldThunk } from '../client/MyServiceActions'


const mapStateToProps = state => {  
  return {
    hello: state.hello
  };
};

var formToPutProto = (form) => {
    return {
        from : form.sender
    }
}

//React client module generates Thunk which calls the service with the mapper provided by you : formToPutProto
//formToPutProto is place where you can prepare your protobuf message from user inputs and redux state
const mapDispatchToProps = dispatch => {
  return {
      onHelloWorld: form => {  
        dispatch(helloWorldThunk(form, formToPutProto));
      }    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxHelloWorldView);
