import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/landing/Landing';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <Alert />
          <Switch>
            <Route path='/login' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
