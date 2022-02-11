import axios from "axios";
import qs from "qs";

const Fetch = axios.create({
  baseURL: "https://api.nomics.com/v1",
  params: {
    key: "4465e0ac22021c66a32691e2e3a4641d39c557ca",
  },
  paramsSerializer: function (params: any) {
    return qs.stringify(params, { arrayFormat: "comma" });
  },
});

export default Fetch;
