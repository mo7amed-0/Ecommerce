import { createSlice } from "@reduxjs/toolkit";
const appSlice = createSlice({
  name: "app",
  initialState: {
    products: [],
    productDetails: [],
    cartCount: 0,
    favouriteCount: 0,
    favouriteProducts: [],
    checkAdded: [],
    favouriteList: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
        state.checkAdded.push(action.payload.idAdded);
        state.cartCount += 1;
      }
    },
    increment: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item && item.quantity < 10) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
      }
    },
    decrement: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.totalPrice = item.totalPrice - item.price;
        } else {
          state.products = state.products.filter(
            (item) => item.id !== action.payload.id
          );
          state.checkAdded = state.checkAdded.filter(
            (item) => item !== action.payload.idAdded
          );
          state.cartCount -= 1;
        }
      }
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      state.checkAdded = state.checkAdded.filter(
        (item) => item !== action.payload.idAdded
      );
      state.cartCount -= 1;
    },
    removeFromFavourite: (state, action) => {
      state.favouriteProducts = state.favouriteProducts.filter(
        (item) => item.id !== action.payload.id
      );
      state.favouriteCount -= 1;
    },
    favourite: (state, action) => {
      const item = state.favouriteProducts.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        state.favouriteProducts = state.favouriteProducts.filter(
          (item) => item.id !== action.payload.id
        );
        state.favouriteList = state.favouriteList.filter(
          (item) => item !== action.payload.idIcon
        );
        state.favouriteCount -= 1;
      } else {
        state.favouriteProducts.push(action.payload);
        state.favouriteList.push(action.payload.idIcon);
        state.favouriteCount += 1;
      }
    },

    addInProductDetails: (state, action) => {
      const item = state.productDetails.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        state.productDetails = state.productDetails.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.productDetails.push(action.payload);
      }
    },
    showUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    userLogOut: (state) => {
      state.userInfo = null;
    },
  },
});
export const {
  addToCart,
  increment,
  decrement,
  removeFromCart,
  favourite,
  removeFromFavourite,
  showUserInfo,
  userLogOut,
} = appSlice.actions;
export default appSlice.reducer;
