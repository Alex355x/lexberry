import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Page from './clients/components/Page';

import { Provider } from 'react-redux';
import store from './store';



const App = () => {


    
  return (
    <div>
      <Provider store={store}>
        <Router>
            <Route path="/"> 
            
                <Page />
           
            </Route>
        </Router>
      </Provider>
    </div>  
  );
};

export default App;


