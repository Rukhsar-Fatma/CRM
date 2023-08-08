const INCREMENT = () => (dispatch) => {
  dispatch({ type: "INCREMENT", payload: null });
};

const DECREMENT = () => (dispatch) => {
  dispatch({ type: "DECREMENT", payload: null });
};

const RESET = () => (dispatch) => {
  dispatch({ type: "RESET", payload: null });
};

export { INCREMENT, DECREMENT, RESET };
