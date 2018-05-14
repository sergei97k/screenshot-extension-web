import axios from 'axios';

const api = {
  postImage(auth_token, boundary, body) {
    return axios.post(
      'https://www.googleapis.com/upload/drive/v3/files',
      body,
      {
        params: {
         'uploadType': 'multipart'
        },
        headers: {
         'Content-Type': `multipart/related; boundary="${boundary}"`,
         'Authorization': `Bearer ${auth_token}`
        }
      }
    )
  },
  createFolder(auth_token, name) {
    const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const close_delim =  `\r\n--${boundary}--`;

    const contentType = 'application/vnd.google-apps.folder';

    const metadata = {
      'name': name,
      'mimeType': contentType
    };

    const body = `${delimiter}` +
      `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
      `${JSON.stringify(metadata)}` +
      `${delimiter}` +
      `Content-Type: ${contentType}\r\n` +
      `${close_delim}`;

    return axios.post(
      'https://www.googleapis.com/upload/drive/v3/files',
      body,
      {
        params: {
         'uploadType': 'multipart'
        },
        headers: {
         'Content-Type': `multipart/related; boundary="${boundary}"`,
         'Authorization': `Bearer ${auth_token}`
        }
      }
    )
  }
}

export default api;