import axios from "axios";
import variables from "../constatnts/variables";
import toast from 'react-hot-toast';

const ORG_REGISTER = (value) => (dispatch) => {
  console.log("🚀 ~ file: orgRegisterAction.js:7 ~ value:", value)
  axios.post(variables.api_url + 'public/org_reg', value)
    .then(response => {
      console.log("🚀 ~ file: orgRegisterAction.js:10 ~ response.data:", response.data)
      toast.success(response.data.msg);
    }).catch(error => {
      console.log("🚀 ~ file: orgRegisterAction.js:21 ~ error.response.data:", error.response.data)
      toast.error(error.response.data.msg);
    })
};

export { ORG_REGISTER };
