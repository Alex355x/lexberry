import * as clientsGateway from './clientsGateway';

export const CLIENTS_LIST_RECIEVED = 'CLIENTS/CLIENTS_LIST_RECIEVED';
// export const SHOW_SPINNER = "SHOW_SPINNER";

export const flightsListRecieved = (clientsList) => {
  const action = {
    type: CLIENTS_LIST_RECIEVED,
    payload: {
      clientsList,
    }
  }
  return action;
}

export const getFlightsList = () => {
  const thunkAction = function (dispatch) {
    // dispatch(showSpinner())
    clientsGateway
    .fetchFlightsList()
    .then(clientsList => dispatch(flightsListRecieved(clientsList)))
  };
  return thunkAction;
}


// export const showSpinner = () => {
//   return {
//       type: SHOW_SPINNER,
//   }
// }


