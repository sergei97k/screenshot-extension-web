import React from 'react';
import './App.css';

import SaveImage from './components/SaveImage';

import {
  Loader, Dimmer, Grid, Header, Segment
} from 'semantic-ui-react';

class App extends React.Component {
  state = {
    isLoad: false,
    auth_token: null,
  };

  componentDidMount() {
    this.setState({
      auth_token: localStorage.token || null,
    });

    setTimeout(_ => {
      this.setState({
        isLoad: true,
      });
    }, 500);
  }

  render() {
    const { isLoad, auth_token } = this.state;

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
                <span>Сохраните изображение</span>
              </Header>
              <Segment stacked>
                <div className="login-user-container">
                  <SaveImage auth_token={auth_token} />
                </div>
              </Segment>
            </Grid.Column>
          </Grid>
        )}
      </div>
    );
  }
}

export default App;
