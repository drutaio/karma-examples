import React, { Component } from 'react'
import { Segment, Header, Button, Label } from 'semantic-ui-react';
import MyServiceClient from '../client/MyServiceClient';
import { getEndpoint } from '../client/endpoints';
import { Loader } from 'semantic-ui-react'

class HelloWorldView extends Component {

    state = {
        active : false,
        message: ''
    }

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

    render() {
        const { active, message } = this.state
        var label;
        if(!message || message === '') {
            label = (null)
        } else {
            label = (<Label>{message}</Label>)
        }


        return (
            <Segment>
                <Header>Say Hello World using RectJS</Header>
                <Button onClick={this.sayHello}>Say Hello to Karma</Button>
                <Loader active={active} inline />
                {label}
            </Segment>
        );
    }
}


export default HelloWorldView;