const URL_BACKEND = process.env.REACT_APP_API_URL;

const fetchWithoutToken = (endopoint, data, method = "GET") => {
  if (method === "GET") {
    return fetch(`${URL_BACKEND}/${endopoint}`);
  } else {
    return fetch(`${URL_BACKEND}/${endopoint}`, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchWithToken = (endopoint, data, method = "GET") => {
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    return fetch(`${URL_BACKEND}/${endopoint}`, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    return fetch(`${URL_BACKEND}/${endopoint}`, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};

export { fetchWithoutToken, fetchWithToken };
