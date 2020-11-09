import * as actionTypes from "../constants";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null,
};

export const order_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INT:
      return {
          ...state,
          purchased: false,
        } || state

    case actionTypes.PURCHASE_BURGER_PENDING:
      return {
          ...state,
          loading: true,
        } || state
     

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
          ...state,
          loading: false,
          purchased: true,
        } || state
    

    case actionTypes.PURCHASE_BURGER_ERROR:
      return {
          ...state,
          loading: false,
        } || state
 
    /** FOR FETCHING ORDER */
    case actionTypes.FETCH_ORDER_PENDING:
        return {
          ...state,
          loading: true
        }
    
    case actionTypes.FETCH_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: [...action.payload]
        }
    
    case actionTypes.FETCH_ORDER_ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload
          }

    default:
      return state;
  }
};
