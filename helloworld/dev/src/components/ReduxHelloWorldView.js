import React, { Component } from 'react'
import { Header, Segment, Form, Loader, Label } from 'semantic-ui-react';


class ReduxHelloWorldView extends Component {

    state = {
        sender : ''
    }

    handleChange = (e, { name, value }) => {        
        this.setState({ [name]: value }) 
        //console.log('Sumbit the form: state=' + JSON.stringify(this.state) + ' keyu=' + name);                 
    }

    handleSubmit = (event, eventProps) => {               
        console.log('>>>>>>>>>>>Sumbit the form: state=' + JSON.stringify(this.state));                
        this.props.onHelloWorld(this.state);
    }

    render() {
        var loading = this.props.hello.loading;
        var message = this.props.hello.message;
        var error = this.props.hello.error || this.props.hello.serviceError    
        var color = (error? 'red' : 'green')
        
        console.log('Message <' + message + ">")
        var label;
        if(message) {
            label = (<Label color={color}>{message}</Label>)
        } else {
            label = (null)
        }

        return (
            <Segment>
                <Header>Say Hello World using React-Redux</Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input fluid name='sender' onChange={this.handleChange} label='Enter Sender Name' placeholder='JSClient' />                
                    <Form.Button color='teal'>Say Hello World</Form.Button><Loader active={loading} inline />                
                    {label}
                </Form>
            </Segment>
        );
    }
}


export default ReduxHelloWorldView;