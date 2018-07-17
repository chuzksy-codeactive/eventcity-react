import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import expect from 'expect';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


global.shallow = shallow;
global.render = render;
global.mount = mount;
global.Provider = Provider;
global.mockStore = mockStore;
global.renderer = renderer;
global.expect = expect;
global.sinon = sinon;
global.FileReader = () => ({
  readAsDataURL: () => {}
});

const storage = {};
global.localStorage = {
  setItem: (key, value) => {
    storage[key] = value;
  },
  getItem: key => storage[key] || false,
  removeItem: (key) => {
    Reflect.deleteProperty(storage, key);
  }
};

configure({ adapter: new Adapter() });