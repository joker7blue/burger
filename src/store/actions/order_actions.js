import * as actionsTypes from "../constants";
import axios from "../../axios-orders";

export const purchaseBurger = (orderData, token) => (dispatch) => {
  dispatch({ type: actionsTypes.PURCHASE_BURGER_PENDING, payload: null });

  axios
    .post("/orders.json?auth="+token, orderData)
    .then((response) => {
      console.log(response);
      dispatch({
        type: actionsTypes.PURCHASE_BURGER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: actionsTypes.PURCHASE_BURGER_ERROR, payload: error });
    });
};

export const purchaseInit = () => {
  return { type: actionsTypes.PURCHASE_INT, payload: null };
};

export const fetchOrder = (token, userId) => (dispatch) => {
  dispatch({ type: actionsTypes.FETCH_ORDER_PENDING, payload: null });

  const queryParams = '?auth='+token + '&orderBy="userId"&equalTo="' + userId +'"'
  axios
    .get("orders.json"+queryParams)
    .then((result) => {
      const data = { ...result.data };
      let orderArray = [];

      for (const key in data) {
        orderArray.push(data[key]);
      }
      dispatch({
        type: actionsTypes.FETCH_ORDER_SUCCESS,
        payload: orderArray,
      });
    })
    .catch((err) => {
      dispatch({ type: actionsTypes.FETCH_ORDER_ERROR, payload: err });
    });
};
