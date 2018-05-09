import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

import withGapiInit from './hocs/withGapiInit';
import SaveImage from './components/SaveImage';

import {
  Button, Loader, Dimmer, Grid, Header, Segment, Divider
} from 'semantic-ui-react';

const App = ({ isLoad, isSignedIn, handleAuthClick, handleSignoutClick, userName, auth_token }) => {
  return (
    <div className='login'>
      {!isLoad && (
        <Dimmer active>
          <Loader size="big">Загрузка</Loader>
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
              {!isSignedIn && (
                <span>Авторизируйтесь с помощью Google аккаунта</span>
              )}
              {isSignedIn && (
                <span>Сохраните изображение</span>
              )}
            </Header>
            <Segment stacked>
              {!isSignedIn && (
                <Button color='teal' fluid size='large'
                  onClick={handleAuthClick}>Авторизироваться</Button>
              )}

              {isSignedIn && (
                <div className="login-user-container">
                  <div className="login-user-header">
                    <Header as='h3'>{userName}</Header>
                    <Button color='red' size='large' 
                      onClick={handleSignoutClick}>Выйти</Button>
                  </div>
                  <Divider />
                  <SaveImage auth_token={auth_token} />
                </div>
              )}
            </Segment>
          </Grid.Column>
        </Grid>
      )}
    </div>
  );
}

App.propTypes = {
  isLoad: PropTypes.bool.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  handleAuthClick: PropTypes.func.isRequired,
  handleSignoutClick: PropTypes.func.isRequired,
  userName: PropTypes.string,
};

export default withGapiInit(App);
