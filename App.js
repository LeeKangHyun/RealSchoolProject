import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Main from './src/Container/main';
import configStore from './src/Redux/configStore';

const store = configStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;