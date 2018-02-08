import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import CoverPage from '../components/CoverPage';
import ViewCenter from '../components/ViewCenter';
import SignInForm from '../containers/SignInFormContainer';
import Header from '../components/Header';
import CenterForm from '../components/CenterForm';
import requireAuth from '../components/requireAuth';

const AppRouter = props => (
  <div className="router">
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={CoverPage} />
          <Route path="/login" component={SignInForm} />
          <Route exact path="/centers" component={requireAuth(ViewCenter)} />
          <Route path="/centers/create" component={CenterForm} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default AppRouter;
