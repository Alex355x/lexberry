import { CLIENTS_LIST_RECIEVED } from './clients.actions';

const initialState = {
    clientsList: {}
};

const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CLIENTS_LIST_RECIEVED:
        return {
          ...state,
          clientsList: action.payload.clientsList,
        };
      default:
        return state;
    }
};

export default clientsReducer;
