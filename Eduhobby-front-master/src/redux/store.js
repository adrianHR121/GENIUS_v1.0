import { createStore } from 'redux';

// Estado inicial
const initialState = {
    responseType: null, // Variable para almacenar el tipo de respuesta JSON
};

// Reducer
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_RESPONSE_TYPE':
        return {
          ...state,
          responseType: action.payload,
        };
      default:
        return state;
    }
  };
  

// Crear store
const store = createStore(rootReducer);

export default store;
