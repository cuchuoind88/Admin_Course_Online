import initialState from "./initialState";
function LXCReducer(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        auth: {
          username: action.payload.userName,
          userId: action.payload.userID,
          userRole: action.payload.userRole,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        auth: {
          username: "",
          userId: "",
          userRole: "",
        },
      };
    case "POPULATE_USER_DETAILS":
      return {
        ...state,
        userDetails: action.payload,
      };
    case "SET_ACTIVE":
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
}
export default LXCReducer;
