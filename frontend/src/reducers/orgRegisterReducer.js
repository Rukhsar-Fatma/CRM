const initialState = {
    isRegister: false,
    response: {},
    msg: '',
    statusCode: 401
};

const orgRegisterReducer = (state = initialState, action) => {
    // console.log("🚀 ~ file: orgRegisterReducer.js:11 ~ orgRegisterReducer ~ action:", action)
    switch (action.type) {
        case "ORG_REG":
            let response_rule = {
                200: {
                    ...state,
                    isRegister: true,
                    response: action.response,
                    msg: action.msg,
                    statusCode: action.statusCode
                },
                401: {
                    ...state,
                    isRegister: false,
                    response: action.response,
                    msg: action.msg,
                    statusCode: action.statusCode
                },
            }
            return response_rule[action.statusCode];
        default:
            return state;
    }
};

export default orgRegisterReducer;