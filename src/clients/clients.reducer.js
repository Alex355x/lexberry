import { CLIENTS_LIST_RECIEVED, SHOW_SPINNER } from './clients.actions';

// const initialState = {
//     flightsList: {body: {}},
//     isFetching: false,
    
// };

const initialState = {
    clientsList: {}
};

const flightsReducer = (state = initialState, action) => {
    switch (action.type) {
    //   case SHOW_SPINNER: {
    //     return {
    //         ...state,
    //         // isFetching: true,
    //     }
    //   }
      case CLIENTS_LIST_RECIEVED:
        return {
          ...state,
          clientsList: action.payload.clientsList,
        //   isFetching: false,
        };
       

      default:
        return state;
    }
};

export default flightsReducer;
