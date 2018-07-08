import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import CoverPage from '../components/ui-components/CoverPage';
import ViewCenter from '../components/center/ViewCenter';
import SignInForm from '../components/users/SignInFormContainer';
import Header from '../components/ui-components/Header';
import CenterForm from '../components/center/CenterFormContainer';
import EditCenterForm from '../components/center/EditCenterFormContainer';
import requireAuth from '../components/auth/requireAuth';
import requireAdmin from '../components/auth/requireAdmin';
import EditCenter from '../components/center/EditCenter';
import EventCenterContainer from '../components/event/EventCenterContainer';
import createHistory from 'history/createBrowserHistory';
import { centerReset } from '../actions/centerAction';
import ViewEventsContainer from '../components/event/ViewEventsContainer';
import EditEvent from '../components/event/EditEvent';
import NotFound from '../components/ui-components/NotFound';

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
      <div className="router app-body">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={CoverPage} />
              <Route path="/login" component={SignInForm} />
              <Route exact path="/centers" component={requireAuth(ViewCenter)} />
              <Route exact path="/centers/create" component={requireAdmin(CenterForm)} />
              <Route exact path="/centers/list" component={requireAdmin(EditCenter)} />
              <Route exact path="/edit/center/:id" component={requireAdmin(EditCenterForm)} />
              <Route path="/book/center/:id" component={requireAuth(EventCenterContainer)} />
              {/* <Route exact path="/events" component={requireAuth(ViewEventsContainer)} /> */}
              <Route exact path="/events/list" component={requireAuth(EditEvent)} />
              <Route component={NotFound} />
              <Redirect to="/404" />
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
