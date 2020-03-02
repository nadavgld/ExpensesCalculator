// const BASE_URL = window.location.href + "api/";
import axios from "axios";
const BASE_URL =
  window.location.href === "http://localhost:3033"
    ? "http://localhost:3000/api/"
    : window.location.href + "api/";

export const LogApi = {
  base: BASE_URL + "logs",
  get: function() {
    return new Promise((resolve, reject) => {
      axios
        .get(this.base)
        .then(r => resolve(r.data))
        .catch(reject);
    });
  },
  delete: function(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.base}/${id}`)
        .then(r => resolve(r.data))
        .catch(reject);
    });
  },
  add: function(log) {
    return new Promise((resolve, reject) => {
      axios
        .post(this.base, { log })
        .then(r => resolve(r.data))
        .catch(reject);
    });
  }
};
