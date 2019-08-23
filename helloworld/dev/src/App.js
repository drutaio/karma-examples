import React from 'react';
import './App.css';
import { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import HelloWorldView from './components/HelloWorldView';
import ReduxHelloWorld from './containers/ReduxHelloWorld'

class App extends Component {

  render() {
    return (
      <Container>
        <Header>Hello World Sample App</Header>
          <HelloWorldView />
          <ReduxHelloWorld />
      </Container>
    );
  }

}

export default App;
