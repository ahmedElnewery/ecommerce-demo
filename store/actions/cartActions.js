import axios from "axios";
import * as actionTypes from "./action-types";
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data: product } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: product._id,
      image: product.image,
      name: product.name,
      price: product.price,
      countInStock: product.countInStock,
      quantity: Number(quantity),
    },
  });

};
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: id });

};
