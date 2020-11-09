import * as actionsTypes from "../constants";
import axios from "../../axios-orders";

export const addIngredient = (key, dispatch) => {
  /* setTimeout(() => {
    
    dispatch( { type: ADD_INGREDIENT, payload: { key: key }} );
  }, 2000); */
  return { type: actionsTypes.ADD_INGREDIENT, payload: { key: key } };
};

export const removeIngredient = (key) => {
  return { type: actionsTypes.REMOVE_INGREDIENT, payload: { key: key } };
};

export const fetch_initIngredient = () => (dispatch) => {

    dispatch({ type: actionsTypes.FETCH_INGRDIENTS_PENDING, payload: null });
    axios
      .get("https://react-burger-builder-64215.firebaseio.com/ingredients.json")
      .then((response) =>
        dispatch({
          type: actionsTypes.FETCH_INGRDIENTS_SUCCESS,
          payload: response.data,
        })
      )
      .catch((error) =>
        dispatch({ type: actionsTypes.FETCH_INGRDIENTS_ERROR, payload: error })
      );

};
