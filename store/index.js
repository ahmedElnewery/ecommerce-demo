import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper"

import { productReducers } from "./reducers/productReducer";
import { productDetailReducer } from "./reducers/productDetailReducer";
import { cartItemsReducer } from "./reducers/cartItemsReducer";

import axios from "axios";

// const cartFromLocalStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

axios.defaults.baseURL="https://nameless-waters-19458.herokuapp.com/"
const initialState = {
  cart: {
    cartItems: [],
  },
};

const rootReducer = combineReducers({
  productList: productReducers,
  productDetail: productDetailReducer,
  cart: cartItemsReducer,
});

const store =()=> createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
const wrapper = createWrapper(store)
export default  wrapper

