import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      };
    }
    case SET_GRIDVIEW:
      return { ...state, grid_view: true };
    case SET_LISTVIEW:
      return { ...state, grid_view: false };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS: {
      const { filtered_products, sort } = state;
      let newFilteredProducts = [...filtered_products];
      if (sort === "price-lowest") {
        newFilteredProducts.sort((a, b) => a.price - b.price);
        return { ...state, filtered_products: newFilteredProducts };
      }
      if (sort === "price-highest") {
        newFilteredProducts.sort((a, b) => b.price - a.price);
        return { ...state, filtered_products: newFilteredProducts };
      }
      if (sort === "name-z") {
        newFilteredProducts.sort((a, b) => {
          if (a.name < b.name) return 1;
          if (b.name < a.name) return -1;
          return 0;
        });
        return { ...state, filtered_products: newFilteredProducts };
      }
      if (sort === "name-a") {
        newFilteredProducts.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (b.name < a.name) return 1;
          return 0;
        });
        return { ...state, filtered_products: newFilteredProducts };
      }
      return { ...state, filtered_products: newFilteredProducts };
    }
    case UPDATE_FILTERS: {
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    }
    case FILTER_PRODUCTS: {
      const { all_products, filters } = state;
      const { text, company, category, price, shipping, color } = filters;
      let tempProducts = [...all_products];
      tempProducts = tempProducts.filter((product) => {
        if (
          (text ? product.name.toLowerCase().startsWith(text) : true) &&
          (company !== "all" ? product.company === company : true) &&
          (category !== "all" ? product.category === category : true) &&
          product.price <= price &&
          (shipping ? product.shipping === true : true) &&
          (color !== "all" ? product.colors.includes(color) : true)
        )
          return product;
      });
      console.log(tempProducts);
      return { ...state, filtered_products: tempProducts };
    }
    case CLEAR_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
        filtered_products: state.all_products,
      };
    }
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
