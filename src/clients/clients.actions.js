import * as clientsGateway from './clientsGateway';

export const CLIENTS_LIST_RECIEVED = 'CLIENTS/CLIENTS_LIST_RECIEVED';

export const clientsListRecieved = (clientsList) => {
  const action = {
    type: CLIENTS_LIST_RECIEVED,
    payload: {
      clientsList,
    }
  }
  return action;
}

export const getClientsList = () => {
  const thunkAction = function (dispatch) {
    clientsGateway
    .fetchClientsList()
    .then(clientsList => dispatch(clientsListRecieved(clientsList)))
  };
  return thunkAction;
}



