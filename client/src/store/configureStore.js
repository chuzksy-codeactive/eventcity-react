import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducer/rootReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['centerReducer', 'centerListReducer']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default () => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
  let persistor = persistStore(store);
  return { store, persistor };
};

// const configureStore = () => createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// export default configureStore;
