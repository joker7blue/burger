import * as actionTypes from "../constants";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

const intialState = {
  //ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
  ingredients: null,
  totalPrice: 4,
  loading: false,
  error: null,
  building: false
};

export const ingredients_reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return (
        {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.payload.key]: (state.ingredients[action.payload.key] += 1),
          },
          totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload.key],
          building: true
        } || state
      );

    case actionTypes.REMOVE_INGREDIENT:
      return (
        {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.payload.key]: (state.ingredients[action.payload.key] -= 1),
          },
          totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload.key],
          building: true,
        } || state
      );

    case actionTypes.FETCH_INGRDIENTS_PENDING:
      return {
          ...state,
          loading: true,
        } || state


    case actionTypes.FETCH_INGRDIENTS_SUCCESS:
      return {
          ...state,
          ingredients: action.payload,
          loading: false,
          totalPrice: 4,
          building: false
        } || state


    case actionTypes.FETCH_INGRDIENTS_ERROR:
      return {
          ...state,
          loading: false,
          error: action.payload,
        } || state
 

    default:
      return state;
  }
};
