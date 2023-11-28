import axios from 'axios'

export default axios.create({
    baseURL: "http://3.35.137.141:8080",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

