import React from 'react';

import { 
  Message
} from 'semantic-ui-react';

class SuccessMessage extends React.Component {
  state = {
    timer: 3,
  };

  componentDidMount() {
    setInterval(_ => {
      this.setState({
        timer: this.state.timer - 1,
      });

      if (!this.state.timer) {
        // localStorage.remove
        // document.location.assign('https://drive.google.com/drive/my-drive');
      }
    }, 1000);
  }

  render() {
    const { imageData } = this.props;
    const { timer } = this.state;

    return (
      <Message positive>
        <Message.Header>Файл <em>{imageData.name}.png</em> успешно сохранен</Message.Header>
        <p>Эта страница закроется через {timer}.</p>
      </Message>
    );
  }
  
}

export default SuccessMessage;