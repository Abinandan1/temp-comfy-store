import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, color, amount, product } = action.payload;
      let tempItem = state.cart.find((i) => i.id === id + color);
      if (tempItem) {
        let tempCart = [...state.cart];
        tempCart = tempCart.map((i) => {
          if (i.id === tempItem.id) {
            let newAmount = i.amount + amount;
            if (newAmount > i.max) {
              newAmount = i.max;
            }
            return { ...i, amount: newAmount };
          }
          return i;
        });
        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color: color,
          amount: amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
      return { ...state };
    }
    case REMOVE_CART_ITEM: {
      const newCart = state.cart.filter((item) => item.id !== action.payload);
      return { ...state, cart: newCart };
    }
    case CLEAR_CART: {
      return { ...state, cart: [] };
    }
    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      const newCart = state.cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: value };
        }
        return item;
      });
      return { ...state, cart: newCart };
    }
    case COUNT_CART_TOTALS: {
      const { total_items, total_amount } = state.cart.reduce(
        (total, cartItem) => {
          total.total_items += cartItem.amount;
          total.total_amount += cartItem.price * cartItem.amount;
          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );
      return { ...state, total_items: total_items, total_amount: total_amount };
    }
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
