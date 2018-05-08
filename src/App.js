import React, { Component } from 'react';
import './App.css';

import constants from './constants';

import {
  Button, Loader, Dimmer, Grid, Header, Form, Segment 
} from 'semantic-ui-react';

class App extends Component {
  state = {
    auth_token: null,
    isSignedIn: false,
    isLoad: false,
  };

  componentDidMount() {
    const self = this;
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js?onload=onGapiLoad';
    
    window.onGapiLoad = function onGapiLoad() {
      window.gapi.load('client:auth2', _ => self.initClient(self));
    }

    document.body.appendChild(gapiScript);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  initClient(self) {
    const { gapi } = window;
    const { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES } = constants;

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(_ => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => this.updateSigninStatus(isSignedIn, self));

      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get(), self);

      this.setState({
        isLoad: true,
        auth_token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token || null,
      });
    });
  };

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  updateSigninStatus(isSignedIn, self) {
    const { gapi } = window;
    
    self.setState({
      isSignedIn,
      auth_token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token || null,
    });
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick(event) {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick(event) {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  render() {
    const { isSignedIn, isLoad } = this.state;

    return (
      <div className='login'>
        {!isLoad && (
          <Dimmer active>
            <Loader size="big">Loading</Loader>
          </Dimmer>
        )}

        {isLoad && (
          <Grid
            className='login-grid'
            textAlign='center'
            verticalAlign='middle'
          >
            <Grid.Column className='login-column'>
              <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
              </Header>
              <Form size='large'>
                <Segment stacked>
                  {!isSignedIn && (
                    <Button color='teal' fluid size='large'
                      onClick={this.handleAuthClick}>Authorize</Button>
                  )}

                  {isSignedIn && (
                    <Button color='red' fluid size='large' 
                      onClick={this.handleSignoutClick}>Sign Out</Button>
                  )}
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        )}
      </div>
    );
  }
}

export default App;
