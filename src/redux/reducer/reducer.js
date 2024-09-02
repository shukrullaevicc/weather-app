const initialState = {
   theme: localStorage.getItem("theme") || "light",
   searchCity: null,
};

export const reducer = (state = initialState, action) => {
   switch (action.type) {
      case "SEARCH_CITY":
         return {
            ...state,
            searchCity: action.data,
         };
      case "CHANGE_THEME":
         localStorage.setItem("theme", action.theme);
         return {
            ...state,
            theme: action.theme,
         };
      default:
         return state;
   }
};