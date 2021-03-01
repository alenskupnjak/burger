import axios from 'axios'

const instance = axios.create({
  baseURL:'https://crudzaposlenici.firebaseio.com/'
})


export default instance