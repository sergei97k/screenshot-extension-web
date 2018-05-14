import React from 'react';
import PropTypes from 'prop-types';
import api from '../api';

import ShortParagraph from '../images/wireframe/short-paragraph.png';
import WireframeImage from '../images/wireframe/image.png';

import { 
  Dimmer, Image, Loader, Message
} from 'semantic-ui-react';

import SaveForm from './SaveForm';
import SuccessMessage from './SuccessMessage';

class SaveImage extends React.Component {
  state = {
    isLoad: false,
    isSaveImage: false,
    value: '',
    imageUrl: null,
    imageData: null,
  };

  componentDidMount() {
    const imageUrl = localStorage.screenshotData || null;
    this.setState({
      imageUrl,
    });

    setTimeout(_ => {
      this.setState({
        isLoad: true,
      });
    }, 1000);
  }

  saveFile = () => {
    this.setState({
      isSaveImage: true,
    });

    const { auth_token } = this.props;
    const base64 = this.state.imageUrl;

    const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const close_delim =  `\r\n--${boundary}--`;

    const contentType = 'image/png';
    const base64Str = base64.split(',')[1];

    const metadata = {
      'name': this.state.value,
      'mimeType': contentType
    };

    api.createFolder(auth_token, 'Screenshot Extension Web')
      .then(
        res => {
          metadata.parents = [res.data.id];

          const body = `${delimiter}` +
            `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
            `${JSON.stringify(metadata)}` +
            `${delimiter}` +
            `Content-Type: ${contentType}\r\n` +
            `Content-Transfer-Encoding: base64\r\n\r\n` +
            `${base64Str}` +
            `${close_delim}`;

          return api.postImage(auth_token, boundary, body);
        },
        console.error
      )
      .then(
        res => {
          this.setState({
            isSaveImage: false,
            imageData: res.data,
          });
        },
        console.error
      );
  }

  onChange = event => {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    const { isLoad, imageUrl, value, isSaveImage, imageData } = this.state;
    const { auth_token } = this.props;

    return (
      <div className="save-image-container">
        {!isLoad && (
          <Dimmer.Dimmable dimmed={true}>
            <Dimmer active={true} inverted>
              <Loader>Загрузка</Loader>
            </Dimmer>

            <p>
              <Image src={WireframeImage} size='medium' rounded centered />
            </p>
            <p>
              <Image src={ShortParagraph} />
            </p>
            <p>
              <Image src={ShortParagraph} />
            </p>
          </Dimmer.Dimmable>
        )}

        {isLoad && imageUrl && !imageData && auth_token && (
          <SaveForm 
            value={value}
            imageUrl={imageUrl}
            saveFile={this.saveFile}
            onChange={this.onChange} />
        )}

        {isLoad && (!imageUrl || !auth_token) && (
          <Message negative>
            <Message.Header>Упс, что-то пошло не так!</Message.Header>
            <p>Попробуйте сделать скриншот снова</p>
          </Message>
        )}

        {isSaveImage && 
          (<Dimmer active inverted>
            <Loader inverted>Сохранение</Loader>
          </Dimmer>
        )}

        {imageData && (
          <SuccessMessage imageData={imageData} />
        )}
      </div>
    ); 
  }
}

SaveImage.propTypes = {
  auth_token: PropTypes.string.isRequired,
};

export default SaveImage;