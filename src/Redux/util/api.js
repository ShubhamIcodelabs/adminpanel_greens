import axios from "axios";
import { Post, baseUrl } from "./apiFunctions";

// For frontend external api call
export const apiClientRequest = () => {
  const request = (path = "", method = "GET", body = {}) => {
    const url = baseUrl() + path;
    const options = {
      'Content-Type': 'application/json',
      // origin: '*',
      // headers: {
      //   Authorization: atob(AccessToken),
      //   "x-logintoken": atob(xLoginToken)
      // }
    }

  
    
    switch (method) {
      case "GET":
        return axios.get(url, options);
      case "POST":
        return axios.post(url, body, options);
      case "PUT":
        return axios.put(url, body, options);

      case "DELETE":
        return axios.delete(url, body, options);

      default:
        return axios.get(url);
    }
  }

  return {
    request
  }
}