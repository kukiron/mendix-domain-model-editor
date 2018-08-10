import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {App} from './components/app';
import {EntityStore} from './stores/entitystore';
import {useStrict} from 'mobx';

useStrict(true);

const DEMO_DATA = [
  {
    id: 1,
    name: "Order",
    x: 100,
    y: 100
  },
  {
    id: 2,
    name: "OrderLine",
    x: 200,
    y: 200
  }
];

const entityStore = new EntityStore();
entityStore.loadJson(DEMO_DATA);

render(
  <AppContainer>
    <App entityStore={entityStore} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/app', () => {
    const NextApp = require('./components/app').App;

    render(
      <AppContainer>
          <App entityStore={entityStore} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
