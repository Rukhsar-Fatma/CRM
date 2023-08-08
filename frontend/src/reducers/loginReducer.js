const initialState = {
  isLogin: false,
  response: {},
  msg: '',
  statusCode: 401
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      let response_rule = {
        200: {
          ...state,
          isLogin: true,
          response: action.response,
          msg: action.msg,
          statusCode: action.statusCode
        },
        401: {
          ...state,
          isLogin: false,
          response: {
            user_details: {
              user_org_domain: ''
            }
          },
          msg: action.msg,
          statusCode: action.statusCode
        },
      }
      return response_rule[action.statusCode];
    case "LOGOUT":
      return {
        ...state,
        isLogin: initialState.isLogin,
        response: {},
        msg: '',
        statusCode: 0
      };
    default:
      return state;
  }
};

export default loginReducer;