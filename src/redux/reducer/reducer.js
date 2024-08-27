const initialState = {
   searchCity: null,
};

export const reducer = (state = initialState, action) => {
   switch (action.type) {
      case "SEARCH_CITY":
         return {
            searchCity: action.data,
         };
      default:
         return state;
   }
};