import axios from "axios";
import qs from "qs";

const Fetch = axios.create({
  baseURL: "https://api.nomics.com/v1",
  params: {
    key: "b2a68611ec36d770198bb98df78b3e52aeea4545",
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: "comma" });
  },
});

export default Fetch;
