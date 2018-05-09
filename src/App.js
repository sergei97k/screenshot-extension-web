import React from 'react';
import './App.css';

import withGapiInit from './hocs/withGapiInit';

import {
  Button, Loader, Dimmer, Grid, Header, Form, Segment 
} from 'semantic-ui-react';

const App = ({ isLoad, isSignedIn, handleAuthClick, handleSignoutClick }) => {
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
                    onClick={handleAuthClick}>Authorize</Button>
                )}

                {isSignedIn && (
                  <Button color='red' fluid size='large' 
                    onClick={handleSignoutClick}>Sign Out</Button>
                )}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      )}
    </div>
  );
}

export default withGapiInit(App);
