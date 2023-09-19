

export const apiBaseUrl = () => {
  const port = process.env.REACT_APP_SERVER_URL;
  const type = process.env.REACT_APP_ENV === 'development';

  // In development, the dev API server is running in a different port
  if (type) {
    return port;
  }
  // Otherwise, use the same domain and port as the frontend
  return `${process.env.BUSS_API_SERVER_URL}`;
};

export const baseUrl = () => {
  const port = process.env.REACT_APP_API_ENDPOINT;
  return port;
}

export const Post = (path, body) => {
  const serverUrl = baseUrl() + path;
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return typeof window != 'undefined' && window.fetch(serverUrl, options);
}

export const Get = (path, body) => {
  const serverUrl = baseUrl() + path;
  const options = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  return typeof window != 'undefined' && fetch(serverUrl, options);
}

export const Put = (path, body) => {
  const serverUrl = baseUrl() + path;
  const options = {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  return typeof window != 'undefined' && fetch(serverUrl, options);
}

export const Delete = (path, body) => {
  const serverUrl = baseUrl() + path;
  const options = {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  return typeof window != 'undefined' && fetch(serverUrl, options);
}
