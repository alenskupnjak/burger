import axios from 'axios'

const instance = axios.create({
  baseURL:'https://crudzaposlenici.firebaseio.com/'
})


//  Za REQUEST INSTANCE
instance.interceptors.request.use(
  (req) => {
    console.log('%c REQ', 'color:green' , req);
    return req;
  },
  (err) => {
    console.log(err);
  }
);

//  Za RESPONSE INSTANCE
// instance.interceptors.response.use(
//   (res) => {
//     console.log('%c RES','color:red', res);
//     return res;
//   },
//   (err) => {
//     console.log('%c RES error','color:red', err);
//   }
// );


export default instance