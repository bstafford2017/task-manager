import axios from 'axios'

export default axios.create({
  baseURL:
    process.env.REACT_APP_ENVIRONMENT === 'local'
      ? 'http://localhost:3000/dev'
      : 'https://z2bw125ow4.execute-api.us-east-2.amazonaws.com/dev'
})
