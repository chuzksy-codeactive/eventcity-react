import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import CoverPage from '../components/CoverPage';
import ViewCenter from '../components/ViewCenter';
import SignInForm from '../containers/SignInFormContainer';
import Header from '../components/Header';
import CenterForm from '../containers/CenterFormContainer';
import EditCenterForm from '../containers/EditCenterFormContainer';
import requireAuth from '../components/requireAuth';
import EditCenter from '../components/EditCenter';
import createHistory from 'history/createBrowserHistory';
import { centerReset } from '../actions/centerAction';

const history = createHistory();

class AppRouter extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(centerReset());
    });
  }

  render() {
    return (
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
              <Route path="/centers/:id" component={EditCenterForm} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
const mapStateToProp = state => {
  return {
    center: state.centerReducer
  };
};

export default connect(mapStateToProp)(AppRouter);
