import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './store/configureStore';
import AppRoutes from './routes/AppRoutes';
import 'normalize.css/normalize.css';
import './App.css';
import registerServiceWorker from './registerServiceWorker';

const { store, persistor } = configureStore();
// const store = configureStore();
const App = props => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <AppRoutes />
        </div>
      </PersistGate>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
