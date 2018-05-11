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
  }
}

export default api;