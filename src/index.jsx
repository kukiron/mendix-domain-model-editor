import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './components/app';
import { EntityStore } from './stores/entitystore';
import { useStrict } from 'mobx';
import { formatJsonData } from './utils';

useStrict(true);

const entityStore = new EntityStore();
const loadEntityStoreData = async () => {
  const coordsResponse = await fetch('http://localhost:3000/static/coords.json');
  const coords = await coordsResponse.json();
  const entitiesResponse = await fetch('http://localhost:3000/static/entities.json');
  const entities = await entitiesResponse.json();

  const DEMO_DATA = formatJsonData(coords, entities);
  entityStore.loadJson(DEMO_DATA);
};
loadEntityStoreData();

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
