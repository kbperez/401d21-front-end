import React from 'react';
import Dashboard from './dashboard';
import Landing from './landing';
import {Provider} from 'react-redux';
import createStore from '../lib/app-create-store';
import {BrowserRouter, Route, Redirect, Link, Switch} from 'react-router-dom';

const store = createStore();

export default class App extends React.Component {
  componentWillMount() {
    if(localStorage.token)
      store.dispatch({type: 'TOKEN_SET', payload: localStorage.token})
  }


  render() {
    let {token} = store.getState();
    console.log('token', token);
    return (
      <main className="application">
        <Provider store={store}>
          <BrowserRouter>
            <div>
            <Link to="/welcome/signin">Welcome</Link>
            <Link to="/dashboard">Dashboard</Link>
            <React.Fragment>
              <Route exact path="/welcome/:auth" component={Landing}/>
              <Route exact path="/dashboard" component={() =>
                  token
                  ? <Dashboard token={token}/>
                  : <Redirect to="/welcome/signup"/>}
                />
            </React.Fragment>
          </div>
          </BrowserRouter>
        </Provider>
      </main>
    );
  }
}
