import axios from "axios";
const baseUrl = "http://localhost:5000/api";
export const getRequest = async (url) => {
  const options = {
    method: "GET",
    url: `${baseUrl}/${url}`,
    headers: {
      Accept: "application/json",
    },
  };

  const response = await axios
    .request(options)
    .then(function (response) {
      return { value: true, data: response.data };
    })
    .catch(function (error) {
      if (error.response) {
        return { value: false, data: error.response.data };
      }
      return { value: false, data: { message: "Network Error" } };
    });

  return response;
};

export const postRequest = async (url, data) => {
  const options = {
    method: "POST",
    url: `${baseUrl}/${url}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios
    .request(options)
    .then(function (response) {
      return { value: true, data: response.data };
    })
    .catch(function (error) {
      if (error.response) {
        return { value: false, data: error.response.data };
      }
      return { value: false, data: { message: "Network Error" } };
    });

  return response;
};
