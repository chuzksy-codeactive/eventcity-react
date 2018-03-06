import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import CoverPage from '../components/CoverPage';
import ViewCenter from '../components/ViewCenter';
import SignInForm from '../containers/SignInFormContainer';
import Header from '../components/Header';
import CenterForm from '../containers/CenterFormContainer';
import requireAuth from '../components/requireAuth';
import EditCenter from '../components/EditCenter';
import Footer from '../components/Footer';

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
          <Route path="/centers/list" component={requireAuth(EditCenter)} />
          <Route path="/centers/:id" component={CenterForm} />
        </Switch>
        <Footer />
      </div>
    </Router>
  </div>
);

export default AppRouter;
