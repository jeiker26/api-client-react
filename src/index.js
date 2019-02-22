import axios from "axios";

export default class ApiClient {
  constructor({ apiUrl, headers = {} }) {
    this.headers = headers;
    this.settings = {
      responseType: "json",
      baseURL: apiUrl
    };

    this.client;
  }

  getQueryString(query) {
    if (!query) {
      return "";
    }
    return (
      "?" +
      Object.keys(query)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join("&")
    );
  }

  async get(path, params, opts = {}) {
    return await this.send(Object.assign({ method: "get", path, params }, opts));
  }

  async post(path, payload = {}, opts = {}) {
    return await this.send(Object.assign({ method: "post", path, payload }, opts));
  }

  async put(path, payload = {}, opts = {}) {
    return await this.send(Object.assign({ method: "put", path, payload }, opts));
  }

  async patch(path, payload = {}, opts = {}) {
    return await this.send(Object.assign({ method: "patch", path, payload }, opts));
  }
  async delete(path, payload = {}, opts = {}) {
    return await this.send(Object.assign({ method: "delete", path, payload }, opts));
  }

  async send(request) {
    const { method = "get", path, payload = {}, headers = {}, params } = request;

    try {
      const response = await axios({
        method,
        headers: { ...headers, ...this.headers },
        params,
        url: path,
        data: payload,
        ...this.settings
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        // Capture errors
      } else {
        throw error;
      }
    }
  }
}
